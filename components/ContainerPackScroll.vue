<template>
	<div v-show="notError" class="flex-col container">
		<img
			loading="lazy"
			:src="packImage()"
			@error="notError = false"
			@click="handleRedirect()"
		/>
		<span v-if="notError" class="test-set-name">{{ set.set_name }}</span>
		<span
			><b> {{ set.tcg_date }}</b></span
		>
		<h4>{{ rarityPercentage }}</h4>
		<span v-if="copied" class="pop-up"
			>Ho copiato il nome del pacchetto!</span
		>
	</div>
</template>

<script>
export default {
	name: "ContainerPackInfo",
	props: {
		set: {
			type: Object,
			required: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		rarityPercentage: {
			type: String,
			required: false,
		},
	},
	data: () => ({
		notError: true,
		copied: false,
	}),
	methods: {
		packImage() {
			//	if(this.set.tcg_date < "2016-09-15")
			if (this.set.set_name?.includes("OCG")) {
				return this.set.ocg_pic_url
			}
			if (
				this.set.tcg_date < "2022-02-24" ||
				this.set.set_code === "GFP2"
			) {
				return `/sets/${this.set.set_code}.jpg`
				// return `https://raw.githubusercontent.com/laaners/ygobox_nuxt/master/static/sets/${this.set.set_code}.jpg`; // `/sets/${this.set.set_code}.jpg`
			}
			return `https://ygoprodeck.com/pics_sets/${this.set.set_code}.jpg`
		},
		async handleRedirect() {
			await this.$copyText(this.set.set_name)
			this.copied = true
			setTimeout(() => (this.copied = false), 2000)
			this.$emit("update:clickedSet", this.set.set_name)
		},
	},
}
</script>

<style scoped>
.container {
	position: relative;
	cursor: pointer;
}

img {
	width: 100%;
}

span {
	text-align: center;
}

h4 {
	margin: 0;
	font-weight: bolder;
	color: yellow;
}

.pop-up {
	position: absolute;
	background: #222222;
	color: white;

	border-radius: var(--border-radius);
	padding: var(--space-0);

	font-weight: bolder;
	animation: fade-in-animation 2s linear forwards;
	animation-direction: reverse;
}
</style>
