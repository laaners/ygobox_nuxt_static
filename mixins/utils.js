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
		getPointsJSON() {

            /*
			https://www.yugioh-card.com/en/genesys
            let ris = {}
            cards = Array.from(document.body.querySelectorAll("#tablepress-genesys tbody tr"))
            cards.forEach(_=>{
                const values = Array.from(_.querySelectorAll("td"))
                console.log(values)
                ris[values[0].innerText] = +values[1].innerText
            })
            */
			return {
				"Abyss Dweller": 100,
				"Adamancipator Risen - Dragite": 20,
				"Agido the Ancient Sentinel": 50,
				"Albion the Sanctifire Dragon": 33,
				"Allure of Darkness": 5,
				"Amorphactor Pain, the Imagination Dracoverlord": 100,
				"Ancient Gear Advance": 33,
				"Ancient Gear Statue": 33,
				"And the Band Played On": 100,
				"Angel O7": 100,
				"Anti-Spell Fragrance": 100,
				"Appointer of the Red Lotus": 50,
				"Arcana Force XXI - The World": 100,
				"Archlord Kristya": 100,
				"Archnemeses Eschatos": 100,
				"Archnemeses Protos": 100,
				"Artifact Scythe": 100,
				"Asceticism of the Six Samurai": 10,
				"Ash Blossom & Joyous Spring": 15,
				"Assault Synchron": 5,
				"Astral Kuriboh": 3,
				"Atlantean Dragoons": 40,
				"Azamina Ilia Silvia": 20,
				"Azamina Mu Rcielago": 33,
				"Bahamut Shark": 81,
				"Baronne de Fleur": 85,
				"Barrier of the Voiceless Voice": 33,
				"Barrier Statue of the Abyss": 60,
				"Barrier Statue of the Drought": 60,
				"Barrier Statue of the Heavens": 60,
				"Barrier Statue of the Inferno": 60,
				"Barrier Statue of the Stormwinds": 60,
				"Barrier Statue of the Torrent": 60,
				"Beatrice, Lady of the Eternal": 100,
				"Big Welcome Labrynth": 33,
				"Blackwing - Boreastorm the Wicked Wind": 20,
				"Blackwing - Zephyros the Elite": 13,
				"Blaster, Dragon Ruler of Infernos": 7,
				"Blaze Fenix, the Burning Bombardment Bird": 70,
				"Blazing Cartesia, the Virtuous": 3,
				"Block Dragon": 33,
				Bonfire: 33,
				"Book of Eclipse": 5,
				"Book of Moon": 7,
				"Brain Research Lab": 100,
				"Branded Expulsion": 33,
				"Branded Fusion": 33,
				"Branded Lost": 66,
				"Brilliant Fusion": 33,
				"Butterfly Dagger - Elma": 1,
				"Bystial Baldrake": 30,
				"Bystial Dis Pater": 10,
				"Bystial Druiswurm": 30,
				"Bystial Magnamhut": 33,
				"Bystial Saronir": 20,
				"Called by the Grave": 20,
				"Card Destruction": 40,
				"Card of Demise": 40,
				"Card of Safe Return": 40,
				"Catapult Turtle": 100,
				"Centur-Ion Auxila": 33,
				"Centur-Ion Primera": 5,
				"Centur-Ion Trudea": 3,
				"Chain Strike": 50,
				"Change of Heart": 10,
				"Chaofeng, Phantom of the Yang Zing": 13,
				"Chaos Angel": 20,
				"Chaos Dragon Levianeer": 10,
				"Chaos Ruler, the Chaotic Magical Dragon": 50,
				"Chaos Space": 40,
				"Charge of the Light Brigade": 33,
				"Chicken Game": 7,
				"Cold Wave": 100,
				Confiscation: 100,
				'Contact "C"': 100,
				"Cornfield Coatl": 33,
				"Cosmic Blazar Dragon": 1,
				"Creature Swap": 1,
				"Crimson Dragon": 100,
				"Crossout Designator": 10,
				"Crystron Inclusion": 33,
				"Crystron Smiger": 5,
				"Crystron Sulfador": 3,
				"Crystron Thystvern": 5,
				"Cyber Angel Benten": 40,
				"Cyber Dragon Infinity": 20,
				"Cyber Jar": 33,
				"Cyber-Stein": 27,
				"D/D/D Duo-Dawn King Kali Yuga": 77,
				"D/D/D Wave High King Caesar": 20,
				"Daigusto Emeral": 1,
				"Danger! Bigfoot!": 3,
				"Danger! Chupacabra!": 3,
				"Danger! Dogman!": 3,
				"Danger! Mothman!": 3,
				"Danger! Nessie!": 7,
				"Danger! Ogopogo!": 3,
				"Danger! Thunderbird!": 3,
				"Danger!? Jackalope?": 7,
				"Danger!? Tsuchinoko?": 7,
				"Dark End Evaporation Dragon": 5,
				"Dark Hole": 3,
				"Dark World Archives": 5,
				"Dark World Dealings": 5,
				"Deception of the Sinful Spoils": 33,
				"Deck Lockdown": 100,
				"Deep Sea Aria": 33,
				"Delinquent Duo": 100,
				"Demise of the Land": 1,
				"Denglong, First of the Yang Zing": 33,
				"Denko Sekka": 20,
				"Destiny HERO - Destroyer Phoenix Enforcer": 20,
				"Destiny HERO - Plasma": 20,
				"Destructive Daruma Karma Cannon": 5,
				"Diabell, Queen of the White Forest": 25,
				"Diabellstar the Black Witch": 20,
				"Different Dimension Ground": 10,
				"Dimension Fusion": 45,
				"Dimension Shifter": 10,
				"Dimensional Barrier": 100,
				"Dinomorphia Intact": 1,
				"Dinomorphia Rexterm": 91,
				"Dinowrestler Pankratops": 10,
				"Divine Arsenal AA-ZEUS - Sky Thunder": 20,
				"Diviner of the Herald": 33,
				"Djinn Releaser of Rituals": 100,
				"Dogmatika Ecclesia, the Virtuous": 3,
				"Domain of the True Monarchs": 50,
				"Dominus Impulse": 30,
				"Dominus Purge": 10,
				"Dominus Spiral": 10,
				"Dracotail Arthalion": 20,
				"Dracotail Faimena": 20,
				"Dracotail Mululu": 5,
				"Dragon Master Magia": 100,
				"Dragonic Diagram": 33,
				"Dragonmaid Sheou": 20,
				"Dragonmaid Tidying": 10,
				"Dragon's Bind": 100,
				"Dragon's Light and Darkness": 7,
				"Droll & Lock Bird": 5,
				"Drytron Alpha Thuban": 33,
				"Drytron Mu Beta Fafnir": 33,
				Duality: 10,
				"Eclipse Wyvern": 33,
				"Effect Veiler": 7,
				"El Shaddoll Apkallone": 10,
				"El Shaddoll Winda": 60,
				"Elder Entity Norden": 91,
				"Elder Entity N'tss": 7,
				"Elemental HERO Stratos": 3,
				"Elzette, Azamina of the White Forest": 22,
				"Emergency Teleport": 40,
				"EMERGENCY!": 33,
				Eva: 1,
				"Evenly Matched": 10,
				"Evilswarm Ouroboros": 67,
				"Ext Ryzeal": 25,
				"F.A. Dawn Dragster": 20,
				"Fairy Tail - Snow": 85,
				"Fiber Jar": 30,
				"Final Countdown": 100,
				"Fire Formation - Tenki": 40,
				"Fire King Courtier Ulcanix": 20,
				"Fire King High Avatar Kirin": 10,
				"Fishborg Blaster": 33,
				"Floowandereeze & Robina": 33,
				"Floowandereeze and the Advent of Adventure": 33,
				"Floowandereeze and the Magnificent Map": 33,
				"Foolish Burial": 33,
				"Foolish Burial Goods": 3,
				"Forbidden Chalice": 5,
				"Forbidden Droplet": 10,
				"Forbidden Lance": 3,
				"Fossil Dig": 40,
				"Fossil Dyna Pachycephalo": 100,
				"Frightfur Patchwork": 33,
				"Fusion Destiny": 33,
				"Gallant Granite": 33,
				"Gateway of the Six": 100,
				"Gem-Knight Master Diamond": 66,
				"Ghost Belle & Haunted Mansion": 5,
				"Ghost Meets Girl - A Masterful Mayakashi Shiranui Saga": 100,
				"Ghost Mourner & Moonlit Chill": 7,
				"Ghost Ogre & Snow Rabbit": 5,
				"Ghost Sister & Spooky Dogwood": 3,
				"Giant Trunade": 40,
				"Gigantic Spright": 20,
				"Gimmick Puppet Nightmare": 70,
				"Give and Take": 91,
				"Gladiator Beast Gyzarus": 20,
				"Gladiator Beast Tamer Editor": 20,
				"Gladiator Proving Ground": 33,
				"Gladiator Rejection": 15,
				"Glow-Up Bulb": 21,
				"Goblin Biker Grand Entrance": 33,
				"Gold Sarcophagus": 10,
				"Gozen Match": 100,
				"Graceful Charity": 40,
				"Grapha, Dragon Lord of Dark World": 5,
				"Grapha, Dragon Overlord of Dark World": 5,
				"Gruesome Grave Squirmer": 1,
				"Guardian Chimera": 33,
				"Guiding Quem, the Virtuous": 3,
				"Harpie's Feather Duster": 30,
				"Harpie's Feather Storm": 100,
				"Heart of the Blue-Eyes": 5,
				"Heat Wave": 100,
				"Heavy Storm": 20,
				"Herald of the Arc Light": 50,
				"Hot Red Dragon Archfiend King Calamity": 1,
				"Hyper Rank-Up-Magic Utopiforce": 1,
				"Ice Ryzeal": 20,
				"Ido the Supreme Magical Force": 100,
				"Imperial Order": 100,
				"Imsety, Glory of Horus": 33,
				"Incoming Machine!": 33,
				"Incredible Ecclesia, the Virtuous": 3,
				"Infernal Flame Banshee": 33,
				"Infernity Launcher": 88,
				"Infinite Impermanence": 13,
				"Inspector Boarder": 20,
				"Instant Fusion": 100,
				"Interrupted Kaiju Slumber": 33,
				"Into the Void": 3,
				"Invoked Caliga": 90,
				"Jet Synchron": 1,
				"Jowgen the Spiritualist": 100,
				"Junk Speeder": 100,
				"K9-04 Noroi": 10,
				'K9-17 "Ripper"': 20,
				"K9-17 Izuna": 20,
				"K9-66a Jokul": 13,
				"K9-ØØ Lupis": 5,
				"Kaiser Colosseum": 100,
				"Kashtira Arise-Heart": 97,
				"Kashtira Fenrir": 30,
				"Kashtira Unicorn": 30,
				"Kelbek the Ancient Vanguard": 50,
				"Keldo the Sacred Protector": 1,
				"Ketu Dracotail": 10,
				"King of the Feral Imps": 33,
				"King's Sarcophagus": 33,
				"Knight Armed Dragon, the Armored Knight Dragon": 3,
				"Knightmare Corruptor Iblee": 100,
				"Koa'ki Meiru Drago": 75,
				"Koa'ki Meiru Guardian": 3,
				"Koa'ki Meiru Overload": 3,
				"Koa'ki Meiru Sandman": 3,
				"Koa'ki Meiru Wall": 3,
				"Lady Labrynth of the Silver Castle": 33,
				"Lady's Dragonmaid": 20,
				"Last Turn": 75,
				"Last Will": 100,
				"Lavalval Chain": 80,
				"Left Arm Offering": 7,
				"Legendary Fire King Ponix": 10,
				"Legendary Lord Six Samurai - Shi En": 10,
				"Legendary Six Samurai - Shi En": 10,
				"Level Eater": 100,
				"Life Equalizer": 100,
				"Light and Darkness Dragonlord": 20,
				"Light Barrier": 1,
				"Light End Sublimation Dragon": 5,
				"Lightning Storm": 40,
				"Lightsworn Dragonling": 10,
				"Lonefire Blossom": 33,
				"Lose 1 Turn": 100,
				"Lubellion the Searing Dragon": 33,
				"Lyrilusc - Beryl Canary": 5,
				"Lyrilusc - Bird Call": 20,
				"Lyrilusc - Independent Nightingale": 1,
				"Magical Explosion": 75,
				"Magical Mid-Breaker Field": 60,
				"Magical Scientist": 95,
				"Magician of Black Chaos MAX": 100,
				"Majesty's Fiend": 100,
				"Mansion of the Dreadful Dolls": 100,
				"Masked HERO Dark Law": 70,
				"Mass Driver": 100,
				"Master Peace, the True Dracoslaying King": 33,
				"Mathmech Sigma": 7,
				'Maxx "C"': 50,
				"Meizen the Battle Ninja": 20,
				"Mementomictlan Tecuhtlica - Creation King": 33,
				"Mementotlan Bone Party": 33,
				"Mementotlan Twin Dragon": 33,
				Metamorphosis: 10,
				Metaverse: 3,
				"Mikanko Water Arabesque": 10,
				"Millennium Ankh": 3,
				"Mind Drain": 100,
				"Mind Master": 1,
				"Mirage of Nightmare": 10,
				"Mirrorjade the Iceblade Dragon": 33,
				Miscellaneousaurus: 75,
				Mistake: 100,
				"Mitsurugi Prayers": 60,
				"Mitsurugi Ritual": 60,
				"Monster Gate": 50,
				"Monster Reborn": 15,
				"Morphing Jar": 33,
				"Morphtronic Telefon": 55,
				"Moulinglacia the Elemental Lord": 100,
				"Mudora the Sword Oracle": 1,
				"Mulcharmy Fuwalos": 7,
				"Mulcharmy Meowls": 3,
				"Mulcharmy Purulia": 10,
				"Multi-Universe": 3,
				"M-X-Saber Invoker": 33,
				"Mystic Mine": 100,
				"Nadir Servant": 33,
				"Naturia Barkion": 10,
				"Naturia Beast": 50,
				"Naturia Exterio": 100,
				Necrovalley: 40,
				"Neptabyss, the Atlantean Prince": 33,
				"Nibiru, the Primal Being": 10,
				"Nightmare Apprentice": 33,
				"Nightmare Throne": 50,
				"Number 1: Infection Buzzking": 85,
				"Number 1: Numeron Gate Ekam": 10,
				"Number 100: Numeron Dragon": 1,
				"Number 16: Shock Master": 100,
				"Number 2: Numeron Gate Dve": 10,
				"Number 3: Numeron Gate Trini": 10,
				"Number 38: Hope Harbinger Dragon Titanic Galaxy": 20,
				"Number 4: Numeron Gate Catvari": 10,
				"Number 40: Gimmick Puppet of Strings": 50,
				"Number 41: Bagooska the Terribly Tired Tapir": 100,
				"Number 43: Manipulator of Souls": 100,
				"Number 59: Crooked Cook": 100,
				"Number 60: Dugares the Timeless": 10,
				"Number 67: Pair-a-Dice Smasher": 67,
				"Number 75: Bamboozling Gossip Shadow": 70,
				"Number 86: Heroic Champion - Rhongomyniad": 31,
				"Number 89: Diablosis the Mind Hacker": 85,
				"Number 90: Galaxy-Eyes Photon Lord": 10,
				"Number 95: Galaxy-Eyes Dark Matter Dragon": 50,
				"Number 97: Draglubion": 100,
				"Number C1: Numeron Chaos Gate Sunya": 10,
				"Number C40: Gimmick Puppet of Dark Strings": 50,
				"Number F0: Utopic Draco Future": 20,
				"Number S0: Utopic ZEXAL": 100,
				"Numbers Eveil": 70,
				"Numeron Calling": 30,
				"Numeron Network": 33,
				"Obedience Schooled": 40,
				"Ohime the Manifested Mikanko": 33,
				"Ojama Duo": 2,
				"Ojama Trio": 3,
				"One Day of Peace": 11,
				"One for One": 91,
				Onomatopaira: 33,
				"Original Sinful Spoils - Snake-Eye": 100,
				"Outer Entity Azathot": 100,
				"Painful Choice": 95,
				"Phantom Knights' Rank-Up-Magic Force": 1,
				"Phantom of Yubel": 50,
				"Pilgrim Reaper": 50,
				"Planet Pathfinder": 2,
				"Pot of Desires": 20,
				"Pot of Greed": 30,
				"Pot of Prosperity": 40,
				"Powersink Stone": 100,
				"Premature Burial": 25,
				"Preparation of Rites": 5,
				"Pre-Preparation of Rites": 10,
				"Pressured Planet Wraitsoth": 33,
				"Primeval Planet Perlereino": 50,
				"Primite Lordly Lode": 33,
				Prohibition: 100,
				"Pseudo Space": 3,
				"Psi-Blocker": 61,
				"Psychic End Punisher": 20,
				"PSY-Framegear Delta": 7,
				"PSY-Framegear Epsilon": 7,
				"PSY-Framegear Gamma": 15,
				"PSY-Framelord Omega": 100,
				Purrely: 15,
				"Purrely Sleepy Memory": 15,
				Purrelyly: 10,
				"Quick Launch": 33,
				"Raidraptor - Vanishing Lanius": 5,
				Raigeki: 7,
				"Rank-Up-Magic - The Seventh One": 1,
				"Rank-Up-Magic Admiration of the Thousands": 1,
				"Rank-Up-Magic Argent Chaos Force": 5,
				"Rank-Up-Magic Astral Force": 1,
				"Rank-Up-Magic Barian's Force": 1,
				"Rank-Up-Magic Cipher Ascension": 1,
				"Rank-Up-Magic Doom Double Force": 1,
				"Rank-Up-Magic Limited Barian's Force": 1,
				"Rank-Up-Magic Magical Force": 1,
				"Rank-Up-Magic Numeron Force": 1,
				"Rank-Up-Magic Quick Chaos": 1,
				"Rank-Up-Magic Raid Force": 1,
				"Rank-Up-Magic Raptor's Force": 1,
				"Rank-Up-Magic Revolution Force": 1,
				"Rank-Up-Magic Skip Force": 5,
				"Rank-Up-Magic Soul Shave Force": 5,
				"Rank-Up-Magic Zexal Force": 1,
				"Ra's Disciple": 1,
				Reasoning: 50,
				"Red Reboot": 50,
				"Red-Eyes Dark Dragoon": 100,
				"Redox, Dragon Ruler of Boulders": 7,
				Regenesis: 33,
				"Reinforcement of the Army": 40,
				"Rescue-ACE Air Lifter": 10,
				"Rescue-ACE Preventer": 10,
				"Return from the Different Dimension": 50,
				"Return of the Dragon Lords": 7,
				"Rise Rank-Up-Magic Raidraptor's Force": 1,
				"Rite of Aramesir": 5,
				"Ritual Beast Tamer Elder": 10,
				"Rivalry of Warlords": 100,
				Ronintoadin: 60,
				"Royal Decree": 10,
				"Royal Magical Library": 100,
				"Royal Oppression": 100,
				"Ryzeal Detonator": 20,
				"Ryzeal Duo Drive": 20,
				"Sales Ban": 100,
				"Sangen Kaimen": 50,
				"Sangen Summoning": 100,
				"Sauravis, the Ancient and Ascended": 5,
				"Schwarzschild Infinity Dragon": 33,
				"Secret Village of the Spellcasters": 100,
				"Self-Destruct Button": 100,
				"Sengenjin Wakes from a Millennium": 33,
				"Set Rotation": 33,
				"Shaddoll Schism": 10,
				"Shien's Dojo": 10,
				"Shien's Smoke Signal": 33,
				"Shooting Riser Dragon": 33,
				"Sillva, Warlord of Dark World": 100,
				"Sixth Sense": 65,
				"Skill Drain": 100,
				"Smoke Grenade of the Thief": 87,
				"Snake-Eye Ash": 5,
				"Snake-Eyes Poplar": 5,
				"Snatch Steal": 7,
				"Snoww, Unlight of Dark World": 33,
				"Solemn Judgment": 7,
				"Solemn Strike": 5,
				"Solemn Warning": 5,
				"Songs of the Dominators": 10,
				"Soul Charge": 50,
				"Soul Drain": 100,
				"Speedroid Terrortop": 3,
				"Spell Canceller": 20,
				"Spiritual Beast Tamer Lara": 10,
				"Spright Starter": 20,
				"Stand Up Centur-Ion!": 5,
				"Star Seraph Scepter": 5,
				"Star Seraph Sovereignty": 5,
				"Stardust Sifr Divine Dragon": 1,
				"Starliege Seyfert": 33,
				"Stray Purrely Street": 5,
				Substitoad: 60,
				"Subterror Guru": 5,
				"Summon Limit": 100,
				"Super Polymerization": 10,
				"Super Starslayer TY-PHON - Sky Crisis": 10,
				"Supreme King Dragon Starving Venom": 1,
				"Swap Frog": 33,
				"Sword Ryzeal": 20,
				"Swordsoul Emergence": 33,
				"Swordsoul Grandmaster - Chixiao": 33,
				"Swordsoul of Mo Ye": 3,
				"Swordsoul Strategist Longyuan": 5,
				"T.G. Hyper Librarian": 33,
				"Tearlaments Havnis": 50,
				"Tearlaments Kitkallos": 50,
				"Tearlaments Merrli": 50,
				"Tearlaments Reinoheart": 50,
				"Tearlaments Scheiren": 50,
				"Telekinetic Charging Cell": 100,
				"Tellarknight Ptolemaeus": 100,
				"Tempest, Dragon Ruler of Storms": 7,
				"Tenpai Dragon Chundra": 50,
				"Tenpai Dragon Genroku": 25,
				"Tenyi Spirit - Ashuna": 33,
				Terraforming: 33,
				"That Grass Looks Greener": 50,
				"The Black Goat Laughs": 10,
				"The Bystial Lubellion": 30,
				"The Forceful Sentry": 100,
				"The Gates of Dark World": 5,
				"The Hidden City": 33,
				"The Last Warrior from Another Planet": 100,
				"The Melody of Awakening Dragon": 33,
				"The Monarchs Erupt": 50,
				"The Phantom Knights' Rank-Up-Magic Launch": 1,
				"The Tyrant Neptune": 100,
				"The Unstoppable Exodia Incarnate": 20,
				"The Zombie Vampire": 50,
				"There Can Be Only One": 100,
				"Thunder Dragon Colossus": 67,
				"Thunder King Rai-Oh": 20,
				"Tidal, Dragon Ruler of Waterfalls": 7,
				"Toadally Awesome": 20,
				"Tour Guide From the Underworld": 3,
				"Transaction Rollback": 7,
				"Trap Dustshoot": 94,
				"Trap Holic": 7,
				"Traptrix Rafflesia": 10,
				"Triple Tactics Talent": 93,
				"Triple Tactics Thrust": 13,
				"Trishula, Dragon of the Ice Barrier": 3,
				"True King of All Calamities": 100,
				"Tyrant's Tirade": 100,
				"Ultimaya Tzolkin": 100,
				"Union Hangar": 33,
				"Vanity's Emptiness": 100,
				"Vanity's Fiend": 100,
				"Vanity's Ruler": 100,
				"Vanquish Soul Hollie Sue": 10,
				"Varudras, the Final Bringer of the End Times": 20,
				"Virtual World Kyubi - Shenshen": 20,
				"Virtual World Mai-Hime - Lulu": 3,
				"Wandering Gryphon Rider": 20,
				"WANTED: Seeker of Sinful Spoils": 33,
				"Water Enchantress of the Temple": 5,
				"Welcome Labrynth": 33,
				"Wind-Up Carrier Zenmaity": 33,
				"Wind-Up Hunter": 75,
				"Wishes for Eyes of Blue": 33,
				"Witch of the White Forest": 33,
				"Yaguramaru the Armor Ninja": 20,
				"Zaborg the Mega Monarch": 80,
				"Zoodiac Barrage": 33,
				"Zoodiac Broadbull": 66,
				"Zoodiac Drident": 20,
				"Zoodiac Ratpier": 50,
			}
		},
	},
}
