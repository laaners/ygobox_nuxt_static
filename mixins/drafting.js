export default {
	methods: {
        clientDrafting(set_name, allsets, allcardsToT) {
            const set = allsets.find(_=>_.set_name.toLowerCase() === set_name)
            if(set === undefined)
                return {
                    pack_img: "Pack not found, name error",
                    cards: [],
                    draftN: 0,
                    packN: 0,
                    setNameCorrect: "Not found"
                }
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
                return {
                    pack_img: "Pack not found, name error",
                    cards: [],
                    draftN: 0,
                    packN: 0,
                    setNameCorrect: "Not found"
                }
            const packN = cards.length
            const draftN =
                Math.ceil(cards.length * 1.5) > 120
                    ? 120
                    : Math.ceil(cards.length * 1.5)
            const differentRarities = this.rarityAssignAndOccurrence(
                cards,
                set_name,
                draftN
            )
            this.computePrecedence(differentRarities, draftN)
    
            cards = this.listCardsPrecedence(cards, differentRarities)
            const totNumber = cards.length
            const filtered = [];
            for(let i = 0; i < draftN; i++) {
                filtered.push(cards[Math.floor(Math.random()*cards.length)]);
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
            const setNameCorrect = set.tcg_date+" "+set.set_name
            return {
                pack_img: `/sets/${set.set_code}.jpg`,
                cards,
                draftN,
                packN,
                setNameCorrect
            }
        },
        packImage(set_name, allsets) {
            return `/sets/${
                allsets.find(
                    (_) => _.set_name.toLowerCase() === set_name.toLowerCase()
                ).set_code
            }.jpg`
        },
        rarityAssignAndOccurrence(cards, set_name) {
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
        },
        computePrecedence(differentRarities, draftN) {
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
        },
        listCardsPrecedence(filteredCopy, differentRarities) {
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
    }
}