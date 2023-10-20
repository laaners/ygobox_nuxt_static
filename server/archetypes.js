import fs from "fs"
//	import archetypesPics from "./data/archetypes.json"
import { exceptionArc } from "./exceptionArc"

function groupBy(obj, key, listName) {
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
}

function searchDate(members_par, archetype, allsets) {
	let ris = "NONE"
	let members = members_par
		.filter(
			(_) =>
				!_.desc.includes(
					`This card is always treated as a "${archetype}"`
				) &&
				!_.desc.includes(
					`This card is always treated as an "${archetype}"`
				)
		)
		.filter(
			(_) =>
				_.desc.includes(`"${archetype}" card`) ||
				_.desc.includes(`"${archetype}" monster`) ||
				_.desc.includes(`"${archetype}" Spell`) ||
				_.desc.includes(`"${archetype}" Trap`)
		)
	if (members.length === 0) {
		members = members_par.filter((_) => _.name !== archetype)
	}
	for (let i = 0; i < members.length; i++) {
		if (members[i].card_sets === undefined) {
			continue
		}
		for (let j = 0; j < members[i].card_sets.length; j++) {
			const target_set = members[i].card_sets[j].set_name
			const cmp = allsets.filter((x) => x.set_name === target_set)[0]
			if (ris === "") ris = cmp.tcg_date + " " + cmp.set_name
			else if (cmp !== undefined && cmp.tcg_date < ris)
				ris =
					cmp.tcg_date + " " + cmp.set_name + " | " + members[i].name
		}
	}
	return ris
}

function arcAttr(arc) {
	const ris = []
	arc.forEach((monster) => {
		if (monster.attribute === undefined) return
		if (!ris.includes(monster.attribute)) ris.push(monster?.attribute)
	})
	//	if (ris.length === 0) {
		if (arc.filter((_) => _.type.includes("Spell")).length > 0)
			ris.push("SPELL")
		if (arc.filter((_) => _.type.includes("Trap")).length > 0)
			ris.push("TRAP")
	//	}
	return ris
}

function arcType(arc) {
	const ris = []
	arc.filter((_) => _.type.includes("Monster")).forEach((monster) => {
		if (monster.race === undefined) return
		if (!ris.includes(monster.race)) ris.push(monster.race)
	})
	return ris
}

function arcFocusAndWaifu(arc, femaleCards) {
	/*
    Ritual
    Fusion
    Synchro
    Xyz
    Pendulum
    Link
    */
	const focus = [
		"No Extra",
		"Ritual",
		"Fusion",
		"Synchro",
		"Xyz",
		"Pendulum",
		"Link",
	]
	const ris = {}
	const monsters = arc.filter((_) => _.type.includes("Monster"))
	let waifu = 0
	focus.forEach((key) => (ris[key] = 0))
	monsters.forEach((monster) => {
		if(femaleCards[monster.name] !== undefined) waifu += 1
		focus.forEach((key) => {
			if (monster.type.toUpperCase().includes(key.toUpperCase()))
				ris[key] += 1
		})
		if (
			!monster.type.includes("Ritual") &&
			!monster.type.includes("Fusion") &&
			!monster.type.includes("Synchro") &&
			!monster.type.includes("XYZ") &&
			/* !monster.type.includes("Pendulum") && */
			!monster.type.includes("Link")
		)
			ris["No Extra"] += 1
	})

	return {
		focus: ris,
		waifu: waifu > monsters.length/2,
	}
}

export function retrieveArchetypes(allcards, allsets, femaleCards) {
	const grouped = groupBy(
		allcards.filter((_) => _.archetype !== undefined),
		"archetype",
		"members"
	)

	grouped.forEach((arc) => {
		allcards
			.filter(
				(_) =>
					_.archetype !== arc.archetype &&
					(_.desc.includes('"' + arc.archetype + '"') ||
						_.name.includes(arc.archetype)) &&
					!_.desc.includes(
						`This card is not treated as a "${arc.archetype}"`
					) &&
					!_.desc.includes(
						`This card is not treated as an "${arc.archetype}"`
					)
			)
			.forEach((member) => {
				if (!arc.members.includes(member)) arc.members.push(member)
			})
		arc.true_name = arc.archetype
	})

	grouped.forEach((arc) => {
		exceptionArc(arc, allcards, grouped)
		arc.members = arc.members.filter(_=>!(_.type+_.race).includes("Token") && !(_.type+_.race).includes("Skill"))
		arc.date = searchDate(arc.members, arc.archetype, allsets)
	})

	//	Poster based on changed name
	grouped.forEach((arc) => {
		const { focus, waifu } = arcFocusAndWaifu(arc.members, femaleCards)
		arc.focus = focus
		arc.waifu = waifu

		const archetypesPics = JSON.parse(fs.readFileSync("server/data/archetypes.json").toString())

		const arcPic = archetypesPics.find((x) => x.arc === arc.archetype)
		if (arcPic === undefined) arc.imgs = { Poster: undefined }
		else {
			if (arcPic.imgs === undefined) arc.imgs = { Poster: arcPic.url }
			else arc.imgs = arcPic.imgs
			if (arcPic.crest !== undefined) arc.crest = arcPic.crest
			arc.waifu = arc.waifu || arcPic.waifu !== undefined 
		}

		arc.attributes = arcAttr(arc.members)
		arc.types = arcType(arc.members)
	})

	grouped.sort((a, b) => (a.date > b.date ? -1 : 1))

	return grouped
}
