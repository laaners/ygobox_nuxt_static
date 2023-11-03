export default {
	methods: {
		groupBy(obj, key, listName) {
			const ris = []
			if (obj[0][key] === undefined) return ris
			obj.forEach((elem) => {
				const risElem = ris.find((_) => _[key] === elem[key])
				if (risElem === undefined) {
					const toPush = {}
					toPush[key] = elem[key]
					toPush[listName] = [elem]
					ris.push(toPush)
				} else risElem[listName].push(elem)
			})
			return ris
		},
		hashGroupBy(obj, key) {
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
		},
		getRarityCode(rarity) {
			const rarities = [
				{ code: "(SR)", rarity: "Super Rare" },
				{ code: "(UR)", rarity: "Ultra Rare" },
				{ code: "(ScR)", rarity: "Secret Rare" },
				{ code: "(GR)", rarity: "Ghost Rare" },
				{ code: "(UtR)", rarity: "Ultimate Rare" },
				{ code: "(StR)", rarity: "Starlight Rare" },
				{ code: "(PScR)", rarity: "Prismatic Secret Rare" },
				{ code: "(GUR)", rarity: "Gold Rare" },
				{ code: "(PG)", rarity: "Premium Gold Rare" },
				{ code: "(GScR)", rarity: "Gold Secret Rare" },
				{ code: "(GGR)", rarity: "Ghost/Gold Rare" },

				/*
				{ code: "(SP)", rarity: "Short Print" },
				{ code: "(SHR)", rarity: "Shatterfoil Rare" },
				{
					code: "(DNPR)",
					rarity: "Duel Terminal Normal Parallel Rare",
				},
				{ code: "(R)", rarity: "Rare" },
				{ code: "(MSR)", rarity: "Mosaic Rare" },
				{ code: "(SFR)", rarity: "Starfoil Rare" },
				{ code: "(CR)", rarity: "Collector's Rare" },
				{ code: "(DRPR)", rarity: "Duel Terminal Rare Parallel Rare" },
				{ code: "(DSPR)", rarity: "Duel Terminal Super Parallel Rare" },
				{ code: "(DUPR)", rarity: "Duel Terminal Ultra Parallel Rare" },
				{ code: "", rarity: "Extra Secret Rare" },
				{ code: "(PIR)", rarity: "Platinum Rare" },
				{ code: "(UPR)", rarity: "Ultra Parallel Rare" },
				{ code: "(PS)", rarity: "Platinum Secret Rare" },
				{ code: "(SSP)", rarity: "Super Short Print" },
				{ code: "(SPR)", rarity: "Super Parallel Rare" },
				{ code: "(UScR)", rarity: "Ultra Secret Rare" },
				{ code: "(10000ScR)", rarity: "10000 Secret Rare" },
				*/
			]
			return rarities
				.find((_) => _.rarity === rarity)
				?.code.replace("(", "")
				.replace(")", "")
		},
		listOrder(n) {
			if (n === 1) return "Normal Monster"
			if (n === 2) return "Effect Monster"
			if (n === 3) return "Spirit Monster"
			if (n === 4) return "Flip Effect Monster"
			if (n === 5) return "Toon Monster"
			if (n === 6) return "Union Effect Monster"
			if (n === 7) return "Gemini Monster"
			if (n === 8) return "Tuner Monster"
			if (n === 9) return "Normal Tuner Monster"
			if (n === 10) return "Pendulum Normal Monster"
			if (n === 11) return "Pendulum Effect Monster"
			if (n === 12) return "Pendulum Flip Effect Monster"
			if (n === 13) return "Pendulum Tuner Effect Monster"
			if (n === 14) return "Ritual Monster"
			if (n === 15) return "Ritual Effect Monster"
			if (n === 16) return "Pendulum Effect Ritual Monster"
			if (n === 17) return "Fusion Monster"
			if (n === 18) return "Pendulum Effect Fusion Monster"
			if (n === 19) return "Synchro Monster"
			if (n === 20) return "Synchro Tuner Monster"
			if (n === 21) return "Synchro Pendulum Effect Monster"
			if (n === 22) return "XYZ Monster"
			if (n === 23) return "XYZ Pendulum Effect Monster"
			if (n === 24) return "Link Monster"
			if (n === 25) return "Spell Card Normal"
			if (n === 26) return "Spell Card Ritual"
			if (n === 27) return "Spell Card Quick-Play"
			if (n === 28) return "Spell Card Continuous"
			if (n === 29) return "Spell Card Equip"
			if (n === 30) return "Spell Card Field"
			if (n === 31) return "Trap Card Normal"
			if (n === 32) return "Trap Card Continuous"
			if (n === 33) return "Trap Card Counter"
			if (n === 34) return "Skill Card Andrew"
			if (n === 35) return "Skill Card Arkana"
			if (n === 36) return "Skill Card Bonz"
			if (n === 37) return "Skill Card Christine"
			if (n === 38) return "Skill Card David"
			if (n === 39) return "Skill Card Emma"
			if (n === 40) return "Skill Card Espa Roba"
			if (n === 41) return "Skill Card Ishizu"
			if (n === 42) return "Skill Card Ishizu Ishtar"
			if (n === 43) return "Skill Card Joey"
			if (n === 44) return "Skill Card Joey Wheeler"
			if (n === 45) return "Skill Card Kaiba"
			if (n === 46) return "Skill Card Keith"
			if (n === 47) return "Skill Card Lumis Umbra"
			if (n === 48) return "Skill Card Mai"
			if (n === 49) return "Skill Card Mai Valentine"
			if (n === 50) return "Skill Card Mako"
			if (n === 51) return "Skill Card Odion"
			if (n === 52) return "Skill Card Pegasus"
			if (n === 53) return "Skill Card Rex"
			if (n === 54) return "Skill Card Seto Kaiba"
			if (n === 55) return "Skill Card Tea Gardner"
			if (n === 56) return "Skill Card Weevil"
			if (n === 57) return "Skill Card Yami Bakura"
			if (n === 58) return "Skill Card Yami Marik"
			if (n === 59) return "Skill Card Yami Yugi"
			if (n === 60) return "Skill Card Yugi"
			if (n === 61) return "Token Aqua"
			if (n === 62) return "Token Beast"
			if (n === 63) return "Token Cyberse"
			if (n === 64) return "Token Dinosaur"
			if (n === 65) return "Token Dragon"
			if (n === 66) return "Token Fairy"
			if (n === 67) return "Token Fiend"
			if (n === 68) return "Token Fish"
			if (n === 69) return "Token Insect"
			if (n === 70) return "Token Machine"
			if (n === 71) return "Token Plant"
			if (n === 72) return "Token Pyro"
			if (n === 73) return "Token Reptile"
			if (n === 74) return "Token Rock"
			if (n === 75) return "Token Thunder"
			if (n === 76) return "Token Warrior"
			if (n === 77) return "Token Winged Beast"
			if (n === 78) return "Token Wyrm"
			if (n === 79) return "Token Zombie"
		},
		categorySort(cards) {
			const listOrder = {
				1: "Normal Monster",
				"Normal Monster": 1,
				2: "Effect Monster",
				"Effect Monster": 2,
				3: "Spirit Monster",
				"Spirit Monster": 3,
				4: "Flip Effect Monster",
				"Flip Effect Monster": 4,
				5: "Toon Monster",
				"Toon Monster": 5,
				6: "Union Effect Monster",
				"Union Effect Monster": 6,
				7: "Gemini Monster",
				"Gemini Monster": 7,
				8: "Tuner Monster",
				"Tuner Monster": 8,
				9: "Normal Tuner Monster",
				"Normal Tuner Monster": 9,
				10: "Pendulum Normal Monster",
				"Pendulum Normal Monster": 10,
				11: "Pendulum Effect Monster",
				"Pendulum Effect Monster": 11,
				12: "Pendulum Flip Effect Monster",
				"Pendulum Flip Effect Monster": 12,
				13: "Pendulum Tuner Effect Monster",
				"Pendulum Tuner Effect Monster": 13,
				14: "Ritual Monster",
				"Ritual Monster": 14,
				15: "Ritual Effect Monster",
				"Ritual Effect Monster": 15,
				16: "Pendulum Effect Ritual Monster",
				"Pendulum Effect Ritual Monster": 16,
				17: "Fusion Monster",
				"Fusion Monster": 17,
				18: "Pendulum Effect Fusion Monster",
				"Pendulum Effect Fusion Monster": 18,
				19: "Synchro Monster",
				"Synchro Monster": 19,
				20: "Synchro Tuner Monster",
				"Synchro Tuner Monster": 20,
				21: "Synchro Pendulum Effect Monster",
				"Synchro Pendulum Effect Monster": 21,
				22: "XYZ Monster",
				"XYZ Monster": 22,
				23: "XYZ Pendulum Effect Monster",
				"XYZ Pendulum Effect Monster": 23,
				24: "Link Monster",
				"Link Monster": 24,
				25: "Spell Card Normal",
				"Spell Card Normal": 25,
				26: "Spell Card Ritual",
				"Spell Card Ritual": 26,
				27: "Spell Card Quick-Play",
				"Spell Card Quick-Play": 27,
				28: "Spell Card Continuous",
				"Spell Card Continuous": 28,
				29: "Spell Card Equip",
				"Spell Card Equip": 29,
				30: "Spell Card Field",
				"Spell Card Field": 30,
				31: "Trap Card Normal",
				"Trap Card Normal": 31,
				32: "Trap Card Continuous",
				"Trap Card Continuous": 35,
				33: "Trap Card Counter",
				"Trap Card Counter": 33,
				34: "Skill Card Andrew",
				"Skill Card Andrew": 34,
				35: "Skill Card Arkana",
				"Skill Card Arkana": 35,
				36: "Skill Card Bonz",
				"Skill Card Bonz": 36,
				37: "Skill Card Christine",
				"Skill Card Christine": 37,
				38: "Skill Card David",
				"Skill Card David": 38,
				39: "Skill Card Emma",
				"Skill Card Emma": 39,
				40: "Skill Card Espa Roba",
				"Skill Card Espa Roba": 40,
				41: "Skill Card Ishizu",
				"Skill Card Ishizu": 41,
				42: "Skill Card Ishizu Ishtar",
				"Skill Card Ishizu Ishtar": 42,
				43: "Skill Card Joey",
				"Skill Card Joey": 43,
				44: "Skill Card Joey Wheeler",
				"Skill Card Joey Wheeler": 44,
				45: "Skill Card Kaiba",
				"Skill Card Kaiba": 45,
				46: "Skill Card Keith",
				"Skill Card Keith": 46,
				47: "Skill Card Lumis Umbra",
				"Skill Card Lumis Umbra": 47,
				48: "Skill Card Mai",
				"Skill Card Mai": 48,
				49: "Skill Card Mai Valentine",
				"Skill Card Mai Valentine": 49,
				50: "Skill Card Mako",
				"Skill Card Mako": 50,
				51: "Skill Card Odion",
				"Skill Card Odion": 51,
				52: "Skill Card Pegasus",
				"Skill Card Pegasus": 52,
				53: "Skill Card Rex",
				"Skill Card Rex": 53,
				54: "Skill Card Seto Kaiba",
				"Skill Card Seto Kaiba": 54,
				55: "Skill Card Tea Gardner",
				"Skill Card Tea Gardner": 55,
				56: "Skill Card Weevil",
				"Skill Card Weevil": 56,
				57: "Skill Card Yami Bakura",
				"Skill Card Yami Bakura": 57,
				58: "Skill Card Yami Marik",
				"Skill Card Yami Marik": 58,
				59: "Skill Card Yami Yugi",
				"Skill Card Yami Yugi": 59,
				60: "Skill Card Yugi",
				"Skill Card Yugi": 60,
				61: "Token Aqua",
				"Token Aqua": 61,
				62: "Token Beast",
				"Token Beast": 62,
				63: "Token Cyberse",
				"Token Cyberse": 63,
				64: "Token Dinosaur",
				"Token Dinosaur": 64,
				65: "Token Dragon",
				"Token Dragon": 65,
				66: "Token Fairy",
				"Token Fairy": 66,
				67: "Token Fiend",
				"Token Fiend": 67,
				68: "Token Fish",
				"Token Fish": 68,
				69: "Token Insect",
				"Token Insect": 69,
				70: "Token Machine",
				"Token Machine": 70,
				71: "Token Plant",
				"Token Plant": 71,
				72: "Token Pyro",
				"Token Pyro": 72,
				73: "Token Reptile",
				"Token Reptile": 73,
				74: "Token Rock",
				"Token Rock": 74,
				75: "Token Thunder",
				"Token Thunder": 75,
				76: "Token Warrior",
				"Token Warrior": 76,
				77: "Token Winged Beast",
				"Token Winged Beast": 77,
				78: "Token Wyrm",
				"Token Wyrm": 78,
				79: "Token Zombie",
				"Token Zombie": 79,
			}
			let res = []
			res = cards.map((card) => {
				const type =
					listOrder[
						card.type.includes("Monster")
							? card.type
							: card.type + " " + card.race
					]
				const level = card.level ? card.level : 0
				const linkval = card.linkval ? card.linkval : 0
				return {
					cardInfo: card,
					number: type * 10 ** 6 + level * 10 ** 2 + linkval,
				}
			})

			res = res
				.sort((a, b) => (a.cardInfo.name < b.cardInfo.name ? -1 : 1))
				.sort((a, b) => (a.cardInfo.race < b.cardInfo.race ? -1 : 1))
				.sort((a, b) => a.number - b.number)
				.map((_) => _.cardInfo)

			/*
			for (let i = 1; i <= 79; i++) {
				//	ordino anche per livelli o link rate
				res = res.concat(
					cards
						.filter((x) => x.type === listOrder[i])
						.sort((a, b) => (a.name < b.name ? -1 : 1))
						.sort((a, b) => (a.race < b.race ? -1 : 1))
						.sort((a, b) => a.level - b.level)
						.sort((a, b) => a.linkval - b.linkval)
				)
				res = res.concat(
					cards
						.filter(
							(x) => x.type + " " + x.race === listOrder[i]
						)
						.sort((a, b) => (a.name < b.name ? -1 : 1))
						.sort((a, b) => (a.race < b.race ? -1 : 1))
						.sort((a, b) => a.level - b.level)
						.sort((a, b) => a.linkval - b.linkval)
				)
			}
			*/
			/*
			console.log(
				cards.filter((_) => !res.includes(_)).map((_) => _.type)
				)
			*/
			return res
		},
		getPicUrl(id) {
			if (id === 12196873)
				return "https://ms.yugipedia.com//thumb/a/a9/MetaphysDecoyDragon-CYHO-EN-C-1E.png/300px-MetaphysDecoyDragon-CYHO-EN-C-1E.png"
			return `https://images.ygoprodeck.com/images/cards/${id}.jpg`
		},
		getPicSmallUrl(id) {
			return `https://images.ygoprodeck.com/images/cards_small/${id}.jpg`
		},
		getPicArtUrl(id) {
			return `https://images.ygoprodeck.com/images/cards_cropped/${id}.jpg`
		},
		download(filename, text) {
			const element = document.createElement("a")
			element.setAttribute(
				"href",
				"data:text/plain;charset=utf-8," + encodeURIComponent(text)
			)
			element.setAttribute("download", filename)

			element.style.display = "none"
			document.body.appendChild(element)

			element.click()

			document.body.removeChild(element)
		},
		async getAllCards() {
			/*
			const [seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8] =
				await Promise.all([
					this.$axios.$get("api/allcards?n=0"),
					this.$axios.$get("api/allcards?n=1"),
					this.$axios.$get("api/allcards?n=2"),
					this.$axios.$get("api/allcards?n=3"),
					this.$axios.$get("api/allcards?n=4"),
					this.$axios.$get("api/allcards?n=5"),
					this.$axios.$get("api/allcards?n=6"),
					this.$axios.$get("api/allcards?n=7"),
				])
			const allcards = [
				...new Set([
					...seg1,
					...seg2,
					...seg3,
					...seg4,
					...seg5,
					...seg6,
					...seg7,
					...seg8,
				]),
			]
			return allcards
			*/
			const { data } = await this.$axios.$get(
				"https://db.ygoprodeck.com/api/v7/cardinfo.php"
			)
			// data.find((_) => _.id === 1011091).id = 72309040
			// data.find((_) => _.id === 10034401).id = 84544192
			// data.find((_) => _.id === 10028504).id = 62219643
			return data
		},
		async getAllCardsLocal() {
			const [seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8] =
				await Promise.all([
					this.$axios.$get("api/allcards?n=0"),
					this.$axios.$get("api/allcards?n=1"),
					this.$axios.$get("api/allcards?n=2"),
					this.$axios.$get("api/allcards?n=3"),
					this.$axios.$get("api/allcards?n=4"),
					this.$axios.$get("api/allcards?n=5"),
					this.$axios.$get("api/allcards?n=6"),
					this.$axios.$get("api/allcards?n=7"),
				])
			const allcards = [
				...new Set([
					...seg1,
					...seg2,
					...seg3,
					...seg4,
					...seg5,
					...seg6,
					...seg7,
					...seg8,
				]),
			]
			return allcards
		},
		timeSince(dateString) {
			const dateObject = new Date(dateString)
			const milliseconds = dateObject.getTime()

			let nowDate = new Date()
			nowDate = new Date(
				nowDate.getUTCFullYear(),
				nowDate.getUTCMonth(),
				nowDate.getUTCDate(),
				nowDate.getUTCHours(),
				nowDate.getUTCMinutes(),
				nowDate.getUTCSeconds()
			)

			const seconds = Math.floor(
				(nowDate.getTime() - milliseconds) / 1000
			)

			let interval = seconds / 31536000

			if (interval === 1) return Math.floor(interval) + " anno"
			if (interval > 1) return Math.floor(interval) + " anni"

			interval = seconds / 2592000
			if (interval === 1) return Math.floor(interval) + " mese"
			if (interval > 1) return Math.floor(interval) + " mesi"

			interval = seconds / 86400
			if (interval === 1) return Math.floor(interval) + " giorno"
			if (interval > 1) return Math.floor(interval) + " giorni"

			interval = seconds / 3600
			if (interval === 1) return Math.floor(interval) + " ora"
			if (interval > 1) return Math.floor(interval) + " ore"

			interval = seconds / 60
			if (interval === 1) return Math.floor(interval) + " minuto"
			if (interval > 1) return Math.floor(interval) + " minuti"

			return Math.floor(seconds) + " secondi"
		},
	},
}
