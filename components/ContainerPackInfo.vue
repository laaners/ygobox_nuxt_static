<template>
	<div class="container" :style="getBorder()">
		<div class="svelte-m1ek2q" aria-label="1">{{ getPoints() }}
		</div>
		<card-modal :src="src" :card-id="card.id" :rarity="'Common'" :limit-image="limitImage" :card-name="card.name" />
		<span>{{ card.name }}</span>
		<span><b>{{ rarity + " (" + percentage + "%)" }}</b></span>
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

.svelte-m1ek2q {
	/* color */
	border-color: red;
	background-color: black;
	color: yellow;
	/* font */
	font-family: Arial, sans-serif;
	font-weight: 700;
	font-size: 20px;

	border-width: 5px;
	border-style: solid;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	pointer-events: none;

	position: absolute;
	z-index: 9;
	width: 30%;
	height: 25%;
	left: 0%;
	top: 0%;
}
</style>
