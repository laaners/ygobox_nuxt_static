<template>
	<div style="position: relative">
		<img
			v-if="limitImage !== ''"
			:style="{
				position: 'absolute',
				zIndex: 9,
				width: '30%',
				left: '0%',
				top: '0%',
			}"
			:src="limitImage"
		/>
		<!--
		-->
		<div class="image-loader flex-col">
			<card-rarity
				class="small-image"
				:src="src"
				:rarity="rarity"
				:card-id="cardId"
				@click.native="toggleFullImage()"
			/>
			<transition name="fade">
				<div
					v-show="fullImage"
					class="modal flex-col"
					oncontextmenu="return false;"
					@mousedown="rightClickClose"
				>
					<button
						class="modal-close"
						aria-label="close-modal"
						@click="toggleFullImage()"
					>
						<x-icon />
						<p>O TASTO DESTRO<br />PER CHIUDERE!</p>
					</button>
					<h1 ref="name" @click="copyName()"></h1>
					<div class="modal-view flex-row">
						<div
							class="full-image flex-col"
							style="justify-content: flex-start"
						>
							<a :href="getPicUrl(cardId)" target="_blank">
								<img
									loading="lazy"
									:src="getPicUrl(cardId)"
									:alt="cardId"
									style="
										display: block;
										margin-left: auto;
										margin-right: auto;
									"
								/>
							</a>
							<grid-view
								:columns="2"
								:col-gap="5"
								:row-gap="0"
								style="width: 70%"
							>
								<button-secondary
									:title="'CARD ART'"
									@click.native="
										$el.querySelector(
											'.full-image img'
										).src = getPicUrl(cardId)
										$el.querySelector(
											'.full-image a'
										).href = getPicUrl(cardId)
									"
								/>
								<button-secondary
									:title="'FULL ART'"
									@click.native="
										$el.querySelector(
											'.full-image img'
										).src = getPicArtUrl(cardId)
										$el.querySelector(
											'.full-image a'
										).href = getPicArtUrl(cardId)
									"
								/>
							</grid-view>
						</div>
						<div
							v-if="loading"
							class="loader"
							style="align-self: flex-start; margin-top: 10vw"
						></div>
						<div v-if="!loading" class="effects">
							<p>{{ formatEneff(eneff) }}</p>
							<hr />
							<p>{{ formatCheff(cheff) }}</p>
							<hr />
							<p>{{ formatIteff(iteff) }}</p>
							<hr />
							<h3 style="text-align: center">
								Lo puoi trovare nei seguenti pacchetti:
							</h3>
							<grid-view :columns="4" :row-gap="0" :col-gap="0">
								<container-pack-scroll
									v-for="set of cardSets"
									:key="set.set_code"
									:set="set"
									:rarity-percentage="set.percentage + '%'"
								/>
							</grid-view>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import CardRarity from "./CardRarity.vue"
