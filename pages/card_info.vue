<template>
	<div>
		<search-form :hiding-mode="false" :searched-cards.sync="searchedCards" />
		<div v-if="searchedCards.length > 0" class="flex-col">
			<h3>{{ searchedCards.length }} risultati trovati</h3>
			<grid-view
				:columns="10"
				:col-gap="0"
				:row-gap="0"
				style="width: 95%"
			>
				<card-modal
					v-for="card of categorySort(searchedCards).slice(
						index * cardsPerPage,
						(index + 1) * cardsPerPage
					)"
					:key="card.id"
					:card-id="card.id"
					:rarity="'Common'"
					:src="getPicUrl(card.id)"
					:card-name="card.name"
				/>
			</grid-view>
			<p>
				<input
					ref="enterInput"
					type="text"
					size="1"
					:value="index + 1"
					@keypress="enterIndex"
				/>
				/
				{{ Math.ceil(searchedCards.length / cardsPerPage) }}
			</p>
			<grid-view
				:columns="thereIsNext && thereIsPrev ? 2 : 1"
				:col-gap="3"
				:row-gap="0"
				style="width: 10%"
			>
				<button-secondary
					v-if="thereIsPrev"
					:title="'<'"
					@click.native="index -= 1"
				/>
				<button-secondary
					v-if="thereIsNext"
					:title="'>'"
					@click.native="index += 1"
				/>
			</grid-view>
		</div>
	</div>
</template>

<script>
import SearchForm from "../components/SearchForm.vue"
import GridView from "../components/GridView.vue"
import CardModal from "../components/CardModal.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import Utils from "~/mixins/utils"
export default {
	name: "CardInfoPage",
	components: { SearchForm, CardModal, GridView, ButtonSecondary },
	mixins: [Utils],
	data: () => ({
		searchedCards: [],
		index: -1,
		cardsPerPage: 2 * 10,
		thereIsNext: false,
		thereIsPrev: false,
	}),
	head() {
		return {
			title: "Search Cards",
			meta: [
				{
					hid: "Search Cards",
					name: "Search Cards",
					content: `Search Cards`,
				},
			],
		}
	},
	watch: {
		searchedCards(newSearchedCard, oldSearchedCard) {
			this.index = 0
			this.thereIsNext =
				this.index + 1 <
				Math.ceil(newSearchedCard.length / this.cardsPerPage)
			this.thereIsPrev = this.index > 0
		},
		index(newIndex, oldIndex) {
			this.thereIsNext =
				newIndex + 1 <
				Math.ceil(this.searchedCards.length / this.cardsPerPage)
			this.thereIsPrev = newIndex > 0
		},
	},
	methods: {
		enterIndex(e) {
			if (e.which === 13) {
				const value = this.$refs.enterInput.value
				if (isNaN(value)) {
					alert("Inserisci un numero!")
					return
				}
				if (
					value < 1 ||
					value >
						Math.ceil(
							this.searchedCards.length / this.cardsPerPage
						)
				) {
					alert("Inserisci un numero valido!")
					return
				}
				this.index = +value - 1
			}
		},
	},
}
</script>

<style scoped>
.flex-col > * {
	margin: var(--space-0);
}
</style>
