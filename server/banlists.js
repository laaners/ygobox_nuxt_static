import request from "request";
import { load } from "cheerio";

function getPartialList(interval) {
    return new Promise((resolve, reject) => {
        console.log("Scraping "+interval);
		request(
			{
				url: `https://yugipedia.com/wiki/Historic_TCG_Limitations_Chart/${interval}`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					console.log("Scraping error "+interval);
					resolve({})
				} else {
                    console.log("DONE scraping "+interval);
                    resolve(parseHTML(body,interval.split("-")[0]));
				}
			}
		)
	})
}

function parseHTML(body, startYear) {
    const banlists = {};
    const banlists_seq = [];
    const cards = {};
    const $ = load(body);
    let count = 1;
    $(".floatable-header tbody tr").each(function(idx, tr) {
        const $tr = $(tr);
        const ths = $tr.find("th").toArray();
        switch(count) { // count at which row we are at
            case 1: { // years
                ths.forEach(_ => {
                    const $th = $(_);
                    const year = $th.text().replace("\n","");
                    if(isNaN(year)) return;
                    const monthsN = $th.attr("colspan");
                    banlists[year] = [];
                    for(let i = 0; i < monthsN; i++) banlists[year].push(0);
                });
                break;
            }
            case 2: { // months
                let year = startYear;
                let year_index = 0;
                let prev_month = 0;
                for(let i = 0; i < ths.length; i++) {
                    const $th = $(ths[i]);
                    const month = +$($th.find("a").toArray()[0]).text();
                    if(prev_month >= month) { // new year
                        year++;
                        year_index = 0;
                    }
                    banlists[year][year_index] = month;
                    year_index++;
                    prev_month = month;
                }
                for(const key in banlists) {
                    const months = banlists[key];
                    months.forEach(_=>banlists_seq.push(key+"-"+_));
                }
                break;
            }
            default: { // real deal
                const cardName = $(ths[0]).text().replace("\n","");
                cards[cardName] = {};
                for(const key in banlists) {
                    const months = banlists[key];
                    months.forEach(_=>{ cards[cardName][key+"-"+_]=-1 });
                }

                const tds = $tr.find("td").toArray();
                let firstRelease = 1;
                let year_index = 0;
                tds.forEach(_=>{
                    const $td = $(_);
                    const colspan = +$td.attr("colspan");
                    if(!isNaN(colspan))
                        firstRelease = colspan;
                    else {
                        const limitation = +$td.text();
                        if($td.text().length === 0) firstRelease = 1
                        else if(banlists_seq[year_index+firstRelease-1] === undefined) {
                            console.log(banlists_seq);
                            console.log(cardName);
                            console.log(year_index+firstRelease-1);
                        }
                        else
                            cards[cardName][banlists_seq[year_index+firstRelease-1]] = limitation;
                    }
                    year_index++;
                })
            }
        }
        count++;
    });
    // console.log(JSON.stringify(cards,null,4));
    return cards;
}

function searchDate(card, allsets) {
	let ris = "NONE"
    for (let j = 0; j < card.card_sets.length; j++) {
        const target_set = card.card_sets[j].set_name
        const cmp = allsets.filter((x) => x.set_name === target_set)[0]
        if (ris === "") ris = cmp.tcg_date + " " + cmp.set_name
        else if (cmp !== undefined && cmp.tcg_date < ris)
            ris =
                cmp.tcg_date + " " + cmp.set_name
    }
	return ris
}

export async function getAllBanlists(allcards, allsets) {
    const [banlist1, banlist2, banlist3] = await Promise.all([
        getPartialList("2002-2010"),
        getPartialList("2011-2020"),
        getPartialList("2021-"),
    ]);

    const cards = [];
    const banlists_all = [];
    for(const card in banlist1) {
        const name = card.replace("Morphing Jar 2", "Morphing Jar #2");
        const card_obj = allcards.find(_=>_.name === name);
        const obj = {
            "id": card_obj.id,
            name,
            "date": searchDate(card_obj, allsets),
            "banlists": []
        }
        const tmp = [banlist1[card], banlist2[card], banlist3[card]];
        tmp.forEach(banlists=>{
            for(const banlist in banlists) {
                if(banlists[banlist] !== -1) {
                    obj.banlists.push({
                        banlist,
                        "status": banlists[banlist]
                    })
                }
                if(banlists_all.find(_=>_===banlist) === undefined)
                    banlists_all.push(banlist)
            }    
        })
        obj.banlists.sort((a,b) => {
			const aY = +a.banlist.split("-")[0]
			const aM = +a.banlist.split("-")[1]
			const bY = +b.banlist.split("-")[0]
			const bM = +b.banlist.split("-")[1]
			return (aY*100+aM)-(bY*100+bM)
		});
        // first occurrence of when != 3
        const firstNon3 = obj.banlists.find(_=>_.status < 3);
        const index = obj.banlists.indexOf(firstNon3);
        obj.banlists = obj.banlists.slice(index === -1 ? 0 : index);
        cards.push(obj);
    }
    banlists_all.sort((a,b) => {
		const aY = +a.split("-")[0]
		const aM = +a.split("-")[1]
		const bY = +b.split("-")[0]
		const bM = +b.split("-")[1]
		return (aY*100+aM)-(bY*100+bM)
	});
    return {
        banlists: banlists_all,
        cards
    }
}