import XIcon from "./icons/XIcon.vue"
import GridView from "./GridView.vue"
import ButtonSecondary from "./ButtonSecondary.vue"
import Utils from "~/mixins/utils"
export default {
	name: "CardModal",
	components: { XIcon, CardRarity, GridView, ButtonSecondary },
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
		limitImage: {
			type: String,
			required: false,
			default: "",
		},
	},
	data: () => ({
		fullImage: false,
		loading: false,
		eneff: "",
		cheff: "",
		iteff: "",
		cardSets: [],
		name: "",
	}),
	watch: {
		fullImage(newV, oldV) {
			if (
				document.body.querySelector(".canvas-content") === undefined ||
				document.body.querySelector(".canvas-content") === null
			)
				return
			if (newV) {
				const parentZoom =
					+document.body.querySelector(".canvas-content").style.zoom
				this.$el.querySelector(".modal").style.zoom = 1 / +parentZoom
			}
		},
	},
	methods: {
		rightClickClose(e) {
			if (e?.which === 3) {
				this.fullImage = false
			}
		},
		async copyName() {
			await this.$copyText(this.name)
			/*
			await this.$copyText(`
			{
				"id": ${this.cardId},
				"name": "${this.name}",
				"date": "${this.cardSets[0].tcg_date} ${this.cardSets[0].set_name}",
				"banlists": [
					{
						"banlist": "2023-5",
						"status": 2
					}
				]
			},
			`)
			*/
			// await this.$copyText(`[${this.name}](https://yugipedia.com/wiki/${this.name.replaceAll(" ","_")})`)
		},
		async toggleFullImage() {
			this.fullImage = !this.fullImage
			if (this.fullImage) {
				this.loading = true
				/* Multiple
				const promises = [
					this.$axios.$get(`/api/card/${this.cardId}`),
					this.$axios.$get(`/api/cheff/${this.cardId}`),
					this.$axios.$get(`/api/iteff/${this.cardId}`),
				]
				const [enCard, chCard, itCard] = await Promise.all(promises)
				*/
				let enCard = await this.$axios.$get(
					`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${this.cardId}`
				)
				enCard = enCard.data[0]

				const [cheff, iteff] = await Promise.all([
					this.$axios.$get(
						`https://ygobox-nuxt-db.onrender.com/cheff/${this.cardId}`
					),
					this.$axios.$get(
						`https://ygobox-nuxt-db.onrender.com/iteff/${this.cardId}`
					),
				])

				enCard.cheff = cheff
				enCard.iteff = iteff

				const chCard = enCard.cheff
				const itCard = enCard.iteff
				this.name = enCard.name
				this.cheff = chCard.desc
				this.iteff = itCard.desc
				this.eneff = enCard.desc
				if (enCard.pend_desc !== undefined)
					this.eneff =
						"[ Pendulum Effect ] " +
						enCard.pend_desc +
						"\n" +
						this.eneff.replace("[ Pendulum Effect ] \n", "\n")
				this.$refs.name.innerHTML =
					enCard.name +
					" | " +
					(chCard.name ? chCard.name : "Not found") +
					" | " +
					(itCard.name ? itCard.name : "Not found")

				if (enCard.card_sets === undefined) {
					this.cardSets = []
					this.loading = false
					return
				}

				this.cardSets = [enCard.card_sets[0]]
				enCard.card_sets.forEach((_) => {
					if (
						!this.cardSets
							.map((x) => x.set_code.split("-")[0])
							.includes(_.set_code.split("-")[0])
					)
						this.cardSets.push(_)
				})
				this.cardSets.forEach(
					(_) => (_.set_code = _.set_code.split("-")[0])
				)
				this.cardSets.sort((a, b) => (a.tcg_date > b.tcg_date ? 1 : -1))
				this.loading = false
			}
		},
		formatIteff(desc) {
			if (desc === undefined) return ""
			return desc.replace("Effetto pendolo", "\n\nEffetto pendolo")
		},
		formatCheff(desc) {
			if (desc === undefined) return ""
			const tmp = desc
				.replaceAll("●", "\n●")
				.replaceAll("①：", "\n①：")
				.replaceAll("②：", "\n②：")
				.replaceAll("③：", "\n③：")
				.replaceAll("④：", "\n④：")
				.replaceAll("⑤：", "\n⑤：")
				.replaceAll("⑥：", "\n⑥：")
				.replace("【怪兽效果】", "\n\n【怪兽效果】")
				.replace("【怪兽描述】", "\n\n【怪兽描述】")
			if (tmp[0] === "\n") return tmp.substring(1)
			return tmp
		},
		formatEneff(desc) {
			if (desc === undefined) return ""
			return desc
		},
	},
}
</script>

<style scoped>
.image-loader {
	width: 100%;
}

.small-image {
	cursor: pointer;
	width: 100%;
	padding: 0vw;
	transition: all 0.2s ease;
	transform: scale(1);
}

.small-image:hover {
	filter: brightness(50%);
}

.modal {
	background: #222222;
	color: white;

	height: 100%;
	width: 100%;
	left: 0;
	right: 0;
	top: 0;
	position: fixed;
	overflow: auto;
	z-index: 9998;
	transform: scale(1);
}

.modal-close {
	position: absolute;
	right: var(--space-0);
	top: var(--space-0);
	z-index: 9999;

	background: none;
	border: none;
	cursor: pointer;
	color: rgba(255, 255, 255, 0.33);
	font-size: 3.5vw;
}

.modal-close p {
	margin: 0;
}

.modal-close:hover {
	color: white;
}

.modal-view {
	/*margin: auto;*/

	position: relative;
	height: 90vmin;
}

.modal-view div {
	margin: 1vmin;
}

.full-image {
	width: 28vw;
	height: 90%;
}

.full-image img {
	width: 90%;
}

h1 {
	margin-bottom: 0;
	margin-top: var(--space-0);
	text-align: center;
	width: 85%;
}

.effects {
	width: 45vw;
	height: 90%;
	overflow-y: auto;
	overflow-x: hidden;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}

.effects > * {
	width: 95%;
}

.effects p {
	white-space: pre-line;
}
</style>
