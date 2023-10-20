import request from "request"
import { load } from "cheerio"
// import { getAllBanlists } from "./banlists"
// import bannedCards from "./data/bannedCards.json"

function getAllSets() {
	console.log("Retrieving allsets...")
	return new Promise((resolve, reject) => {
		request(
			{
				//  url specificato con nome dal docker compose e non localhost
				url: `https://db.ygoprodeck.com/api/v7/cardsets.php`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					console.log("Got allsets from LOCAL")
					resolve([])
				} else {
					console.log("Got allsets from API")
					resolve(JSON.parse(body))
				}
			}
		)
	})
}

function getBannedCards() {
    console.log("Retrieving bannedCards...")
	return new Promise((resolve, reject) => {
		request({
			url: `https://raw.githubusercontent.com/laaners/ygobox_nuxt/master/server/data/bannedCards.json`,
			method: 'GET',
		}, function(error, resp, body){
			if(error || resp.statusCode !== 200) {
				console.log("ERROR bannedCards: "+error);
				resolve([]);
			}
			else{
				console.log("Got bannedCards");
				const ris = JSON.parse(body)
				resolve(ris);
			}
		});
	});
}

// eslint-disable-next-line no-unused-vars
function ocgAllCards() {
	console.log(`Retrieving all OCG cards`)
	return new Promise((resolve, reject) => {
		//  "https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=01/01/1100&enddate=01/01/2011
		request(
			{
				url: `https://db.ygoprodeck.com/api/v7/cardinfo.php`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					// eslint-disable-next-line prefer-promise-reject-errors
					reject([])
				} else {
					console.log(`Got all OCG cards`)
					const data = JSON.parse(body).data
					for (let i = 0; i < data.length; i++) {
						delete data[i].card_prices
						//	delete ris[i].archetype
					}
					// data.find(_=>_.id === 1011091).id = 72309040
					// data.find(_=>_.id === 10034401).id = 84544192
					// data.find(_=>_.id === 10028504).id = 62219643
					resolve(data)
				}
			}
		)
	})
}

function getFemaleCards() {
	console.log(`Retrieving all female cards`)
	return new Promise((resolve, reject) => {
		request(
			{
				//  url specificato con nome dal docker compose e non localhost
				url: `https://yugioh.fandom.com/wiki/Concept:Female_official_cards?limit=10000`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					console.log("Got allsets from LOCAL")
					resolve({})
				} else {
					const list = {}
                    const $ = load(body);
					$(".smw-column-responsive li").each(function(idx, li) {
						const $li = $(li);
						load($li.html())("a").each(function(idx, a) {
							const $a = $(a);
							if($a.text() !== "+") {
								list[$a.text()] = true
							}
						});
					});
					console.log("Got all female cards")
                    resolve(list)
				}
			}
		)
	})
}

function getDB(url) {
	console.log(`Retrieving from ${url}`)
	return new Promise((resolve, reject) => {
		try {
			request.get(
				//  url specificato con nome dal docker compose e non localhost
				url,
				{timeout: 15000},
				function (error, resp, body) {
					if (error) {
						// eslint-disable-next-line prefer-promise-reject-errors
						console.log(`ERROR in retrieving ${url}: ${resp} ${error} `)
						resolve([])
					} else {
						console.log(`Got from ${url}`)
						const data = JSON.parse(body)
						resolve(data)
					}
				}
			).on('timeout', () => {
				console.log("timeout");
				request.destroy();
				resolve([])
			});
		} catch(e) {
			resolve([])
		}
	})
}

export async function initData() {
	// eslint-disable-next-line no-unused-vars, prefer-const
	let [allsets, bannedCards, allcardsToT, femaleCards, cardsIT, cardsCH] = await Promise.all([
		getAllSets(),
		getBannedCards(),
		ocgAllCards(),
		getFemaleCards(),
		getDB("https://ygobox-nuxt-db.onrender.com/iteff"),
		getDB("https://ygobox-nuxt-db.onrender.com/cheff")
	]);

	if(cardsIT.length === 0) cardsIT = require("./data/cardsIT.json")
	if(cardsCH.length === 0) cardsCH = require("./data/cardsCH.json")

	const len = allcardsToT.length
	const step = Math.floor(len/8)

	const allcards = [
		allcardsToT.slice(0, step),
		allcardsToT.slice(step, step*2),
		allcardsToT.slice(step*2,step*3),
		allcardsToT.slice(step*3,step*4),
		allcardsToT.slice(step*4,step*5),
		allcardsToT.slice(step*5,step*6),
		allcardsToT.slice(step*6,step*7),
		allcardsToT.slice(step*7,len),
	]

	allcardsToT.forEach((card) => {
		const bannedCard = bannedCards.find((_) => _.id === card.id)
		if (bannedCard !== undefined) bannedCard.info = card
	})

	return {
		allsets,
		bannedCards,
		cardsCH,
		cardsIT,
		allcards,
		allcardsToT,
		femaleCards,
	}
}