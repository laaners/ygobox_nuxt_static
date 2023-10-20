export function exceptionArc(arc, allcards, grouped) {
	function changeName(name) {
		arc.archetype = name
	}

	function excludeMembers(notMembers) {
		arc.members = arc.members.filter((_) => !notMembers.includes(_.name))
	}

	function includeMembers(yesMembers) {
		allcards
			.filter((_) => yesMembers.includes(_.name))
			.forEach((member) => {
				if (!arc.members.includes(member)) arc.members.push(member)
			})
	}

	function descIncludes(word) {
		allcards
			.filter((_) => _.desc.includes(word))
			.forEach((member) => {
				if (!arc.members.includes(member)) arc.members.push(member)
			})
	}

	function nameIncludes(word) {
		allcards
			.filter((_) => _.name.includes(word))
			.forEach((member) => {
				if (!arc.members.includes(member)) arc.members.push(member)
			})
	}

	function mergeWith(toaddArc) {
		//	Date of arc and NOT of toAddArc!!!
		const toaddObj = grouped.find((_) => _.archetype === toaddArc)
		toaddObj.members.forEach((member) => {
			if (!arc.members.includes(member)) arc.members.push(member)
		})
	}

	switch (arc.archetype) {
		case "Shark": {
			excludeMembers(["Great White"])
			break
		}
		case "Frog": {
			excludeMembers(["Slime Toad"])
			break
		}
		case "Herald": {
			const notMembers = [
				"Zeradias, Herald of Heaven",
				"Advanced Heraldry Art",
				"Augmented Heraldry",
				"Charged-Up Heraldry",
				"Heraldic Beast Aberconway",
				"Heraldic Beast Amphisbaena",
				"Heraldic Beast Basilisk",
				"Heraldic Beast Berners Falcon",
				"Heraldic Beast Eale",
				"Heraldic Beast Leo",
				"Heraldic Beast Twin-Headed Eagle",
				"Heraldic Beast Unicorn",
				"Heraldry Change",
				"Heraldry Reborn",
				"Heraldry Record",
				"Number 18: Heraldry Patriarch",
				"Number 69: Heraldry Crest",
				"Number 8: Heraldic King Genom-Heritage",
				"Number C69: Heraldry Crest of Horror",
			]
			excludeMembers(notMembers)
			break
		}
		case "Silent Magician": {
			descIncludes("Silent Magician")
			break
		}
		case "Doodle Beast": {
			changeName("Doodle Beast & Doodlebook")
			mergeWith("Doodlebook")
			break
		}
		case "Neo-Spacian": {
			changeName("Neos & Neo-Spacian")
			nameIncludes("Neos")
			descIncludes("Neos")
			mergeWith("Neo Space")
			mergeWith("Neos")
			break
		}
		case "Vernalizer Fairy": {
			changeName("Vernusylph")
			break
		}
		case "Earthbound": {
			changeName("Earthbound Immortal")
			const notMembers = ["Earthbound Spirit", "Call of the Earthbound"]
			excludeMembers(notMembers)
			break
		}
		case "Assault Mode": {
			changeName("/Assault Mode")
			descIncludes("Assault Mode Activate")
			break
		}
		case "Advanced Crystal Beast": {
			includeMembers(["Advanced Dark"])
			break
		}
		case "Evil HERO": {
			nameIncludes("Dark Fusion")
			descIncludes("Dark Fusion")
			break
		}
		case "Destruction Sword": {
			changeName("Buster Blader & Destruction Sword")
			nameIncludes("Buster Blader")
			descIncludes("Buster Blader")
			break
		}
		case "Demise": {
			changeName("Ruin & Demise")
			const notMembers = [
				"Card of Demise",
				"Demise of the Land",
				"Jowls of Dark Demise",
				"Malice Doll of Demise",
				"The Earl of Demise",
			]
			excludeMembers(notMembers)
			break
		}
		case "Egyptian God": {
			descIncludes("Slifer the Sky Dragon")
			descIncludes("Obelisk the Tormentor")
			descIncludes("The Winged Dragon of Ra")
			break
		}
		case "Firewall": {
			excludeMembers(["Firewall"])
			break
		}
		case "Fleur": {
			includeMembers(["Centaur Mina"])
			descIncludes("Fleur Synchron")
			excludeMembers(["Dogmatika Fleurdelis, the Knighted"])
			break
		}
		case "Starry Knight": {
			includeMembers(["Starry Night, Starry Dragon"])
			break
		}
		case "Blue-Eyes": {
			includeMembers(["Azure-Eyes Silver Dragon"])
			break
		}
		case "Digital Bug": {
			includeMembers(["Bug Emergency", "Bug Matrix", "Bug Signal"])
			break
		}
		case "Nemesys": {
			changeName("Nemeses")
			descIncludes("nemeses")
			break
		}
		case "Sacred Beast": {
			descIncludes("Armityle the Chaos Phantasm")
			descIncludes("Hamon, Lord of Striking Thunder")
			descIncludes("Uria, Lord of Searing Flames")
			descIncludes("Raviel, Lord of Phantasms")
			break
		}
		case "Train": {
			const notMembers = [
				"Amaze Attraction Thrill Train",
				"Amazoness Trainee",
				"Beautiful Beast Trainer",
				"D.D. Trainer",
				"Elemental Training",
				"Superheavy Samurai Steam Train King",
				"Training Fur Hire, Fur All Your Training Needs",
				"Yosen Training Grounds",
			]
			excludeMembers(notMembers)
			break
		}
		case "Fossil": {
			const notMembers = [
				"Fossil Dig",
				"Fossil Excavation",
				"Fossil Tusker",
			]
			excludeMembers(notMembers)
			descIncludes("Fossil Fusion")
			break
		}
		case "Scrap": {
			excludeMembers(["Raviel, Lord of Phantasms - Shimmering Scraper"])
			break
		}
		case "Worm": {
			arc.members = arc.members.filter((_) => {
				return (
					(_.type.toUpperCase().includes("MONSTER") &&
						_.race === "Reptile") ||
					!_.type.toUpperCase().includes("MONSTER")
				)
			})
			includeMembers(["W Nebula Meteorite"])
			break
		}
		case "Djinn": {
			arc.members = arc.members.filter((_) => {
				return _.type.toUpperCase().includes("XYZ")
			})
			break
		}
		case "Magician": {
			changeName("Pendulum Magician")
			arc.members = arc.members.filter((_) => {
				return (
					(_.type.includes("Monster") &&
						(_.type.toUpperCase().includes("PENDULUM") ||
							_.desc.includes("Pendulum"))) ||
					(!_.type.includes("Monster") && _.desc.includes("Pendulum"))
				)
			})
			break
		}
		case "Majestic": {
			const notMembers = [
				"Majestic Mech - Goryu",
				"Majestic Mech - Ohka",
				"Majestic Mech - Senku",
				"Amaze Attraction Majestic Merry-Go-Round",
			]
			excludeMembers(notMembers)
			includeMembers(["Arrive in Light"])
			break
		}
		case "Masked HERO": {
			descIncludes('"Change" Quick-Play')
			break
		}
		case "Evoltile": {
			mergeWith("Evolsaur")
			mergeWith("Evolzar")
			changeName("Evol")
			break
		}
		case "Volcanic": {
			mergeWith("Blaze Accelerator")
			changeName("Volcanic & Blaze Accelerator")
			break
		}
		case "Nordic": {
			mergeWith("Aesir")
			changeName("Nordic & Aesir")
			break
		}
		case "HERO": {
			mergeWith("Elemental HERO")
			mergeWith("Destiny HERO")
			mergeWith("Masked HERO")
			descIncludes('"Change" Quick-Play')
			mergeWith("Vision HERO")
			mergeWith("Evil HERO")
			nameIncludes("Dark Fusion")
			descIncludes("Dark Fusion")
			break
		}
		case "The Agent": {
			mergeWith("Hyperion")
			changeName("The Agent & Hyperion")
			break
		}
		case "Ninja": {
			mergeWith("Ninjitsu Art")
			changeName("Ninja & Ninjitsu Art")
			break
		}
		case "Butterspy": {
			const yesMembers = [
				"Photon Papilloperative",
				"Night Papilloperative",
			]
			includeMembers(yesMembers)
			break
		}
		case "Fire Fist": {
			mergeWith("Fire Formation")
			changeName("Fire Fist & Fire Formation")
			break
		}
		case "Lswarm": {
			mergeWith("Infestation")
			changeName("Evilswarm & Infestation")
			break
		}
		case "Steelswarm": {
			mergeWith("Infestation")
			changeName("Steelswarm & Infestation")
			break
		}
		case "Onomato": {
			changeName("Onomat")
			descIncludes("Onomat")
			mergeWith("Gagaga")
			mergeWith("Dododo")
			nameIncludes("Zubaba")
			descIncludes("Zubaba")
			mergeWith("Gogogo")
			break
		}
		case "Tellarknight": {
			mergeWith("Stellarknight")
			break
		}
		case "True Draco": {
			changeName("True Draco & True King")
			nameIncludes("True King")
			descIncludes("True King")
			break
		}
		case "Fluffal": {
			mergeWith("Frightfur")
			mergeWith("Edge Imp")
			changeName("Fluffal & Edge Imp & Frightfur")
			break
		}
		case "Sunavalon": {
			mergeWith("Sunvine")
			mergeWith("Sunseed")
			changeName("Sunavalon & Sunvine & Sunseed")
			break
		}
		case "Heraldic": {
			mergeWith("Heraldry")
			changeName("Heraldic Beast & Heraldry")
			break
		}
		case "D/D": {
			mergeWith("Dark Contract")
			changeName("D/D & Dark Contract")
			break
		}
		case "Abyss Actor": {
			mergeWith("Abyss Script")
			changeName("Abyss Actor & Abyss Script")
			break
		}
		case "Monarch": {
			mergeWith("Vassal")
			excludeMembers(["Gravekeeper's Vassal"])
			changeName("Monarch & Vassal")
			break
		}
		case "Seven Emperors": {
			includeMembers([
				"Rank-Up-Magic - The Seventh One",
				"Barian's Chaos Draw",
			])
			break
		}
		case "Bridge": {
			excludeMembers(["Evolutionary Bridge", "S-Force Bridgehead"])
			descIncludes("Rainbow Bridge")
			changeName("Rainbow Bridge")
			break
		}
		case "Charmer": {
			mergeWith("Possessed")
			changeName("Charmer & Possessed")
			const notMembers = [
				"Possessed Dark Soul",
				"Keldo the Possessed Statue",
			]
			excludeMembers(notMembers)
			break
		}
		/*
		case "Zexal": {
			mergeWith("ZEXAL")
			break
		}
		*/
		case "Chaos Phantom": {
			changeName("Phantasm")
			break
		}
		case "@Ignister": {
			mergeWith("A.I.")
			changeName("@Ignister & A.I.")
			break
		}
		case "Eldlich": {
			mergeWith("Golden Land")
			changeName("Eldlich & Eldlixir & Golden Land")
			break
		}
		case "Infernoble Knight": {
			mergeWith("Roland")
			changeName("Infernoble Knight & Roland")
			break
		}
		case "Noble Knight": {
			mergeWith("Infernoble Knight")
			mergeWith("Roland")
			changeName("Noble Knight & Noble Arms & Artorigus & Roland")
			break
		}
		case "Evil★Twin": {
			mergeWith("Live☆Twin")
			changeName("Evil★Twin & Live☆Twin")
			break
		}
		case "Gishki": {
			mergeWith("Aquamirror")
			changeName("Gishki & Aquamirror")
			break
		}
		case "Amazement": {
			mergeWith("Attraction")
			changeName("Amazement & Attraction")
			break
		}
		case "Infernoid": {
			mergeWith("Void")
			changeName("Infernoid & Void")
			const notMembers = ["Unformed Void"]
			excludeMembers(notMembers)
			break
		}
		case "Infernity": {
			mergeWith("Void")
			changeName("Infernity & Void")
			const notMembers = ["Unformed Void"]
			excludeMembers(notMembers)
			break
		}
		case "Seven Emperors": {
			changeName("Seventh")
			break
		}
		default:
	}
}
