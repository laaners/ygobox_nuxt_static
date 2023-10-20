export default ({ $axios }, inject) => {
	inject("getAllCards", async () => {
		const [seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8] =
			await Promise.all([
				$axios.$get("api/allcards?n=0"),
				$axios.$get("api/allcards?n=1"),
				$axios.$get("api/allcards?n=2"),
				$axios.$get("api/allcards?n=3"),
				$axios.$get("api/allcards?n=4"),
				$axios.$get("api/allcards?n=5"),
				$axios.$get("api/allcards?n=6"),
				$axios.$get("api/allcards?n=7"),
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
		allcards.sort((a, b) => a.id - b.id)
		return allcards
	})
}
