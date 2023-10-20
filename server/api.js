/* eslint-disable no-eval */
import fs from "fs"
import express from "express"
import bodyParser from "body-parser"
import request from "request"
import { load } from "cheerio"
import Pusher from "pusher"
import { initData } from "./database"
import { retrieveArchetypes } from "./archetypes"
import archetypesBlacklist from "./data/blacklist.json"
import allbanlist from "./data/banlist.json"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

const pusher = new Pusher({
	appId: process.env.PUSHER_ID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: "eu",
	useTLS: true,
})

export default app
;(async () => {
	// eslint-disable-next-line prefer-const
	let {
		allsets,
		bannedCards,
		cardsCH,
		cardsIT,
		allcards,
		allcardsToT,
		femaleCards,
	} = await initData()
	await updateWithOCG(allsets, allcards, allcardsToT)
	let archetypes = retrieveArchetypes(allcardsToT, allsets, femaleCards)
	let hashAllCards = hashGroupBy(allcardsToT, "name")
	console.log("The port is: " + process.env.PORT)
	console.log("Got all the data now!")
	console.log(`We are in ${process.env.NODE_ENV}`)

	app.get("/", async (req, res) => {
		;({
			allsets,
			bannedCards,
			cardsCH,
			cardsIT,
			allcards,
			allcardsToT,
			femaleCards,
		} = await initData())
		await updateWithOCG(allsets, allcards, allcardsToT)
		archetypes = retrieveArchetypes(allcardsToT, allsets, femaleCards)
		hashAllCards = hashGroupBy(allcardsToT, "name")
		console.log("The port is: " + process.env.PORT)
		console.log("Got all the data now!")
		console.log(`We are in ${process.env.NODE_ENV}`)
		return res.json(
			allcardsToT.map((_) => {
				return { name: _.name, id: _.id }
			})
		)
	})

	app.get("/allcards", (req, res) => {
		return res.json(allcards[+req.query.n])
	})

	app.get("/allsets", (req, res) => {
		return res.json(allsets)
	})

	// Cazzeggio
	app.get("/crests", (req, res) => {
		return res.json(
			JSON.parse(
				fs.readFileSync("server/data/archetypes.json").toString()
			)
		)
	})

	app.get("/rush", (req, res) => {
		const rush1 = JSON.parse(
			fs.readFileSync("server/cazzeggio/rush1res.json").toString()
		)
		const rush2 = JSON.parse(
			fs.readFileSync("server/cazzeggio/rush2res.json").toString()
		)
		const rush3 = JSON.parse(
			fs.readFileSync("server/cazzeggio/rush3res.json").toString()
		)
		return res.json([...rush1, ...rush2, ...rush3])
	})

	app.get("/rush_image/:name", async (req, res) => {
		const card = req.params.name
		const result = await new Promise((resolve, reject) => {
			request(
				{
					url: encodeURI(
						`https://yugipedia.com/wiki/${card.replace(/ /g, "_")}`
					),
					method: "GET",
				},
				function (error, resp, body) {
					if (error || resp.statusCode !== 200) {
						const msg =
							"ERRORE: " +
							`https://yugipedia.com/wiki/${card.replace(
								/ /g,
								"_"
							)}` +
							" " +
							error
						console.log(msg)
						console.log(resp.statusCode)
						resolve({})
					} else {
						const $ = load(body)
						// document.body.querySelector(".cardtable-main_image-wrapper .image img").src
						const img = $(
							".cardtable-main_image-wrapper .image img"
						).attr("src")
						const desc = $(".lore")
							.text()
							.substring(1, $(".lore").text().length - 1)
						resolve({ img, desc })
					}
				}
			)
		})
		return res.json(result)
	})

	app.get("/token_image/:name", async (req, res) => {
		const card = req.params.name
		const result = await new Promise((resolve, reject) => {
			request(
				{
					url: encodeURI(
						`https://yugipedia.com/wiki/${card.replace(/ /g, "_")}`
					),
					method: "GET",
				},
				function (error, resp, body) {
					if (error || resp.statusCode !== 200) {
						const msg =
							"ERRORE: " +
							`https://yugipedia.com/wiki/${card.replace(
								/ /g,
								"_"
							)}` +
							" " +
							error
						console.log(msg)
						console.log(resp.statusCode)
						resolve({})
					} else {
						const $ = load(body)
						// document.body.querySelector(".cardtable-main_image-wrapper .image img").src
						const desc = $(".lore")
							.text()
							.substring(1, $(".lore").text().length - 1)
						const summoner = $(".hcomma ul li a").text()
						const list = []
						$(".imagecolumn .hlist ul li span").each(function (
							idx,
							span
						) {
							const $span = $(span)
							const img_url = $span.attr("data-filepath")
							list.push(img_url)
						})
						if (list.length !== 0) {
							resolve({ list, desc, summoner })
						} else {
							const img = $(
								".cardtable-main_image-wrapper .image img"
							).attr("src")
							resolve({ list: [img], desc, summoner })
						}
					}
				}
			)
		})
		return res.json(result)
	})

	app.get("/banlist_history", (req, res) => {
		return res.json(allbanlist)
	})

	app.get("/banlist_latest", (req, res) => {
		const latestBanlist =
			allbanlist.banlists[allbanlist.banlists.length - 1]
		const latest = allbanlist.cards.map((card) => {
			const obj = JSON.parse(JSON.stringify(hashAllCards[card.name][0]))
			obj.status = card.banlists.find(
				(banlist) => banlist.banlist === latestBanlist
			).status
			return obj
		})
		const prevBanlist = allbanlist.banlists[allbanlist.banlists.length - 2]
		const prev = []
		allbanlist.cards.forEach((card) => {
			if (
				card.banlists.find((_) => _.banlist === prevBanlist) ===
				undefined
			)
				return
			const obj = JSON.parse(JSON.stringify(hashAllCards[card.name][0]))
			obj.status = card.banlists.find(
				(banlist) => banlist.banlist === prevBanlist
			).status
			prev.push(obj)
		})
		return res.json({ latest, prev })
	})

	app.get("/archetypes", (req, res) => {
		return res.json(
			archetypes
				.filter((_) => !archetypesBlacklist.includes(_.archetype))
				.map((_) => {
					const obj = {
						archetype: _.archetype,
						members: _.members.length,
						// members: _.members.map(_=>_.name),
						true_name: _.true_name,
						date: _.date,
						imgs: _.imgs,
						attributes: _.attributes,
						types: _.types,
						crest: _?.crest,
						focus: _.focus,
						monsters: _.monsters,
						waifu: _.waifu,
					}
					return obj
				})
		)
	})

	app.get("/archetypes_wdata", (req, res) => {
		return res.json(
			archetypes
				.filter((_) => !archetypesBlacklist.includes(_.archetype))
				.map((_) => {
					const obj = {
						archetype: _.archetype,
						// members: _.members.length,
						members: _.members,
						true_name: _.true_name,
						date: _.date,
						imgs: _.imgs,
						attributes: _.attributes,
						types: _.types,
						crest: _?.crest,
						focus: _.focus,
						monsters: _.monsters,
						waifu: _.waifu,
					}
					return obj
				})
		)
	})

	app.get("/archetypes/:id", (req, res) => {
		return res.json(archetypes.find((_) => _.archetype === req.params.id))
	})

	app.get("/female_cards", (req, res) => {
		return res.json({ data: femaleCards })
	})

	app.get("/card/:id", (req, res) => {
		const id = +req.params.id
		let card = allcardsToT.find((_) => _.id === id)
		let i = -1
		while (card === undefined && i < 2) {
			card = allcardsToT.find((_) => _.id === id + i)
			i += 2
		}
		if (card === undefined || card.desc === "[INVALID_DATA]")
			return res.send("Undefined type of card or [INVALID_DATA]")

		/*	For each set find tcg_date and assign percentage */
		if (card.card_sets !== undefined) {
			allsets.forEach((set) => {
				const setElem = card.card_sets.find(
					(_) => _.set_name === set.set_name
				)
				if (setElem !== undefined) setElem.tcg_date = set.tcg_date
			})
		}
		card.card_sets?.forEach((set) => {
			const set_name = set.set_name.toLowerCase()
			const cards = allcardsToT.filter((_) => {
				if (_.card_sets === undefined) return false
				if (_.card_sets.length !== 0) {
					return _.card_sets
						.filter((set) => set.set_name !== undefined)
						.map((set) => set.set_name.toLowerCase())
						.includes(set_name.toLowerCase())
				} else return false
			})
			const draftN =
				Math.ceil(cards.length * 1.5) > 120
					? cards.length > 120 && set_name.includes("deck")
						? cards.length
						: 120
					: Math.ceil(cards.length * 1.5)
			const differentRarities = rarityAssignAndOccurrence(
				cards,
				set_name,
				draftN
			)
			computePrecedence(differentRarities, draftN)

			const tmpArr = listCardsPrecedence(cards, differentRarities)
			const totNumber = tmpArr.length
			const tmp = differentRarities.find(
				(_) => _.set_rarity_code === set.set_rarity_code
			)
			if (tmp === undefined) set.percentage = 0
			else if (!set_name.includes("deck")) {
				set.percentage = (
					(1 - ((totNumber - +tmp.times) / totNumber) ** draftN) *
					100
				).toFixed(2)
			} else {
				set.percentage =
					100 +
					" - " +
					(
						(1 -
							((totNumber - +tmp.times) / totNumber) **
								(draftN - cards.length)) *
						100
					).toFixed(2)
			}
		})

		card.iteff = foreign(cardsIT, id)
		card.cheff = foreign(cardsCH, id)

		return res.json(card)
	})

	app.get("/cheff/:id", (req, res) => {
		const id = +req.params.id
		return res.json(foreign(cardsCH, id))
	})

	app.get("/iteff/:id", (req, res) => {
		const id = +req.params.id
		return res.json(foreign(cardsIT, id))
	})

	function foreign(arr, id) {
		let card = arr.find((_) => _.id === id)
		let i = -1
		while (card === undefined && i < 2) {
			card = arr.find((_) => _.id === id + i)
			i += 2
		}
		if (card === undefined || card.desc === "[INVALID_DATA]")
			return "Undefined type of card or [INVALID_DATA]"
		return { name: card.name, desc: card.desc }
	}

	app.get("/banned_cards", (req, res) => {
		return res.json(bannedCards)
	})

	app.get("/banned_cards_reset", async (req, res) => {
		const bannedCardsGit = await new Promise((resolve, reject) => {
			request(
				{
					url: `https://raw.githubusercontent.com/laaners/ygobox_nuxt/master/server/data/bannedCards.json`,
					method: "GET",
				},
				function (error, resp, body) {
					if (error || resp.statusCode !== 200) {
						console.log("ERROR bannedCards: " + error)
						resolve([])
					} else {
						console.log("Got bannedCards")
						const ris = JSON.parse(body)
						ris.forEach((card) => {
							card.info = allcardsToT.find(
								(_) => _.id === card.id
							)
						})
						resolve(ris)
					}
				}
			)
		})
		bannedCards = bannedCardsGit
		return res.send("Reset")
	})

	app.get("/banned_cards_short", (req, res) => {
		return res.send(
			JSON.stringify(
				bannedCards.map((_) => {
					return { id: _.id, name: _.name, banner: _.banner }
				}),
				null,
				4
			)
		)
	})

	app.get("/set/:id", (req, res) => {
		const set_name = req.params.id.includes("_=_draft_mode")
			? req.params.id.split("_=_")[0].toLowerCase()
			: req.params.id.toLowerCase()
		const cards = allcardsToT.filter((_) => {
			if (_.card_sets === undefined) return false
			if (_.card_sets.length !== 0) {
				return _.card_sets
					.filter((set) => set.set_name !== undefined)
					.map((set) => set.set_name.toLowerCase())
					.includes(set_name.toLowerCase())
				// quoted cards, odd positions
				const quoted = _.desc.split('"').filter((v, i) => i % 2 === 1)
				return (
					_.card_sets
						.filter((set) => set.set_name !== undefined)
						.map((set) => set.set_name.toLowerCase())
						.includes(set_name.toLowerCase()) &&
					quoted.find((q) => q !== _.name) === undefined
				)
			} else return false
		})
		if (cards.length === 0)
			return res.json({
				pack_img: "Pack not found, name error",
				cards: [],
				draftN: 0,
			})
		const multiplier = req.params.id.includes("_=_draft_mode") ? 0.75 : 1.5
		const draftN =
			Math.ceil(cards.length * multiplier) > 120
				? cards.length > 120 && set_name.includes("deck")
					? cards.length
					: 120
				: Math.ceil(cards.length * multiplier)	
		const differentRarities = rarityAssignAndOccurrence(
			cards,
			set_name,
			draftN
		)
		computePrecedence(differentRarities, draftN)

		const tmpArr = listCardsPrecedence(cards, differentRarities)
		const totNumber = tmpArr.length
		cards.forEach((elem) => {
			const tmp = differentRarities.find(
				(_) => _.set_rarity_code === elem.rarity.set_rarity_code
			)
			if (!set_name.includes("deck")) {
				elem.rarity.percentage = (
					(1 - ((totNumber - +tmp.times) / totNumber) ** draftN) *
					100
				).toFixed(2)
			} else {
				elem.rarity.percentage =
					100 +
					" - " +
					(
						(1 -
							((totNumber - +tmp.times) / totNumber) **
								(draftN - cards.length)) *
						100
					).toFixed(2)
			}
		})
		cards.sort((a, b) => {
			const setCodeA = a.rarity.set_code
			const setCodeB = b.rarity.set_code
			if (setCodeA < setCodeB) return -1
			if (setCodeA > setCodeB) return 1
			return 0
		})
		return res.json({
			pack_img: set_name.includes("ocg")
				? "https://ms.yugipedia.com//2/2f/SLF1-BoosterJP.png"
				: packImage(set_name),
			cards,
			draftN,
		})
	})

	app.get("/drafting/:id", (req, res) => {
		const set_name = req.params.id.includes("_=_draft_mode")
			? req.params.id.split("_=_")[0].toLowerCase()
			: req.params.id.toLowerCase()
		const set = allsets.find((_) => _.set_name.toLowerCase() === set_name)
		if (set === undefined)
			return res.json({
				pack_img: "Pack not found, name error",
				cards: [],
				draftN: 0,
				packN: 0,
				setNameCorrect: "Not found",
			})
		let cards = allcardsToT.filter((_) => {
			if (_.card_sets === undefined) return false
			if (_.card_sets.length !== 0) {
				return _.card_sets
					.filter((set) => set.set_name !== undefined)
					.map((set) => set.set_name.toLowerCase())
					.includes(set_name.toLowerCase())
			} else return false
		})
		if (cards.length === 0)
			return res.json({
				pack_img: "Pack not found, name error",
				cards: [],
				draftN: 0,
				packN: 0,
				setNameCorrect: "Not found",
			})
		const packN = cards.length

		const multiplier = req.params.id.includes("_=_draft_mode") ? 0.75 : 1.5
		// const multiplier = req.params.id.includes("_=_draft_mode") ? 1.5 : 1.5
		const draftN =
			Math.ceil(cards.length * multiplier) > 120
				? cards.length > 120 && set.set_name.includes("Deck")
					? cards.length
					: 120
				: Math.ceil(cards.length * multiplier)

		if(req.params.id.includes("_=_draft_mode")) {
			rarityAssignAndOccurrence(
				cards,
				set_name,
				draftN
			)
			const filtered = []
			for (let i = 0; i < draftN; i++) {
				filtered.push(cards[Math.floor(Math.random() * cards.length)])
			}
			cards = filtered
			return res.json({
				pack_img: `/sets/${set.set_code}.jpg`,
				cards,
				draftN,
				packN,
				setNameCorrect: set.tcg_date + " " + set.set_name
			})
		}


		const differentRarities = rarityAssignAndOccurrence(
			cards,
			set_name,
			draftN
		)
		computePrecedence(differentRarities, draftN)

		cards = listCardsPrecedence(cards, differentRarities)
		const totNumber = cards.length
		const setNameCorrect = set.tcg_date + " " + set.set_name
		const filtered = []
		if (!setNameCorrect.includes("Deck")) {
			for (let i = 0; i < draftN; i++) {
				filtered.push(cards[Math.floor(Math.random() * cards.length)])
			}
			cards = filtered
			//	cards = cards.sort(() => Math.random() - 0.5).slice(0,draftN)
			cards.forEach((elem) => {
				const tmp = differentRarities.find(
					(_) => _.set_rarity_code === elem.rarity.set_rarity_code
				)
				elem.rarity.percentage = (
					(1 - ((totNumber - +tmp.times) / totNumber) ** draftN) *
					100
				).toFixed(2)
			})
		} else {
			[...new Set(cards)].forEach((elem) => {
				const toPush = { ...elem }
				toPush.rarity.percentage = 100
				filtered.push(toPush)
			})
			const difference = draftN - filtered.length
			console.log(filtered.length)
			console.log(draftN)
			for (let i = 0; i < difference; i++) {
				const elem = cards[Math.floor(Math.random() * cards.length)]
				const tmp = differentRarities.find(
					(_) => _.set_rarity_code === elem.rarity.set_rarity_code
				)
				elem.rarity.percentage =
					100 +
					" - " +
					(
						(1 -
							((totNumber - +tmp.times) / totNumber) **
								(draftN - packN)) *
						100
					).toFixed(2)
				filtered.push(elem)
			}
			cards = filtered
		}
		return res.json({
			pack_img: `/sets/${set.set_code}.jpg`,
			cards,
			draftN,
			packN,
			setNameCorrect,
		})
	})

	app.get("/trivia/:id", (req, res) => {
		const card = req.params.id
		request(
			{
				url: encodeURI(
					`https://yugipedia.com/wiki/Card_Trivia:${card.replace(
						/ /g,
						"_"
					)}`
				),
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					const msg =
						"ERRORE: " +
						`https://yugipedia.com/wiki/Card_Trivia:${card.replace(
							/ /g,
							"_"
						)}` +
						" " +
						error
					console.log(msg)
					return res.json([])
				} else {
					const $ = load(body)
					//	const lines = $(".mw-parser-output").html().split("\n").filter(_=>_.includes("<li>") && _.includes("href="));
					let ris = []
					$(".mw-parser-output li").each(function (idx, li) {
						const $li = $(li)
						const desc = $li.text().replace(/\n/g, "\n\t\t")
						const relatedCardsList = []
						load($li.html())("a").each(function (idx, a) {
							const $a = $(a)
							const att = $a.attr("title")
							if (att !== undefined)
								relatedCardsList.push({ card: att, desc })
						})
						ris = ris.concat(
							relatedCardsList.filter(
								(_) => hashAllCards[_.card] !== undefined
							)
						)
					})
					return res.json(
						ris.map((_) => {
							return {
								id: hashAllCards[_.card][0].id,
								name: _.card,
								desc: _.desc,
							}
						})
					)
				}
			}
		)
	})

	function packImage(set_name) {
		return `/sets/${
			allsets.find(
				(_) => _.set_name.toLowerCase() === set_name.toLowerCase()
			).set_code
		}.jpg`
	}

	function rarityAssignAndOccurrence(cards, set_name) {
		//	each element assign rarity
		cards.forEach(
			(_) =>
				(_.rarity = _.card_sets.find(
					(_) => _.set_name.toLowerCase() === set_name
				))
		)

		//	compute different rarities and occurrences in pack
		const differentRarities = []
		cards
			.map((_) =>
				_.card_sets.find((_) => _.set_name.toLowerCase() === set_name)
			)
			.forEach((elem) => {
				const currentRarity = differentRarities.find(
					(_) => _.set_rarity_code === elem.set_rarity_code
				)
				if (currentRarity === undefined)
					differentRarities.push({
						set_rarity_code: elem.set_rarity_code,
						set_rarity: elem.set_rarity,
						n: 1,
					})
				else currentRarity.n += 1
			})
		return differentRarities.sort((a, b) => a.n - b.n)
	}

	function computePrecedence(differentRarities, draftN) {
		let times = 1
		let currentN = differentRarities[0].n
		differentRarities.forEach((rarity) => {
			if (rarity.n > currentN) times += Math.ceil(Math.sqrt(draftN))
			rarity.times = times
			currentN = rarity.n
		})
		if (differentRarities.length < 5 || draftN === 90)
			differentRarities.find((_) => _.times === 1).times =
				1 + Math.ceil(Math.sqrt(draftN) / 2)
	}

	function listCardsPrecedence(filteredCopy, differentRarities) {
		const tmpArr = []
		filteredCopy.forEach((elem) => {
			const rarity = elem.rarity.set_rarity_code
			const times = differentRarities.find(
				(_) => _.set_rarity_code === rarity
			).times
			for (let i = 0; i < times; i++) {
				tmpArr.push(elem)
			}
		})
		return tmpArr
	}

	function hashGroupBy(obj, key) {
		const ris = {}
		if (obj[0][key] === undefined) return ris
		obj.forEach((elem) => {
			const risElem = ris[elem[key]]
			if (risElem === undefined) {
				const toPush = [elem]
				ris[elem[key]] = toPush
			} else risElem.push(elem)
		})
		return ris
	}

	async function updateWithOCG(allsets, allcards, allcardsToT) {
		const Local = false
		const ocgsets = Local
			? JSON.parse(fs.readFileSync("server/data/ocgsets.json").toString())
			: await new Promise((resolve, reject) => {
					request(
						{
							url: `https://raw.githubusercontent.com/laaners/ygobox_nuxt/master/server/data/ocgsets.json`,
							method: "GET",
						},
						function (error, resp, body) {
							if (error || resp.statusCode !== 200) {
								console.log("ERROR OCG sets: " + error)
								resolve([])
							} else {
								console.log("Got OCG sets")
								resolve(JSON.parse(body))
							}
						}
					)
			  })
		ocgsets.forEach((ocgset) => {
			allsets.push({
				set_name: ocgset.set_name,
				set_code: ocgset.set_code,
				num_of_cards: ocgset.cards.length,
				tcg_date: ocgset.tcg_date,
				ocg_pic_url: ocgset.ocg_pic_url,
			})
			allcards.forEach((segment) => {
				segment.forEach((card) => {
					const ocgcard = ocgset.cards[card.id]
					if (ocgcard !== undefined) {
						if (card.card_sets === undefined) card.card_sets = []
						card.card_sets.push({
							set_name: ocgset.set_name,
							set_code: ocgcard.set_code,
							set_rarity: ocgcard.set_rarity,
							set_rarity_code: ocgcard.set_rarity_code,
							ocg_pic_url: ocgset.ocg_pic_url,
						})
					}
				})
			})
			allcardsToT.forEach((card) => {
				const ocgcard = ocgset.cards[card.id]
				if (ocgcard !== undefined) {
					if (card.card_sets === undefined) card.card_sets = []
					card.card_sets.push({
						set_name: ocgset.set_name,
						set_code: ocgcard.set_code,
						set_rarity: ocgcard.set_rarity,
						set_rarity_code: ocgcard.set_rarity_code,
						ocg_pic_url: ocgset.ocg_pic_url,
					})
				}
			})
		})
	}

	app.post("/search_cards", (req, res) => {
		console.log(req.body)
		const {
			pack,
			type1,
			type2,
			raceSpellTrap,
			pendulumScale,
			raceMonster,
			attribute,
			levelRankRating,
			atk,
			def,
			cardName,
			cardEffect,
			linkmarkers,
			favouriteCards,
		} = req.body
		let filtered = [...allcardsToT]
		if (favouriteCards.length !== 0) {
			filtered = filtered.filter((_) => favouriteCards.includes(_.id))
		}
		if (pack !== "")
			filtered = filtered
				.filter((_) => _.card_sets !== undefined)
				.filter((_) =>
					_.card_sets
						.map((set) => set.set_name.toLowerCase())
						.includes(pack.toLowerCase())
				)

		if (pendulumScale !== "_")
			filtered = filtered
				.filter((_) => _.scale !== undefined)
				.filter((_) => eval(`_.scale ${pendulumScale}`))

		/*	LINK MARKERS!!!!!!!!!!!!!!!!!! */
		if (linkmarkers.length !== 0)
			filtered = filtered
				.filter((_) => _.linkmarkers !== undefined)
				.filter(
					(_) =>
						JSON.stringify(
							_.linkmarkers.sort((a, b) => (a > b ? -1 : 1))
						) ===
						JSON.stringify(
							linkmarkers.sort((a, b) => (a > b ? -1 : 1))
						)
				)

		filtered = filtered.filter(
			(_) =>
				_.type.includes(type1) &&
				_.type.includes(type2) &&
				_.race.toLowerCase().includes(raceMonster.toLowerCase()) &&
				_.race.toLowerCase().includes(raceSpellTrap.toLowerCase())
		)
		if (raceMonster === "Beast")
			filtered = filtered.filter(
				(_) =>
					!_.race.toLowerCase().includes("winged beast") &&
					!_.race.toLowerCase().includes("divine-beast") &&
					!_.race.toLowerCase().includes("beast-warrior")
			)
		if (raceMonster === "Warrior")
			filtered = filtered.filter(
				(_) => !_.race.toLowerCase().includes("beast-warrior")
			)
		if (attribute !== "")
			filtered = filtered
				.filter((_) => _.attribute !== undefined)
				.filter((_) => _.attribute === attribute)

		if (levelRankRating !== "_")
			filtered = filtered
				.filter((_) => _.level !== undefined || _.linkval !== undefined)
				.filter((card) => {
					if (card.level !== undefined) {
						// eslint-disable-next-line no-unused-vars
						const _ = card.level
						return eval(levelRankRating)
					} else if (card.linkval !== undefined) {
						// eslint-disable-next-line no-unused-vars
						const _ = card.linkval
						return eval(levelRankRating)
					}
					return false
				})

		if (atk !== "> -1") {
			filtered = filtered
				.filter((_) => _.atk !== undefined)
				.filter((_) => eval(`_.atk  ${atk}`))
		}
		if (def !== "> -1") {
			filtered = filtered
				.filter((_) => _.atk !== undefined)
				.filter((_) => eval(`_.def ${def}`))
		}
		if (cardName !== "") {
			const regex = new RegExp(cardName.toLowerCase(), "g")
			filtered = filtered.filter(
				(_) =>
					_.name.toLowerCase().search(regex) >= 0 ||
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as a "${cardName.toLowerCase()}"`
						) ||
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as an "${cardName.toLowerCase()}"`
						)
			)
		}
		//        if(card_effect != "") filtered = filtered.filter(_=>_.desc.toLowerCase().includes(card_effect.toLowerCase()));
		if (cardEffect !== "") {
			const regex = new RegExp(cardEffect.toLowerCase(), "g")
			filtered = filtered.filter(
				(_) => _.desc.toLowerCase().search(regex) >= 0
			)
		}
		return res.json(filtered)
	})

	app.get("/update_banlist", (req, res) => {
		if (req.query.id === undefined || req.query.id === null)
			return res.send("Undefined id")
		if (req.query.banner === undefined || req.query.banner === null)
			return res.send("Undefined banner")

		if (!["Ale", "Leo", "Sandro", "Siwei"].includes(req.query.banner))
			return res.send("Non existent banner")
		if (bannedCards.find((_) => _.id === +req.query.id) !== undefined)
			return res.send("Already existent card")
		const card = allcardsToT.find((_) => _.id === +req.query.id)
		if (card === undefined) return res.send("Non existent id")
		bannedCards.push({
			id: card.id,
			name: card.name,
			banner: req.query.banner,
			info: card,
		})
		pusher.trigger("my-channel", "my-event", {
			message: "hello world",
		})
		return res.send("Banned: " + card.name)
	})

	app.get("/guess_card", (req, res) => {
		if (
			req.query.cardsFilter === undefined ||
			req.query.cardsFilter === null
		)
			return res.send("Undefined filter")
		pusher.trigger("my-channel", "my-event", {
			message: req.query.cardsFilter,
		})
		return res.send(req.query.cardsFilter)
	})
})()
