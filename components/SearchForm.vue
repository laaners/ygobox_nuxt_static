<template>
	<form
		name="card-form"
		method="POST"
		class="text-center flex-col form"
		@submit.prevent="onSubmit()"
	>
		<!--
                            Inverti ricerca&ensp;<input name="inverted" type="checkbox">
                            <br>
                            -->
		<!--
		-->
		<div class="flex-row">
			<p>Categoria:&ensp;</p>
			<select v-model="form.type1" name="type-1">
				<option label="Qualunque" selected="selected"></option>
				<option label="Mostro">Monster</option>
				<option label="Magia">Spell</option>
				<option label="Trappola">Trap</option>
			</select>
		</div>
		<div class="flex-row">
			<div class="flex-col">
				<p>Mostro:</p>
				<select v-model="form.type2" name="type-2">
					<option label="Qualunque" selected="selected"></option>
					<option label="Normale">Normal</option>
					<option label="Effetto">Effect</option>
					<option label="Scoperta">Flip</option>
					<option label="Union">Union</option>
					<option label="Gemelli">Gemini</option>
					<option label="Tuner">Tuner</option>
					<option label="Spirito">Spirit</option>
					<option label="Rituale">Ritual</option>
					<option label="Fusione">Fusion</option>
					<option label="Synchro">Synchro</option>
					<option label="Synchro Tuner">Synchro Tuner</option>
					<option label="Xyz">XYZ</option>
					<option label="Pendulum">Pendulum</option>
					<option label="Link">Link</option>
				</select>
			</div>
			&ensp;
			<div class="flex-col">
				<p>Magia/Trappola:</p>
				<select v-model="form.raceSpellTrap" name="race-spell-trap">
					<option label="Qualunque" selected="selected"></option>
					<option label="Normale">Normal</option>
					<option label="Rapida">Quick-Play</option>
					<option label="Continua">Continuous</option>
					<option label="Equipaggiamento">Equip</option>
					<option label="Rituale">Ritual</option>
					<option label="Terreno">Field</option>
					<option label="Contro-Trappola">Counter</option>
				</select>
			</div>
		</div>
		<div v-if="form.type2 === 'Pendulum' || !hidingMode" class="flex-col">
			<div class="flex-row">
				<p><b>Pendulum Scale:&ensp;</b></p>
				<input
					v-model="form.pendulumScale"
					name="pendulum-scale"
					type="text"
					size="5"
					value="_"
				/>
			</div>
			<p>(Mettere gli operatori, per esempio ==13, &lt;=8, &gt;3)</p>
		</div>

		<div
			v-if="form.type2 === 'Link' || !hidingMode"
			class="flex-col"
			style="width: 100%"
		>
			<p><b>Se Link, il mostro ha ESATTAMENTE queste frecce:</b></p>
			<grid-view
				:columns="3"
				:col-gap="0"
				:row-gap="10"
				class="link-markers-grid"
			>
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Top-Left.png"
					@click="markerEvent"
				/>
				<img loading="lazy" src="/ygobox_nuxt_static/false/Top.png" @click="markerEvent" />
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Top-Right.png"
					@click="markerEvent"
				/>
			</grid-view>
			<grid-view
				:columns="3"
				:col-gap="0"
				:row-gap="10"
				class="link-markers-grid"
			>
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Left.png"
					@click="markerEvent"
				/>
				<div></div>
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Right.png"
					@click="markerEvent"
				/>
			</grid-view>
			<grid-view
				:columns="3"
				:col-gap="0"
				:row-gap="10"
				class="link-markers-grid"
			>
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Bottom-Left.png"
					@click="markerEvent"
				/>
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Bottom.png"
					@click="markerEvent"
				/>
				<img
					loading="lazy"
					src="/ygobox_nuxt_static/false/Bottom-Right.png"
					@click="markerEvent"
				/>
			</grid-view>
		</div>
		<div class="flex-row">
			<div class="flex-col">
				<p>Tipo:</p>
				<select v-model="form.raceMonster" name="race-monster">
					<option label="Qualunque" selected="selected"></option>
					<option label="Aqua">Aqua</option>
					<option label="Bestia">Beast</option>
					<option label="Bestia Alata">Winged Beast</option>
					<option label="Cyberso">Cyberse</option>
					<option label="Demone">Fiend</option>
					<option label="Dinosauro">Dinosaur</option>
					<option label="Drago">Dragon</option>
					<option label="Fata">Fairy</option>
					<option label="Guerriero">Warrior</option>
					<option label="Guerriero-Bestia">Beast-Warrior</option>
					<option label="Illusione">Illusion</option>
					<option label="Incantatore">Spellcaster</option>
					<option label="Insetto">Insect</option>
					<option label="Macchina">Machine</option>
					<option label="Pesce">Fish</option>
					<option label="Pianta">Plant</option>
					<option label="Psichico">Psychic</option>
					<option label="Pyro">Pyro</option>
					<option label="Rettile">Reptile</option>
					<option label="Roccia">Rock</option>
					<option label="Serpente Marino">Sea Serpent</option>
					<option label="Tuono">Thunder</option>
					<option label="Wyrm">Wyrm</option>
					<option label="Zombie">Zombie</option>
				</select>
			</div>
			&ensp;
			<div class="flex-col">
				<p>e/o Attributo:</p>
				<select v-model="form.attribute" name="attribute">
					<option label="Qualunque" selected="selected"></option>
					<option label="TERRA">EARTH</option>
					<option label="ACQUA">WATER</option>
					<option label="VENTO">WIND</option>
					<option label="OSCURITÀ">DARK</option>
					<option label="LUCE">LIGHT</option>
					<option label="FUOCO">FIRE</option>
					<option label="DIVINO">DIVINE</option>
				</select>
			</div>
		</div>
		<grid-view
			:columns="2"
			:row-gap="0"
			:col-gap="5"
			style="width: 20%; text-align: center"
		>
		</grid-view>
		<div class="flex-row">
			<p>Livello/Rango/Classificazione Link:&ensp;</p>
			<select v-model="form.levelRankRating" name="level-rank-rating">
				<option label="Qualunque" selected="selected">_</option>
				<option label="0">_==0</option>
				<option label="1">_==1</option>
				<option label="2">_==2</option>
				<option label="3">_==3</option>
				<option label="4">_==4</option>
				<option label="5">_==5</option>
				<option label="6">_==6</option>
				<option label="7">_==7</option>
				<option label="8">_==8</option>
				<option label="9">_==9</option>
				<option label="10">_==10</option>
				<option label="11">_==11</option>
				<option label="12">_==12</option>
				<option label="13">_==13</option>
			</select>
		</div>
		<div class="flex-row">
			<div class="flex-col">
				<p>ATK</p>
				<input
					v-model="form.atk"
					type="text"
					name="ATK"
					size="5"
					value="> -1"
				/>
			</div>
			&ensp;
			<div class="flex-col">
				<p>DEF</p>
				<input
					v-model="form.def"
					type="text"
					name="DEF"
					size="5"
					value="> -1"
				/>
			</div>
		</div>
		<p>(Mettere gli operatori, per esempio ==1900, &lt;=500, &gt;2000)</p>
		<div></div>
		<div class="flex-row">
			<p>Il nome contiene:&ensp;</p>
			<input
				v-model="form.cardName"
				type="text"
				name="card-name"
				size="30"
			/>
		</div>
		<!--
		<p>
			(In inglese, aggiungere .* se si vuole cercare per pi&ugrave;
			parole: poly.*ation)
		</p>
		-->
		<div></div>
		<div class="flex-row">
			<p>L'effetto contiene:&ensp;</p>
			<input
				v-model="form.cardEffect"
				type="text"
				name="card-effect"
				size="30"
			/>
		</div>
		<!--
		<p>
			(In inglese, aggiungere .* se si vuole cercare per pi&ugrave;
			parole: destroy.*all)
		</p>
		-->
		<div>
			<button-secondary type="submit" :title="'CERCA'" />
			<button-secondary
				type="reset"
				:title="'RESET'"
				@click.native="resetForm()"
			/>
		</div>
		<div v-if="loading" class="loader"></div>
	</form>
