<template>
	<div class="container flex-row">
		<img loading="lazy" :src="src" />
		<!--
		<img
			v-if="!img_error"
			:src="`https://images.ygoprodeck.com/images/cards/${
				cardId + 1
			}.jpg`"
			@error="img_error = true"
		/>
		<img
			v-if="img_error"
			:src="`https://images.ygoprodeck.com/images/cards/${cardId}.jpg`"
		/>
		-->
		<div :class="getClass()"></div>
	</div>
</template>

<script>
import Utils from "~/mixins/utils"
export default {
	name: "CardRarity",
	mixins: [Utils],
	props: {
		src: {
			type: String,
			required: true,
		},
		rarity: {
			type: String,
			required: true,
		},
		cardId: {
			type: Number,
			required: true,
		},
	},
	data: () => ({
		rarity_size: "",
		img_error: false,
	}),
	async fetch() {
		if (
			this.getRarityCode(this.rarity) === undefined ||
			this.getRarityCode(this.rarity) === null
		)
			return
		const card = await this.$axios.$get(`api/card/${this.cardId}`)
		this.rarity_size = card.type.toLowerCase().includes("pendulum")
			? "pack-info-rarity-pend"
			: "pack-info-rarity"
		this.rarity_size = card.type.toLowerCase().includes("link")
			? "pack-info-rarity-link"
			: this.rarity_size
	},
	methods: {
		getClass() {
			if (
				this.getRarityCode(this.rarity) === undefined ||
				this.getRarityCode(this.rarity) === null
			)
				return this.rarity_size + ""
			return this.rarity_size + " " + this.getRarityCode(this.rarity)
		},
	},
}
</script>

<style scoped>
.container {
	position: relative;
}

img {
	width: 100%;
}

.pack-info-rarity {
	position: absolute;
	width: 77%;
	height: 53%;
	top: 17.9%;
}

.pack-info-rarity-link {
	position: absolute;
	width: 77%;
	height: 53%;
	top: 17.9%;
	border-radius: 5%;
}

.pack-info-rarity-pend {
	position: absolute;
	width: 86.9%;
	height: 44.3%;
	top: 17.9%;
}
</style>
