<template>
	<div class="container" :style="getBorder()">
		<card-modal
			:src="src"
			:card-id="card.id"
			:rarity="'Common'"
			:limit-image="limitImage"
		/>
		<span>{{ card.name }}</span>
		<span
			><b>{{ rarity + " (" + percentage + "%)" }}</b></span
		>
	</div>
</template>

<script>
import CardModal from "./CardModal.vue"
export default {
	name: "ContainerPackInfo",
	components: { CardModal },
	props: {
		src: {
			type: String,
			required: true,
		},
		card: {
			type: Object,
			required: true,
		},
		rarity: {
			type: String,
			required: true,
		},
		percentage: {
			type: String,
			required: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		border: {
			type: String,
			required: false,
		},
		limitImage: {
			type: String,
			required: false,
			default: "",
		},
	},
	methods: {
		getBorder() {
			if (this.border)
				return {
					border: this.border,
				}
		},
	},
}
</script>

<style scoped>
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

span {
	text-align: center;
}
</style>