</template>

<script>
import GridView from "./GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "SearchForm",
	components: { GridView },
	mixins: [Utils],
	props: {
		hidingMode: {
			type: Boolean,
			required: true,
		},
	},
	data: () => ({
		form: {
			pack: "",
			type1: "",
			type2: "",
			raceSpellTrap: "",
			pendulumScale: "_",
			raceMonster: "",
			attribute: "",
			levelRankRating: "_",
			atk: "> -1",
			def: "> -1",
			cardName: "",
			cardEffect: "",
			linkmarkers: [],
			favouriteCards: [],
		},
		loading: false,
	}),
	methods: {
		async onSubmit() {
			console.log(this.form)
			this.loading = true
			/*
			const results = await this.$axios.$post(
				"api/search_cards",
				this.form
			)
			*/

			const localFilter = (cards_param) => {
				let filtered = cards_param
				if (this.form.type1 === "Monster")
					filtered = filtered.filter((_) =>
						_.type.includes("Monster")
					)

				/*
				if (this.form.pack !== "")
					filtered = filtered
						.filter((_) => _.card_sets !== undefined)
						.filter((_) =>
							_.card_sets
								.map((set) => set.set_name.toLowerCase())
								.includes(this.form.pack.toLowerCase())
						)
				*/

				if (this.form.pendulumScale !== "_")
					filtered = filtered
						.filter((_) => _.scale !== undefined)
						.filter((_) =>
							// eslint-disable-next-line no-eval
							eval(`_.scale ${this.form.pendulumScale}`)
						)

				if (this.form.atk !== "> -1") {
					filtered = filtered
						.filter((_) => _.atk !== undefined)
						// eslint-disable-next-line no-eval
						.filter((_) => eval(`_.atk  ${this.form.atk}`))
				}
				if (this.form.def !== "> -1") {
					filtered = filtered
						.filter((_) => _.atk !== undefined)
						// eslint-disable-next-line no-eval
						.filter((_) => eval(`_.def ${this.form.def}`))
				}

				if (this.form.cardEffect !== "") {
					const regex = new RegExp(
						this.form.cardEffect.toLowerCase(),
						"g"
					)
					filtered = filtered.filter((_) => {
						return (
							_.desc.toLowerCase().search(regex) >= 0 ||
							(_.pend_desc !== undefined &&
								_.pend_desc.toLowerCase().search(regex) >= 0)
						)
					})
				}

				if (
					this.form.type2 === "Pendulum" ||
					this.form.type2 === "Flip"
				)
					filtered = filtered.filter((_) =>
						_.type.includes(this.form.type2)
					)

				if (this.form.raceMonster === "Illusion")
					filtered = filtered.filter((_) =>
						_.race
							.toLowerCase()
							.includes(this.form.raceMonster.toLowerCase())
					)

				return filtered
			}

			let type = null
			if (
				this.form.type2 !== "" &&
				this.form.type2 !== "Pendulum" &&
				this.form.type2 !== "Flip"
			)
				type = this.form.type2 + " Monster"
			if (this.form.type1 === "Spell" || this.form.type1 === "Trap")
				type = this.form.type1 + " Card"

			let race = null
			if (
				this.form.raceMonster !== "" &&
				this.form.raceMonster !== "Illusion"
			)
				race = this.form.raceMonster
			if (this.form.raceSpellTrap !== "") race = this.form.raceSpellTrap

			const ygoproForm = {
				fname: this.form.cardName === "" ? null : this.form.cardName,
				type,
				race,
				linkmarker:
					this.form.linkmarkers.length > 0
						? this.form.linkmarkers.reduce((a, b) => a + "," + b)
						: null,
				attribute:
					this.form.attribute === "" ? null : this.form.attribute,
			}

			let results = []

			if (this.form.levelRankRating !== "_") {
				// search by level
				ygoproForm.link = null
				ygoproForm.level =
					this.form.levelRankRating === "_"
						? null
						: this.form.levelRankRating.replace("_==", "")

				try {
					const { data } = await this.$axios.$post(
						"https://db.ygoprodeck.com/api/v7/cardinfo.php",
						null,
						{ params: ygoproForm }
					)
					const toPush = await localFilter(data)
					results = [...new Set([...results, ...toPush])]
					console.log(results.length)
				} catch (e) {}

				// search by link val
				ygoproForm.level = null
				ygoproForm.link =
					this.form.levelRankRating === "_"
						? null
						: this.form.levelRankRating.replace("_==", "")

				try {
					const { data } = await this.$axios.$post(
						"https://db.ygoprodeck.com/api/v7/cardinfo.php",
						null,
						{ params: ygoproForm }
					)
					const toPush = await localFilter(data)
					results = [...new Set([...results, ...toPush])]
					console.log(results.length)
				} catch (e) {}
			} else {
				ygoproForm.link = null
				ygoproForm.level = null
				try {
					const { data } = await this.$axios.$post(
						"https://db.ygoprodeck.com/api/v7/cardinfo.php",
						null,
						{ params: ygoproForm }
					)
					results = [...new Set([...results, ...localFilter(data)])]
				} catch (e) {}
			}

			try {
				results.find((_) => _.id === 1011091).id = 72309040
			} catch (e) {}
			try {
				results.find((_) => _.id === 10034401).id = 84544192
			} catch (e) {}
			try {
				results.find((_) => _.id === 10028504).id = 62219643
			} catch (e) {}

			results = this.categorySort(results)

			this.$emit("update:searchedCards", results)
			this.loading = false
		},
		resetForm() {
			this.form = {
				pack: "",
				type1: "",
				type2: "",
				raceSpellTrap: "",
				pendulumScale: "_",
				raceMonster: "",
				attribute: "",
				levelRankRating: "_",
				atk: "> -1",
				def: "> -1",
				cardName: "",
				cardEffect: "",
				linkmarkers: [],
				favouriteCards: [],
			}
			const markers = this.$el.querySelectorAll("img")
			Array.from(markers).forEach((_) => {
				_.src = _.src.replace("true", "false")
			})
			this.$emit("update:searchedCards", [])
		},
		markerEvent(e) {
			const marker = e.target.src.split("/").at(-1).replace(".png", "")
			if (e.target.src.includes("true")) {
				e.target.src = e.target.src.replace("true", "false")
				this.form.linkmarkers = this.form.linkmarkers.filter(
					(_) => _ !== marker
				)
			} else {
				e.target.src = e.target.src.replace("false", "true")
				this.form.linkmarkers.push(marker)
			}
			console.log(this.form.linkmarkers)
		},
	},
}
</script>

<style scoped>
.form > div {
	margin: var(--space-0);
}

p {
	margin: 0;
}

.loader {
	position: absolute;
	z-index: 2;
}

.link-markers-grid {
	width: 8%;
	margin-top: var(--space-1);
}

.link-markers-grid > img {
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
}
</style>
