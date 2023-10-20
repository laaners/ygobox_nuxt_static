<template>
	<div class="archetype" :style="getFocusBG()">
		<div class="flex-col">
			<a
				:href="`${encodeURI(
					'/archetypes/' + encodeURIComponent(archetype.archetype)
				)}`"
				target="_blank"
				rel="noopener noreferrer"
			>
				<h3 class="name">
					{{ archetype.archetype }} {{ `(${archetype.members})` }}
				</h3>
			</a>
			<grid-view
				:columns="archetype.attributes.length < 7 ? 6 : archetype.attributes.length"
				:col-gap="2"
				:row-gap="0"
				style="width: 100%; margin-bottom: var(--space-0)"
			>
				<img
					v-for="(attribute, index) of archetype.attributes"
					:key="`${archetype.archetype}-attribute-${index}`"
					:src="`${attribute}.png`"
					class="attribute"
				/>
			</grid-view>
			<img
				:src="
					isNaN(archetype.imgs.Poster)
						? archetype.imgs.Poster
						: getPicArtUrl(archetype.imgs.Poster)
				"
				alt="NOT FOUND"
				class="poster"
				loading="lazy"
			/>
			<div v-if="archetype.crest" class="crest">
				<img :src="archetype.crest" />
			</div>
			<grid-view
				:columns="6"
				:col-gap="2"
				:row-gap="0"
				style="width: 100%; margin-top: var(--space-0);"
			>
				<img
					v-for="type of archetype.types"
					:key="`${archetype.archetype}-type-${type}`"
					:src="`${type.toUpperCase()}.png`"
					class="type"
					@error="notDisplay"
				/>
			</grid-view>
			<p class="date-pack">
				{{ archetype.date.split(" ")[0] }}<br/>
				{{ archetype.date.split(" | ")[0].replace(archetype.date.split(" ")[0],"") }}
			</p>
			<grid-view v-if="archetype.focus.Pendulum > 0" :columns="2" :col-gap="40" :row-gap="0" class="scales">
				<img
					src="/leftscale.png"
					alt=""
					class="left-scale"
				/>
				<img
					src="/rightscale.png"
					alt=""
					class="right-scale"
				/>
			</grid-view>
		</div>
	</div>
	<!-- 
    | NAME  #ATTR #TYPE
    | |     | [SYMBOL]
    | | IMG | [EFF] [RITUAL]  [FUSION]  [SYNCHRO] [XYZ] [LINK]
    | |     |
    | WAIFU #MEMBERS  DATE
  -->
</template>

<script>
import GridView from "./GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "ArchetypeComponent",
	components: { GridView },
	mixins: [Utils],
	props: {
		archetype: {
			type: Object,
			required: true,
		},
	},
	methods: {
		getFocusBG() {
			/*
			Fusion: 0
			Link: 0
			No Extra: 1
			Pendulum: 0
			Ritual: 0
			Synchro: 0
			Xyz: 1 */
			const ritual = "#819ecc"
			const fusion = "#843194"
			const synchro = "#f4f4f4"
			const xyz = "#141414"
			const link = "rgb(0,0,0,0)"
			const noExtra = "#b25124"

			let tot = 0
			for (const key in this.archetype.focus) {
				if (key !== "Pendulum") tot += this.archetype.focus[key]
			}
			let percentage = 0
			let returnStyle = ""
			let lastStyle = noExtra
			if (this.archetype.focus["No Extra"] !== 0) {
				returnStyle += `${noExtra} 0%,`
				lastStyle = noExtra
				percentage += Math.ceil(
					(this.archetype.focus["No Extra"] / tot) * 100
				)
			}
			if (this.archetype.focus.Ritual !== 0) {
				returnStyle += `${lastStyle} ${
					percentage / 1.05
				}%, ${ritual} ${percentage}%,`
				lastStyle = ritual
				percentage += Math.ceil(
					(this.archetype.focus.Ritual / tot) * 100
				)
			}
			if (this.archetype.focus.Fusion !== 0) {
				returnStyle += `${lastStyle} ${
					percentage / 1.05
				}%, ${fusion} ${percentage}%,`
				lastStyle = fusion
				percentage += Math.ceil(
					(this.archetype.focus.Fusion / tot) * 100
				)
			}
			if (this.archetype.focus.Synchro !== 0) {
				returnStyle += `${lastStyle} ${
					percentage / 1.05
				}%, ${synchro} ${percentage}%,`
				lastStyle = synchro
				percentage += Math.ceil(
					(this.archetype.focus.Synchro / tot) * 100
				)
			}
			if (this.archetype.focus.Xyz !== 0) {
				returnStyle += `${lastStyle} ${
					percentage / 1.05
				}%, ${xyz} ${percentage}%,`
				lastStyle = xyz
				percentage += Math.ceil((this.archetype.focus.Xyz / tot) * 100)
			}
			if (this.archetype.focus.Link !== 0) {
				returnStyle += `${lastStyle} ${
					percentage / 1.05
				}%, ${link} ${percentage}%,`
				lastStyle = link
				percentage += Math.ceil((this.archetype.focus.Link / tot) * 100)
			}
			returnStyle += lastStyle + " 100%"

			return {
				backgroundImage: `linear-gradient(0deg, ${returnStyle}), url('/linkbg.png')`,
				backgroundSize: "cover",
				backgroundPosition: "center center",
				//	backgroundImage: `linear-gradient(0deg, ${noExtra} 0%, ${ritual} 10%, ${fusion} 50%, ${synchro} 75%, ${xyz} 80%, ${link} 100%)`
				//	backgroundImage: "linear-gradient(0deg, var(--color-light), rgba(214,214,177,0)), url('https://storage.googleapis.com/ygoprodeck.com/pics/38229962.jpg')"
			}
		},
		notDisplay(e) {
			e.target.style.display = "none"
		},
		goToDetails() {
			this.$router.push(`/details/${this.archetype.archetype}`)
		},
	},
}
</script>

<style scoped>
.archetype {
	position: relative;
	border: 2px solid var(--color-darker);
	border-radius: var(--border-radius);
	background-color: #b25124;
}

.archetype > * {
	margin: var(--space-0);
}

.scales {
	width: 100%;
	justify-items: center;
}

.scales img {
	height: 2vmax;
}

.name,
.date-pack {
	background: var(--color-darker);
	border-radius: var(--border-radius);
	padding: var(--space-0);
	color: var(--color-light);
	text-align: center;
}

.name {
	font-size: 95%;
}

.date-pack {
	font-size: 75%;
}

.attribute,
.type {
	width: 100% !important;
}

.poster {
	width: 100%;
	border-radius: var(--border-radius);
}

.crest {
	background-color: white;
	height: 3vmax;
	margin: var(--space-0);
	background-position: center center;
	border-radius: var(--border-radius);
}

.crest img {
	height: 100%;
	border-radius: var(--border-radius);
}
</style>
