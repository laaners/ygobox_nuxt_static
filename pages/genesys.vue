<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div id="flex-col" class="text-center flex-col">
        <div v-if="allcards.length === 0 || !noArcMode" class="loader" style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
				margin-top: var(--space-1) !important;
			"></div>
        <div v-if="savedCards.length > 0" class="flex-col" style="width: 100%">
            <h1>
                HAI {{ savedCards.length }} CARTE DIVERSE NELLA TUA COLLEZIONE!
            </h1>
            <div class="flex-row after-page" style="width: 100%">
                <div class="flex-col deck-container" oncontextmenu="return false;">
                    <div v-if="draftMode" style="margin-bottom: var(--space-1)">
                        <ul>
                            <li>
                                Almeno 20 carte, non c'è un limite massimo, puoi
                                anche giocare con 100 carte
                            </li>
                            <li>Extra deck illimitato</li>
                            <li>
                                Il limite di 3 sulle altre carte nel mazzo non
                                viene considerato, puoi giocare anche con 100
                                carte uguali
                            </li>
                            <li>
                                Carte bandite o limitate possono essere usate in
                                qualsiasi numero
                            </li>
                        </ul>
                    </div>
                    <grid-view :columns="3" :row-gap="0" :col-gap="1" style="
							width: 100%;
							margin-left: auto;
							margin-right: auto;
						">
                        <button-secondary :title="'SALVA'" @click.native="saveDeck()" />
                        <button-secondary :title="'RESET'" @click.native="resetDeck()" />
                        <button-secondary :title="'CARICA'" @click.native="$refs.upload.click()" />
                        <input ref="upload" type="file" class="text-center" @change="uploadDeck"
                            @click="$refs.upload.value = null" />
                    </grid-view>
                    <grid-view v-if="noArcMode" :columns="2" :row-gap="0" :col-gap="1" style="
							width: 70%;
							margin-left: auto;
							margin-right: auto;
							margin-top: 1%;
						">
                        <button-secondary v-if="noArcMode" :title="'PUBBLICA'" @click.native="publishDeck()" />
                        <button-secondary v-if="noArcMode" :title="'RANDOM'" @click.native="randomNoArchetypes()" />
                    </grid-view>
                    <span style="margin-top: var(--space-1)">TASTO SINISTRO PER VEDERE L'EFFETTO</span>
                    <span>TASTO DESTRO PER TOGLIERE DAL DECK</span>
                    <div v-if="randomDeckData.deck_name.length > 0" style="
							opacity: 1;
							width: 100%;
							text-align: center;
							border-radius: var(--border-radius);
						">
                        <h3>
                            <a ref="randomDeck" :href="randomDeckData.pretty_url" target="_blank">{{
                                randomDeckData.deck_name }}</a>
                        </h3>
                    </div>
                    <div v-if="noArcLoading" class="loader" style="
							margin-left: auto;
							margin-right: auto;
							margin-bottom: var(--space-1);
							margin-top: var(--space-1) !important;
						"></div>
                    <h1>TOTALE PUNTI: ({{ getPoints() }})</h1>
                    <h3>MAIN DECK ({{ getMainDeck().length }})</h3>
                    <grid-view :columns="getMainDeck().length > 5
                        ? 10
                        : getMainDeck().length * 2
                        " :row-gap="0" :col-gap="0">
                        <card-modal v-for="(card, i) of getMainDeck()" :key="card.id + i" :src="getPicSmallUrl(card.id)"
                            :card-id="card.id" :rarity="'Common'" :limit-image="getLimitImage(card.id)"
                            :card-name="card.name" @mousedown.native="removeFromDeck" />
                    </grid-view>
                    <h3>EXTRA DECK ({{ getExtraDeck().length }})</h3>
                    <grid-view :columns="getExtraDeck().length > 5
                        ? 10
                        : getExtraDeck().length * 2
                        " :row-gap="0" :col-gap="0">
                        <card-modal v-for="(card, i) of getExtraDeck()" :key="card.id + i"
                            :src="getPicSmallUrl(card.id)" :card-id="card.id" :rarity="'Common'"
                            :limit-image="getLimitImage(card.id)" :card-name="card.name"
                            @mousedown.native="removeFromDeck" />
                    </grid-view>
                </div>
                <div class="flex-col form-container">
                    <h3 v-if="!noArcMode" style="margin-bottom: 2%">CERCA</h3>
                    <grid-view v-else :columns="2" :row-gap="0" :col-gap="2" style="width: 70%; margin-bottom: 2%">
                        <button-secondary v-for="searchLabel of ['CERCA CARTA', 'CERCA DECK']" :key="searchLabel"
                            :title="searchLabel" :style="{
                                opacity: searchFilter === searchLabel ? 1 : 0.5,
                            }" @click.native="searchFilter = searchLabel" />
                    </grid-view>
                    <div v-if="searchFilter === 'CERCA CARTA'" class="flex-col">
                        <div class="flex-col search-form" :style="searchedAppendCards.length > 0
                            ? { height: '22vh' }
                            : {}
                            ">
                            <div class="flex-row">
                                <span>Solo carte preferite:&ensp;</span>
                                <input ref="favourite" type="checkbox" @change="bindFavouriteCards" />
                            </div>
                            <div class="flex-row">
                                <p>Solo dal pacchetto:&ensp;</p>
                                <select ref="selectPack" style="width: 50%" @change="bindSelectedSet">
                                    <option label="Qualunque" selected="selected"></option>
                                    <option v-for="(set, i) of savedSets" :key="set + i" :label="set">
                                        {{ set }}
                                    </option>
                                </select>
                            </div>
                            <search-form ref="searchForm" class="search-form-component" :hiding-mode="true"
                                :searched-cards.sync="searchedCards" />
                        </div>
                        <div class="redundant-form-buttons">
                            <button-secondary :title="'CERCA'" @click.native="
                                $el.querySelector(
                                    `button[type='submit']`
                                ).click()
                                " />
                            <button-secondary :title="'RESET'" @click.native="
                                $el.querySelector(
                                    `button[type='reset']`
                                ).click()
                            $refs.favourite.checked = false
                            $refs.selectPack.value = ''
                                " />
                        </div>
                        <div v-if="searchedAppendCards.length > 0" class="flex-col" style="position: relative">
                            <h3 style="margin: var(--space-0)">
                                {{ searchedAppendCards.length }} risultati
                                trovati
                            </h3>
                            <div v-if="multiPage" class="flex-col">
                                <grid-view :columns="1" :col-gap="0" :row-gap="20" :style="searchedAppendCards.slice(
                                    index * cardsPerPage,
                                    (index + 1) * cardsPerPage
                                ).length > 1
                                    ? {
                                        position: 'absolute',
                                        right: '-11%',
                                        top: '15%',
                                    }
                                    : {
                                        position: 'absolute',
                                        right: '-25%',
                                        top: '15%',
                                    }
                                    ">
                                    <multi-page-icon style="
											height: 4vmax;
											width: 4vmax;
											cursor: pointer;
										" @click.native="multiPage = true" />
                                    <scroll-page-icon style="
											height: 4vmax;
											width: 4vmax;
											cursor: pointer;
										" @click.native="multiPage = false" />
                                </grid-view>
                                <grid-view :columns="thereIsNext && thereIsPrev ? 2 : 1
                                    " :col-gap="3" :row-gap="0" style="width: 20%">
                                    <button-secondary v-if="thereIsPrev" :title="'<'" @click.native="index -= 1" />
                                    <button-secondary v-if="thereIsNext" :title="'>'" @click.native="index += 1" />
                                </grid-view>
                                <grid-view class="search-results" :columns="searchedAppendCards.slice(
                                    index * cardsPerPage,
                                    (index + 1) * cardsPerPage
                                ).length > 1
                                    ? 2
                                    : 1
                                    " :col-gap="1" :row-gap="0">
                                    <container-searched-card v-for="(
											card, i
										) of searchedAppendCards.slice(
                                                index * cardsPerPage,
                                                (index + 1) * cardsPerPage
                                            )" :key="card.id + i * 2 + 1" :card="card" :saved-info="card.saved_info"
                                        :src="getPicSmallUrl(card.id)" :form-checked-change.sync="formCheckedChange
                                            " :form-favourite-change.sync="formFavouriteChange
                                                " :limit-image="getLimitImage(card.id)" />
                                </grid-view>
                                <p>
                                    <input ref="enterInput" type="text" size="1" :value="index + 1"
                                        @keypress="enterIndex" />
                                    /
                                    {{
                                        Math.ceil(
                                            searchedAppendCards.length /
                                            cardsPerPage
                                        )
                                    }}
                                </p>
                            </div>
                            <div v-if="!multiPage" class="flex-col">
                                <grid-view :columns="1" :col-gap="0" :row-gap="20" style="
										position: absolute;
										right: -11%;
										top: 15%;
									">
                                    <multi-page-icon style="
											height: 4vmax;
											width: 4vmax;
											cursor: pointer;
										" @click.native="multiPage = true" />
                                    <scroll-page-icon style="
											height: 4vmax;
											width: 4vmax;
											cursor: pointer;
										" @click.native="multiPage = false" />
                                </grid-view>
                                <grid-view style="overflow-y: scroll; height: 80vh" class="search-results" :columns="searchedAppendCards.length > 1 ? 2 : 1
                                    " :col-gap="1" :row-gap="0">
                                    <container-searched-card v-for="(card, i) of searchedAppendCards"
                                        :key="card.id + i * 2" :card="card" :saved-info="card.saved_info"
                                        :src="getPicSmallUrl(card.id)" :form-checked-change.sync="formCheckedChange
                                            " :form-favourite-change.sync="formFavouriteChange
                                                " :limit-image="getLimitImage(card.id)" />
                                </grid-view>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex-col" style="
							overflow-y: scroll;
							overflow-x: hidden;
							height: 70vh;
							justify-content: flex-start;
							width: 100%;
						">
                        <div class="flex-row">
                            <h3 style="
									cursor: pointer;
									margin: 0;
									margin-left: 10%;
									margin-right: 10%;
								" @click="getPublicDecks">
                                &#8635;
                            </h3>
                            <h3 style="
									cursor: pointer;
									margin: 0;
									margin-left: 10%;
									margin-right: 10%;
								" @click="
                                    noArcDecks = noArcDecks.sort((a, b) =>
                                        a.date >= b.date ? -1 : 1
                                    )
                                    ">
                                &#x25B2;
                            </h3>
                            <h3 style="
									cursor: pointer;
									margin: 0;
									margin-left: 10%;
									margin-right: 10%;
								" @click="
                                    noArcDecks = noArcDecks.sort((a, b) =>
                                        a.date < b.date ? -1 : 1
                                    )
                                    ">
                                &#x25BC;
                            </h3>
                            <h3 style="
									cursor: pointer;
									margin: 0;
									margin-left: 10%;
									margin-right: 10%;
								" @click="
                                    noArcDecks = noArcDecks.sort((a, b) =>
                                        a.deckName < b.deckName ? -1 : 1
                                    )
                                    ">
                                AZ
                            </h3>
                        </div>
                        <grid-view v-if="noArcDecks.length > 0" :columns="2" :row-gap="0.5" :col-gap="1"
                            style="width: 100%">
                            <div v-for="(publicDeck, i) of noArcDecks" :key="publicDeck.deckName + i"
                                class="public-deck" :style="{
                                    opacity:
                                        publicDeck.deckName ===
                                            noArcDeckName.replace('.ydk', '')
                                            ? 1
                                            : 0.5,
                                }">
                                <x-icon style="float: right; cursor: pointer" :data-name="publicDeck.deckName"
                                    @click.native="
                                        deletePublicDeck(publicDeck.deckName)
                                        " />
                                <h4 :data-name="publicDeck.deckName" @click="loadPublicDeck">
                                    {{ publicDeck.deckName }}
                                </h4>
                                <!--
								<p>
									Creato {{ timeSince(publicDeck.date) }} fa
								</p>
								-->
                            </div>
                        </grid-view>
                        <div v-else class="loader" style="
								margin-left: auto;
								margin-right: auto;
								margin-bottom: var(--space-1);
								margin-top: var(--space-1) !important;
							"></div>
                    </div>
                </div>
            </div>
            <div v-if="!noArcMode" class="flex-col pack-section">
                <input ref="openPack" style="margin-top: var(--space-2)" type="text" maxlength="125" size="40"
                    placeholder="Scrivi qua un pacchetto!" list="allsets" />
                <datalist id="allsets">
                    <option v-for="set of allsets" :key="set.set_code" :value="set.set_name">
                        {{ set.set_name }}
                    </option>
                </datalist>
                <button-secondary :title="'APRI PACCHETTO'" @click.native="drafting()" />
                <div v-if="packLoading" class="loader" style="
						margin-left: auto;
						margin-right: auto;
						margin-bottom: var(--space-1);
						margin-top: var(--space-1) !important;
					"></div>
                <div v-show="packAppendCards.length > 0" class="flex-col visible-pack">
                    <container-pack-scroll id="pack-img" :set="openedSet" />
                    <h3 ref="packInfo"></h3>
                    <grid-view class="cardsPack" :columns="packAppendCards.length < 6
                        ? packAppendCards.length
                        : 6
                        " :row-gap="0.5" :col-gap="1" style="width: 90%">
                        <div v-for="(card, i) of packAppendCards" :key="card.id + i" class="flex-col">
                            <container-pack-info :src="getPicUrl(card.id)" :card="card" :rarity="card.rarity.set_rarity"
                                :percentage="card.rarity.percentage" :limit-image="getLimitImage(card.id)" />
                            <div class="flex-row pack-card-checkbox-star">
                                <input v-if="!draftMode" type="checkbox" :value="card.id" @change="addToDeck" />
                                <input v-else type="checkbox" checked :value="card.id" @change="addToDeck" />
                                <star-icon :ref="card.id" :value="card" :style="getFavouriteStyle(card.id)"
                                    @click.native="
                                        formFavouriteChange = {
                                            favourite: !savedCards.find(
                                                (_) => _.id === card.id
                                            ).favourite,
                                            cardId: card.id,
                                        }
                                        " />
                            </div>
                        </div>
                    </grid-view>
                </div>
            </div>
            <!--
            <div v-else class="flex-col" style="width: 95%">
                <h3 style="color: black; background-color: red; padding: 5px">
                    Bandite
                </h3>
                <grid-view :columns="10" :col-gap="0" :row-gap="0" style="width: 100%">
                    <div v-for="card of currentBanlist.filter(
                        (_) => _.status === 0
                    )" :key="card.id" style="position: relative">
                        <card-modal :card-id="card.id" :rarity="'Common'" :src="getPicUrl(card.id)"
                            limit-image="/ygobox_nuxt_static/00lim.png" />
                    </div>
                </grid-view>
                <h3 style="color: black; background-color: orange; padding: 5px">
                    Limitate
                </h3>
                <grid-view :columns="10" :col-gap="0" :row-gap="0" style="width: 100%">
                    <div v-for="card of currentBanlist.filter(
                        (_) => _.status === 1
                    )" :key="card.id" style="position: relative">
                        <card-modal :card-id="card.id" :rarity="'Common'" :src="getPicUrl(card.id)"
                            limit-image="/ygobox_nuxt_static/01lim.png" />
                    </div>
                </grid-view>
                <h3 style="color: black; background-color: yellow; padding: 5px">
                    Semi-limitate
                </h3>
                <grid-view :columns="10" :col-gap="0" :row-gap="0" style="width: 100%">
                    <div v-for="card of currentBanlist.filter(
                        (_) => _.status === 2
                    )" :key="card.id" style="position: relative">
                        <card-modal :card-id="card.id" :rarity="'Common'" :src="getPicUrl(card.id)"
                            limit-image="/ygobox_nuxt_static/02lim.png" />
                    </div>
                </grid-view>
            </div>
            -->
        </div>
    </div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import SearchForm from "../components/SearchForm.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import MultiPageIcon from "../components/icons/MultiPageIcon.vue"
import ScrollPageIcon from "../components/icons/ScrollPageIcon.vue"
import StarIcon from "../components/icons/StarIcon.vue"
import XIcon from "../components/icons/XIcon.vue"
import Utils from "~/mixins/utils"
import Drafting from "~/mixins/drafting"

export default {
    name: "IndexPage",
    components: {
        XIcon,
        GridView,
        CardModal,
        SearchForm,
        ButtonSecondary,
        MultiPageIcon,
        ScrollPageIcon,
        StarIcon,
    },
    mixins: [Utils, Drafting],
    /*
    async asyncData({ $getAllCards }) {
        const allcards = await $getAllCards()
        return { allcards }
    },
    */
    data: () => ({
        allsets: [],
        allcards: [],
        hashAllcards: {},
        savedCards: [],
        savedSets: [],
        deck: [],

        searchedCards: [],
        searchedAppendCards: [],
        index: -1,
        cardsPerPage: 8,
        thereIsNext: false,
        thereIsPrev: false,
        formCheckedChange: {},
        formFavouriteChange: {},
        multiPage: true,

        recentlySaved: false,
        draftMode: false,

        noArcMode: false,
        noArcDeckName: "Deck.ydk",
        noArcLoading: false,
        searchFilter: "CERCA CARTA",
        noArcDecks: [],

        randomDeckData: { deck_name: "", deck_excerpt: "", pretty_url: "" },

        packAppendCards: [],
        packLoading: false,
        openedSet: {},
    }),
    head() {
        return {
            title: "Deck Editor",
            meta: [
                {
                    hid: "Deck Editor",
                    name: "Deck Editor",
                    content: `Deck Editor`,
                },
            ],
        }
    },
    watch: {
        savedCards(newSavedCards, oldSavedCards) {
            this.savedSets = [
                ...new Set(
                    newSavedCards
                        .map((_) => _.sets)
                        .reduce((a, b) => a.concat(b))
                ),
            ].sort((a, b) => (a > b ? -1 : 1))
            this.reloadDeck(newSavedCards)
        },
        searchedCards(newSearchedCard, oldSearchedCard) {
            if (newSearchedCard.length === 0) {
                this.searchedAppendCards = []
                this.multiPage = true
                return
            }
            const hash = this.hashGroupBy(this.savedCards, "id")
            /*
            {
                21312: [{
                        "id": 21312,
                        "copies": 3
                        ...
                    }]
                }
            }
            */
            // pack filtering
            const pack = this.$refs.searchForm.form.pack
            const filteredSavedCards = this.savedCards
                .filter((_) => (pack === "" ? true : _.sets.includes(pack)))
                .map((_) => _.id)
            this.searchedAppendCards = this.categorySort(
                newSearchedCard.filter((_) => {
                    return filteredSavedCards.includes(_.id)
                })
            )
            this.searchedAppendCards.forEach((_) => {
                _.saved_info = hash[_.id][0]
            })

            /*
            this.index = 0
            this.thereIsNext =
                this.index + 1 <
                Math.ceil(newSearchedCard.length / this.cardsPerPage)
            this.thereIsPrev = this.index > 0
            */
        },
        searchedAppendCards(newSearchedAppendCards, oldSearchedAppendCards) {
            this.index = 0
            this.thereIsNext =
                this.index + 1 <
                Math.ceil(newSearchedAppendCards.length / this.cardsPerPage)
            this.thereIsPrev = this.index > 0
        },
        index(newIndex, oldIndex) {
            this.thereIsNext =
                newIndex + 1 <
                Math.ceil(this.searchedAppendCards.length / this.cardsPerPage)
            this.thereIsPrev = newIndex > 0
        },
        formCheckedChange(newCheckedChange, oldCheckedChange) {
            const savedCard = this.savedCards.find(
                (_) => _.id === newCheckedChange.cardId
            )
            const oldChecked = savedCard.checked
            savedCard.checked = newCheckedChange.checked
            this.updatePackCard(
                newCheckedChange.cardId,
                savedCard.checked > oldChecked
            )
            this.reloadDeck(this.savedCards)
        },
        formFavouriteChange(newFavouriteChange, oldFavouriteChange) {
            const cardId = newFavouriteChange.cardId
            this.savedCards.find((_) => _.id === cardId).favourite =
                newFavouriteChange.favourite

            //	Update form favourite if checked from pack cards
            const searchResults = this.$el.querySelector(".search-results")
            if (!(searchResults === undefined || searchResults === null)) {
                const toUpdate = searchResults.__vue__.$slots.default.find(
                    (slot) => slot.componentOptions.propsData.card.id === cardId
                )
                if (
                    !(toUpdate === undefined || toUpdate === null) &&
                    toUpdate.componentInstance.favourite !==
                    newFavouriteChange.favourite
                )
                    toUpdate.componentInstance.favourite =
                        newFavouriteChange.favourite
            }
        },
        packAppendCards(newPackAppendCards, oldPackAppendCards) {
            if (newPackAppendCards.length === 0) {
                const setStyle = {
                    top: 0,
                    marginTop: "var(--header-padding)",
                    position: "fixed",
                    overflowY: "scroll",
                    height: "30%",
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    zIndex: 9998,
                }
                const deckContainer = this.$el.querySelector(".deck-container")
                for (const prop of Object.keys(setStyle)) {
                    deckContainer.style[prop.toString()] = ""
                }
            }
        },
        searchFilter(newV, olV) {
            if (newV === "CERCA DECK") {
                this.getPublicDecks()
            }
        },
    },
    async mounted() {
        this.currentBanlist = []

        this.allcards = await this.getAllCards()
        this.allsets = await this.$axios.$get(
            "https://db.ygoprodeck.com/api/v7/cardsets.php"
        )

        const points = {
            "Abyss Dweller": 100,
            "Adamancipator Risen - Dragite": 20,
            "Agido the Ancient Sentinel": 50,
            "Albion the Sanctifire Dragon": 33,
            "Allure of Darkness": 5,
            "Amorphactor Pain, the Imagination Dracoverlord": 100,
            "Ancient Gear Advance": 33,
            "Ancient Gear Statue": 33,
            "And the Band Played On": 100,
            "Angel O7": 100,
            "Anti-Spell Fragrance": 100,
            "Appointer of the Red Lotus": 50,
            "Arcana Force XXI - The World": 100,
            "Archlord Kristya": 100,
            "Archnemeses Eschatos": 100,
            "Archnemeses Protos": 100,
            "Artifact Scythe": 100,
            "Asceticism of the Six Samurai": 10,
            "Ash Blossom & Joyous Spring": 15,
            "Assault Synchron": 5,
            "Astral Kuriboh": 3,
            "Atlantean Dragoons": 40,
            "Azamina Ilia Silvia": 20,
            "Azamina Mu Rcielago": 33,
            "Bahamut Shark": 81,
            "Baronne de Fleur": 85,
            "Barrier of the Voiceless Voice": 33,
            "Barrier Statue of the Abyss": 60,
            "Barrier Statue of the Drought": 60,
            "Barrier Statue of the Heavens": 60,
            "Barrier Statue of the Inferno": 60,
            "Barrier Statue of the Stormwinds": 60,
            "Barrier Statue of the Torrent": 60,
            "Beatrice, Lady of the Eternal": 100,
            "Big Welcome Labrynth": 33,
            "Blackwing - Boreastorm the Wicked Wind": 20,
            "Blackwing - Zephyros the Elite": 13,
            "Blaster, Dragon Ruler of Infernos": 7,
            "Blaze Fenix, the Burning Bombardment Bird": 70,
            "Blazing Cartesia, the Virtuous": 3,
            "Block Dragon": 33,
            "Bonfire": 33,
            "Book of Eclipse": 5,
            "Book of Moon": 7,
            "Brain Research Lab": 100,
            "Branded Expulsion": 33,
            "Branded Fusion": 33,
            "Branded Lost": 66,
            "Brilliant Fusion": 33,
            "Butterfly Dagger - Elma": 1,
            "Bystial Baldrake": 30,
            "Bystial Dis Pater": 10,
            "Bystial Druiswurm": 30,
            "Bystial Magnamhut": 33,
            "Bystial Saronir": 20,
            "Called by the Grave": 20,
            "Card Destruction": 40,
            "Card of Demise": 40,
            "Card of Safe Return": 40,
            "Catapult Turtle": 100,
            "Centur-Ion Auxila": 33,
            "Centur-Ion Primera": 5,
            "Centur-Ion Trudea": 3,
            "Chain Strike": 50,
            "Change of Heart": 10,
            "Chaofeng, Phantom of the Yang Zing": 13,
            "Chaos Angel": 20,
            "Chaos Dragon Levianeer": 10,
            "Chaos Ruler, the Chaotic Magical Dragon": 50,
            "Chaos Space": 40,
            "Charge of the Light Brigade": 33,
            "Chicken Game": 7,
            "Cold Wave": 100,
            "Confiscation": 100,
            "Contact \"C\"": 100,
            "Cornfield Coatl": 33,
            "Cosmic Blazar Dragon": 1,
            "Creature Swap": 1,
            "Crimson Dragon": 100,
            "Crossout Designator": 10,
            "Crystron Inclusion": 33,
            "Crystron Smiger": 5,
            "Crystron Sulfador": 3,
            "Crystron Thystvern": 5,
            "Cyber Angel Benten": 40,
            "Cyber Dragon Infinity": 20,
            "Cyber Jar": 33,
            "Cyber-Stein": 27,
            "D/D/D Duo-Dawn King Kali Yuga": 77,
            "D/D/D Wave High King Caesar": 20,
            "Daigusto Emeral": 1,
            "Danger! Bigfoot!": 3,
            "Danger! Chupacabra!": 3,
            "Danger! Dogman!": 3,
            "Danger! Mothman!": 3,
            "Danger! Nessie!": 7,
            "Danger! Ogopogo!": 3,
            "Danger! Thunderbird!": 3,
            "Danger!? Jackalope?": 7,
            "Danger!? Tsuchinoko?": 7,
            "Dark End Evaporation Dragon": 5,
            "Dark Hole": 3,
            "Dark World Archives": 5,
            "Dark World Dealings": 5,
            "Deception of the Sinful Spoils": 33,
            "Deck Lockdown": 100,
            "Deep Sea Aria": 33,
            "Delinquent Duo": 100,
            "Demise of the Land": 1,
            "Denglong, First of the Yang Zing": 33,
            "Denko Sekka": 20,
            "Destiny HERO - Destroyer Phoenix Enforcer": 20,
            "Destiny HERO - Plasma": 20,
            "Destructive Daruma Karma Cannon": 5,
            "Diabell, Queen of the White Forest": 25,
            "Diabellstar the Black Witch": 20,
            "Different Dimension Ground": 10,
            "Dimension Fusion": 45,
            "Dimension Shifter": 10,
            "Dimensional Barrier": 100,
            "Dinomorphia Intact": 1,
            "Dinomorphia Rexterm": 91,
            "Dinowrestler Pankratops": 10,
            "Divine Arsenal AA-ZEUS - Sky Thunder": 20,
            "Diviner of the Herald": 33,
            "Djinn Releaser of Rituals": 100,
            "Dogmatika Ecclesia, the Virtuous": 3,
            "Domain of the True Monarchs": 50,
            "Dominus Impulse": 30,
            "Dominus Purge": 10,
            "Dominus Spiral": 10,
            "Dracotail Arthalion": 20,
            "Dracotail Faimena": 20,
            "Dracotail Mululu": 5,
            "Dragon Master Magia": 100,
            "Dragonic Diagram": 33,
            "Dragonmaid Sheou": 20,
            "Dragonmaid Tidying": 10,
            "Dragon's Bind": 100,
            "Dragon's Light and Darkness": 7,
            "Droll & Lock Bird": 5,
            "Drytron Alpha Thuban": 33,
            "Drytron Mu Beta Fafnir": 33,
            "Duality": 10,
            "Eclipse Wyvern": 33,
            "Effect Veiler": 7,
            "El Shaddoll Apkallone": 10,
            "El Shaddoll Winda": 60,
            "Elder Entity Norden": 91,
            "Elder Entity N'tss": 7,
            "Elemental HERO Stratos": 3,
            "Elzette, Azamina of the White Forest": 22,
            "Emergency Teleport": 40,
            "EMERGENCY!": 33,
            "Eva": 1,
            "Evenly Matched": 10,
            "Evilswarm Ouroboros": 67,
            "Ext Ryzeal": 25,
            "F.A. Dawn Dragster": 20,
            "Fairy Tail - Snow": 85,
            "Fiber Jar": 30,
            "Final Countdown": 100,
            "Fire Formation - Tenki": 40,
            "Fire King Courtier Ulcanix": 20,
            "Fire King High Avatar Kirin": 10,
            "Fishborg Blaster": 33,
            "Floowandereeze & Robina": 33,
            "Floowandereeze and the Advent of Adventure": 33,
            "Floowandereeze and the Magnificent Map": 33,
            "Foolish Burial": 33,
            "Foolish Burial Goods": 3,
            "Forbidden Chalice": 5,
            "Forbidden Droplet": 10,
            "Forbidden Lance": 3,
            "Fossil Dig": 40,
            "Fossil Dyna Pachycephalo": 100,
            "Frightfur Patchwork": 33,
            "Fusion Destiny": 33,
            "Gallant Granite": 33,
            "Gateway of the Six": 100,
            "Gem-Knight Master Diamond": 66,
            "Ghost Belle & Haunted Mansion": 5,
            "Ghost Meets Girl - A Masterful Mayakashi Shiranui Saga": 100,
            "Ghost Mourner & Moonlit Chill": 7,
            "Ghost Ogre & Snow Rabbit": 5,
            "Ghost Sister & Spooky Dogwood": 3,
            "Giant Trunade": 40,
            "Gigantic Spright": 20,
            "Gimmick Puppet Nightmare": 70,
            "Give and Take": 91,
            "Gladiator Beast Gyzarus": 20,
            "Gladiator Beast Tamer Editor": 20,
            "Gladiator Proving Ground": 33,
            "Gladiator Rejection": 15,
            "Glow-Up Bulb": 21,
            "Goblin Biker Grand Entrance": 33,
            "Gold Sarcophagus": 10,
            "Gozen Match": 100,
            "Graceful Charity": 40,
            "Grapha, Dragon Lord of Dark World": 5,
            "Grapha, Dragon Overlord of Dark World": 5,
            "Gruesome Grave Squirmer": 1,
            "Guardian Chimera": 33,
            "Guiding Quem, the Virtuous": 3,
            "Harpie's Feather Duster": 30,
            "Harpie's Feather Storm": 100,
            "Heart of the Blue-Eyes": 5,
            "Heat Wave": 100,
            "Heavy Storm": 20,
            "Herald of the Arc Light": 50,
            "Hot Red Dragon Archfiend King Calamity": 1,
            "Hyper Rank-Up-Magic Utopiforce": 1,
            "Ice Ryzeal": 20,
            "Ido the Supreme Magical Force": 100,
            "Imperial Order": 100,
            "Imsety, Glory of Horus": 33,
            "Incoming Machine!": 33,
            "Incredible Ecclesia, the Virtuous": 3,
            "Infernal Flame Banshee": 33,
            "Infernity Launcher": 88,
            "Infinite Impermanence": 13,
            "Inspector Boarder": 20,
            "Instant Fusion": 100,
            "Interrupted Kaiju Slumber": 33,
            "Into the Void": 3,
            "Invoked Caliga": 90,
            "Jet Synchron": 1,
            "Jowgen the Spiritualist": 100,
            "Junk Speeder": 100,
            "K9-04 Noroi": 10,
            "K9-17 \"Ripper\"": 20,
            "K9-17 Izuna": 20,
            "K9-66a Jokul": 13,
            "K9-ØØ Lupis": 5,
            "Kaiser Colosseum": 100,
            "Kashtira Arise-Heart": 97,
            "Kashtira Fenrir": 30,
            "Kashtira Unicorn": 30,
            "Kelbek the Ancient Vanguard": 50,
            "Keldo the Sacred Protector": 1,
            "Ketu Dracotail": 10,
            "King of the Feral Imps": 33,
            "King's Sarcophagus": 33,
            "Knight Armed Dragon, the Armored Knight Dragon": 3,
            "Knightmare Corruptor Iblee": 100,
            "Koa'ki Meiru Drago": 75,
            "Koa'ki Meiru Guardian": 3,
            "Koa'ki Meiru Overload": 3,
            "Koa'ki Meiru Sandman": 3,
            "Koa'ki Meiru Wall": 3,
            "Lady Labrynth of the Silver Castle": 33,
            "Lady's Dragonmaid": 20,
            "Last Turn": 75,
            "Last Will": 100,
            "Lavalval Chain": 80,
            "Left Arm Offering": 7,
            "Legendary Fire King Ponix": 10,
            "Legendary Lord Six Samurai - Shi En": 10,
            "Legendary Six Samurai - Shi En": 10,
            "Level Eater": 100,
            "Life Equalizer": 100,
            "Light and Darkness Dragonlord": 20,
            "Light Barrier": 1,
            "Light End Sublimation Dragon": 5,
            "Lightning Storm": 40,
            "Lightsworn Dragonling": 10,
            "Lonefire Blossom": 33,
            "Lose 1 Turn": 100,
            "Lubellion the Searing Dragon": 33,
            "Lyrilusc - Beryl Canary": 5,
            "Lyrilusc - Bird Call": 20,
            "Lyrilusc - Independent Nightingale": 1,
            "Magical Explosion": 75,
            "Magical Mid-Breaker Field": 60,
            "Magical Scientist": 95,
            "Magician of Black Chaos MAX": 100,
            "Majesty's Fiend": 100,
            "Mansion of the Dreadful Dolls": 100,
            "Masked HERO Dark Law": 70,
            "Mass Driver": 100,
            "Master Peace, the True Dracoslaying King": 33,
            "Mathmech Sigma": 7,
            "Maxx \"C\"": 50,
            "Meizen the Battle Ninja": 20,
            "Mementomictlan Tecuhtlica - Creation King": 33,
            "Mementotlan Bone Party": 33,
            "Mementotlan Twin Dragon": 33,
            "Metamorphosis": 10,
            "Metaverse": 3,
            "Mikanko Water Arabesque": 10,
            "Millennium Ankh": 3,
            "Mind Drain": 100,
            "Mind Master": 1,
            "Mirage of Nightmare": 10,
            "Mirrorjade the Iceblade Dragon": 33,
            "Miscellaneousaurus": 75,
            "Mistake": 100,
            "Mitsurugi Prayers": 60,
            "Mitsurugi Ritual": 60,
            "Monster Gate": 50,
            "Monster Reborn": 15,
            "Morphing Jar": 33,
            "Morphtronic Telefon": 55,
            "Moulinglacia the Elemental Lord": 100,
            "Mudora the Sword Oracle": 1,
            "Mulcharmy Fuwalos": 7,
            "Mulcharmy Meowls": 3,
            "Mulcharmy Purulia": 10,
            "Multi-Universe": 3,
            "M-X-Saber Invoker": 33,
            "Mystic Mine": 100,
            "Nadir Servant": 33,
            "Naturia Barkion": 10,
            "Naturia Beast": 50,
            "Naturia Exterio": 100,
            "Necrovalley": 40,
            "Neptabyss, the Atlantean Prince": 33,
            "Nibiru, the Primal Being": 10,
            "Nightmare Apprentice": 33,
            "Nightmare Throne": 50,
            "Number 1: Infection Buzzking": 85,
            "Number 1: Numeron Gate Ekam": 10,
            "Number 100: Numeron Dragon": 1,
            "Number 16: Shock Master": 100,
            "Number 2: Numeron Gate Dve": 10,
            "Number 3: Numeron Gate Trini": 10,
            "Number 38: Hope Harbinger Dragon Titanic Galaxy": 20,
            "Number 4: Numeron Gate Catvari": 10,
            "Number 40: Gimmick Puppet of Strings": 50,
            "Number 41: Bagooska the Terribly Tired Tapir": 100,
            "Number 43: Manipulator of Souls": 100,
            "Number 59: Crooked Cook": 100,
            "Number 60: Dugares the Timeless": 10,
            "Number 67: Pair-a-Dice Smasher": 67,
            "Number 75: Bamboozling Gossip Shadow": 70,
            "Number 86: Heroic Champion - Rhongomyniad": 31,
            "Number 89: Diablosis the Mind Hacker": 85,
            "Number 90: Galaxy-Eyes Photon Lord": 10,
            "Number 95: Galaxy-Eyes Dark Matter Dragon": 50,
            "Number 97: Draglubion": 100,
            "Number C1: Numeron Chaos Gate Sunya": 10,
            "Number C40: Gimmick Puppet of Dark Strings": 50,
            "Number F0: Utopic Draco Future": 20,
            "Number S0: Utopic ZEXAL": 100,
            "Numbers Eveil": 70,
            "Numeron Calling": 30,
            "Numeron Network": 33,
            "Obedience Schooled": 40,
            "Ohime the Manifested Mikanko": 33,
            "Ojama Duo": 2,
            "Ojama Trio": 3,
            "One Day of Peace": 11,
            "One for One": 91,
            "Onomatopaira": 33,
            "Original Sinful Spoils - Snake-Eye": 100,
            "Outer Entity Azathot": 100,
            "Painful Choice": 95,
            "Phantom Knights' Rank-Up-Magic Force": 1,
            "Phantom of Yubel": 50,
            "Pilgrim Reaper": 50,
            "Planet Pathfinder": 2,
            "Pot of Desires": 20,
            "Pot of Greed": 30,
            "Pot of Prosperity": 40,
            "Powersink Stone": 100,
            "Premature Burial": 25,
            "Preparation of Rites": 5,
            "Pre-Preparation of Rites": 10,
            "Pressured Planet Wraitsoth": 33,
            "Primeval Planet Perlereino": 50,
            "Primite Lordly Lode": 33,
            "Prohibition": 100,
            "Pseudo Space": 3,
            "Psi-Blocker": 61,
            "Psychic End Punisher": 20,
            "PSY-Framegear Delta": 7,
            "PSY-Framegear Epsilon": 7,
            "PSY-Framegear Gamma": 15,
            "PSY-Framelord Omega": 100,
            "Purrely": 15,
            "Purrely Sleepy Memory": 15,
            "Purrelyly": 10,
            "Quick Launch": 33,
            "Raidraptor - Vanishing Lanius": 5,
            "Raigeki": 7,
            "Rank-Up-Magic - The Seventh One": 1,
            "Rank-Up-Magic Admiration of the Thousands": 1,
            "Rank-Up-Magic Argent Chaos Force": 5,
            "Rank-Up-Magic Astral Force": 1,
            "Rank-Up-Magic Barian's Force": 1,
            "Rank-Up-Magic Cipher Ascension": 1,
            "Rank-Up-Magic Doom Double Force": 1,
            "Rank-Up-Magic Limited Barian's Force": 1,
            "Rank-Up-Magic Magical Force": 1,
            "Rank-Up-Magic Numeron Force": 1,
            "Rank-Up-Magic Quick Chaos": 1,
            "Rank-Up-Magic Raid Force": 1,
            "Rank-Up-Magic Raptor's Force": 1,
            "Rank-Up-Magic Revolution Force": 1,
            "Rank-Up-Magic Skip Force": 5,
            "Rank-Up-Magic Soul Shave Force": 5,
            "Rank-Up-Magic Zexal Force": 1,
            "Ra's Disciple": 1,
            "Reasoning": 50,
            "Red Reboot": 50,
            "Red-Eyes Dark Dragoon": 100,
            "Redox, Dragon Ruler of Boulders": 7,
            "Regenesis": 33,
            "Reinforcement of the Army": 40,
            "Rescue-ACE Air Lifter": 10,
            "Rescue-ACE Preventer": 10,
            "Return from the Different Dimension": 50,
            "Return of the Dragon Lords": 7,
            "Rise Rank-Up-Magic Raidraptor's Force": 1,
            "Rite of Aramesir": 5,
            "Ritual Beast Tamer Elder": 10,
            "Rivalry of Warlords": 100,
            "Ronintoadin": 60,
            "Royal Decree": 10,
            "Royal Magical Library": 100,
            "Royal Oppression": 100,
            "Ryzeal Detonator": 20,
            "Ryzeal Duo Drive": 20,
            "Sales Ban": 100,
            "Sangen Kaimen": 50,
            "Sangen Summoning": 100,
            "Sauravis, the Ancient and Ascended": 5,
            "Schwarzschild Infinity Dragon": 33,
            "Secret Village of the Spellcasters": 100,
            "Self-Destruct Button": 100,
            "Sengenjin Wakes from a Millennium": 33,
            "Set Rotation": 33,
            "Shaddoll Schism": 10,
            "Shien's Dojo": 10,
            "Shien's Smoke Signal": 33,
            "Shooting Riser Dragon": 33,
            "Sillva, Warlord of Dark World": 100,
            "Sixth Sense": 65,
            "Skill Drain": 100,
            "Smoke Grenade of the Thief": 87,
            "Snake-Eye Ash": 5,
            "Snake-Eyes Poplar": 5,
            "Snatch Steal": 7,
            "Snoww, Unlight of Dark World": 33,
            "Solemn Judgment": 7,
            "Solemn Strike": 5,
            "Solemn Warning": 5,
            "Songs of the Dominators": 10,
            "Soul Charge": 50,
            "Soul Drain": 100,
            "Speedroid Terrortop": 3,
            "Spell Canceller": 20,
            "Spiritual Beast Tamer Lara": 10,
            "Spright Starter": 20,
            "Stand Up Centur-Ion!": 5,
            "Star Seraph Scepter": 5,
            "Star Seraph Sovereignty": 5,
            "Stardust Sifr Divine Dragon": 1,
            "Starliege Seyfert": 33,
            "Stray Purrely Street": 5,
            "Substitoad": 60,
            "Subterror Guru": 5,
            "Summon Limit": 100,
            "Super Polymerization": 10,
            "Super Starslayer TY-PHON - Sky Crisis": 10,
            "Supreme King Dragon Starving Venom": 1,
            "Swap Frog": 33,
            "Sword Ryzeal": 20,
            "Swordsoul Emergence": 33,
            "Swordsoul Grandmaster - Chixiao": 33,
            "Swordsoul of Mo Ye": 3,
            "Swordsoul Strategist Longyuan": 5,
            "T.G. Hyper Librarian": 33,
            "Tearlaments Havnis": 50,
            "Tearlaments Kitkallos": 50,
            "Tearlaments Merrli": 50,
            "Tearlaments Reinoheart": 50,
            "Tearlaments Scheiren": 50,
            "Telekinetic Charging Cell": 100,
            "Tellarknight Ptolemaeus": 100,
            "Tempest, Dragon Ruler of Storms": 7,
            "Tenpai Dragon Chundra": 50,
            "Tenpai Dragon Genroku": 25,
            "Tenyi Spirit - Ashuna": 33,
            "Terraforming": 33,
            "That Grass Looks Greener": 50,
            "The Black Goat Laughs": 10,
            "The Bystial Lubellion": 30,
            "The Forceful Sentry": 100,
            "The Gates of Dark World": 5,
            "The Hidden City": 33,
            "The Last Warrior from Another Planet": 100,
            "The Melody of Awakening Dragon": 33,
            "The Monarchs Erupt": 50,
            "The Phantom Knights' Rank-Up-Magic Launch": 1,
            "The Tyrant Neptune": 100,
            "The Unstoppable Exodia Incarnate": 20,
            "The Zombie Vampire": 50,
            "There Can Be Only One": 100,
            "Thunder Dragon Colossus": 67,
            "Thunder King Rai-Oh": 20,
            "Tidal, Dragon Ruler of Waterfalls": 7,
            "Toadally Awesome": 20,
            "Tour Guide From the Underworld": 3,
            "Transaction Rollback": 7,
            "Trap Dustshoot": 94,
            "Trap Holic": 7,
            "Traptrix Rafflesia": 10,
            "Triple Tactics Talent": 93,
            "Triple Tactics Thrust": 13,
            "Trishula, Dragon of the Ice Barrier": 3,
            "True King of All Calamities": 100,
            "Tyrant's Tirade": 100,
            "Ultimaya Tzolkin": 100,
            "Union Hangar": 33,
            "Vanity's Emptiness": 100,
            "Vanity's Fiend": 100,
            "Vanity's Ruler": 100,
            "Vanquish Soul Hollie Sue": 10,
            "Varudras, the Final Bringer of the End Times": 20,
            "Virtual World Kyubi - Shenshen": 20,
            "Virtual World Mai-Hime - Lulu": 3,
            "Wandering Gryphon Rider": 20,
            "WANTED: Seeker of Sinful Spoils": 33,
            "Water Enchantress of the Temple": 5,
            "Welcome Labrynth": 33,
            "Wind-Up Carrier Zenmaity": 33,
            "Wind-Up Hunter": 75,
            "Wishes for Eyes of Blue": 33,
            "Witch of the White Forest": 33,
            "Yaguramaru the Armor Ninja": 20,
            "Zaborg the Mega Monarch": 80,
            "Zoodiac Barrage": 33,
            "Zoodiac Broadbull": 66,
            "Zoodiac Drident": 20,
            "Zoodiac Ratpier": 50
        }

        this.allcards.forEach((card) => {
            card.tcg_date = "2200-11-11"
            card.points = points[card.name] === undefined ? 0 : points[card.name]
            if (card.card_sets === undefined) return
            card.card_sets.forEach((set) => {
                const tcg_date = this.allsets.find(
                    (_) => _.set_name === set.set_name
                )?.tcg_date
                // if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
                if (tcg_date !== undefined && card.tcg_date > tcg_date)
                    card.tcg_date = tcg_date
            })
        })
        this.hashAllcards = this.hashGroupBy(this.allcards, "id")

        window.addEventListener("scroll", this.fixDeckContainer, false)
        window.addEventListener("resize", this.fixDeckContainer, false)

        await this.noArchetypes()
    },
    // See Vue Issue: https://github.com/vuejs/vue/issues/1915
    beforeUnmount() {
        window.removeEventListener("scroll", this.fixDeckContainer, false)
        window.removeEventListener("resize", this.fixDeckContainer, false)
    },
    methods: {
        /* BEFORE PAGE */
        async handleFile(e) {
            console.log(e.target.files)
            const file = e.target.files[0]
            this.savedCards = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const file = e.target.result
                    try {
                        resolve(JSON.parse(file))
                    } catch (error) {
                        alert("Errore, seleziona un file valido!\n" + error)
                        resolve([])
                    }
                }
                reader.onerror = (e) => alert(e.target.error.name)
                try {
                    reader.readAsText(file)
                } catch (error) {
                    console.log(error)
                    resolve([])
                }
            })
            this.savedCards.forEach((_) => {
                _.id = +_.id
            })
            this.savedCards.sort((a, b) => a.id - b.id)
            this.recentlySaved = true
        },
        /* NO ARCHETYPES */
        // eslint-disable-next-line require-await
        async noArchetypes(e) {
            /*
            const noArcPool = await this.$axios.$get(
                `https://raw.githubusercontent.com/laaners/ygobox_nuxt/master/server/data/noArcPool.json`
            )
            */


            let flist = await this.$axios.$get(
                "https://raw.githubusercontent.com/ProjectIgnis/LFLists/master/0TCG.lflist.conf"
            )
            flist = []

            /*
            let ris = {}
            cards = Array.from(document.body.querySelectorAll("#tablepress-genesys tbody tr"))
            cards.forEach(_=>{
                const values = Array.from(_.querySelectorAll("td"))
                console.log(values)
                ris[values[0].innerText] = +values[1].innerText
            })
            */

            const noArcPool = this.allcards.map((_) => {
                const fcard = flist.find((e) => e.id === _.id)
                return {
                    id: _.id,
                    copies: fcard === undefined ? 3 : fcard.copies,
                    checked: 0,
                    favourite: false,
                    sets: [""],
                }
            })
            this.savedCards = noArcPool
            this.recentlySaved = true
            this.noArcMode = true

            // {"id":10598400,"copies":3,"checked":0,"favourite":false,"sets":["2023"]}

            this.currentBanlist = []

            this.savedCards.forEach((savedCard) => {
                if (savedCard.copies !== 3) {
                    const toPush = JSON.parse(
                        JSON.stringify(this.hashAllcards[savedCard.id][0])
                    )
                    toPush.status = savedCard.copies
                    this.currentBanlist.push(toPush)
                }
            })
            this.currentBanlist = this.categorySort(this.currentBanlist)

            // await this.$axios.$get(
            //     "https://www.yugioh-card.com/en/genesys"
            // )
            // console.log(flist)


        },
        async randomNoArchetypes() {
            this.noArcLoading = true
            this.savedCards.forEach((_) => {
                _.checked = 0
                // this.updateSearchedCard(_.id, 0)
                // this.updatePackCard(_.id, false)
            })
            this.reloadDeck(this.savedCards)
            // while (this.getExtraDeck().length !== 15) {
            while (this.getMainDeck().length === 0) {
                this.savedCards.forEach((_) => {
                    _.checked = 0
                    // this.updateSearchedCard(_.id, 0)
                    // this.updatePackCard(_.id, false)
                })
                this.reloadDeck(this.savedCards)

                const card = this.pickRandomCard(
                    this.savedCards.map((_) => _.id)
                )

                // const card = this.hashAllcards[21057444][0] // alternate ash
                // const card = this.hashAllcards[2759860][0] // graydle impact, prog

                if (card === undefined) continue

                console.log("--------------")
                console.log(card.name)
                console.log(card.id)
                console.log(card.tcg_date)
                console.log(
                    "https://ygoprodeck.com/api/card/decksFound.php?cardnumber=" +
                    card.id
                )

                let suggestions = {
                    main: [],
                    extra: [],
                    side: [],
                    ydk: "",
                }

                try {
                    suggestions = await this.$axios.$get(
                        `https://ygobox-nuxt-vercel.vercel.app/decksFoundOneGenesys/${card.id}`,
                        // `http://localhost:4000/decksFoundOneGenesys/${card.id}`,
                        {
                            timeout: 5000, // Timeout in milliseconds (10 seconds)
                        }
                    )
                } catch (e) {
                    console.log(e)
                }

                if (suggestions.main.length === 0) {
                    console.log("Ineligible format: " + suggestions.url)
                    continue
                }

                const filtered = [
                    ...suggestions.main,
                    // ...suggestions.side,
                    ...suggestions.extra,
                ]

                this.randomDeckData.deck_name = suggestions.deck_name
                this.randomDeckData.pretty_url = suggestions.url

                for (const initialId of filtered) {
                    let cardId = initialId
                    let savedCard = this.savedCards.find(
                        (_) => +_.id === +cardId
                    )
                    if (savedCard === undefined) {
                        // probably alternate art
                        // find original Id through name
                        const { data } = await this.$axios.get(
                            `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`
                        )
                        if (data.error) continue

                        const cardName = data.data[0].name
                        cardId = this.allcards.find(
                            (_) => _.name === cardName
                        ).id
                        // keep current iteration
                        savedCard = this.savedCards.find(
                            (_) => +_.id === +cardId
                        )
                    }

                    let _ = this.hashAllcards[+cardId]
                    if (_ === undefined) continue
                    _ = _[0]
                    if (
                        (_.type + _.race).includes("Token") ||
                        (_.type + _.race).includes("Skill")
                    )
                        continue

                    savedCard.checked +=
                        savedCard.checked < savedCard.copies ? 1 : 0

                    this.updateSearchedCard(card.id, savedCard.checked)
                    this.reloadDeck(this.savedCards)
                }
            }
            // alert(deckName)
            console.log("Deck url: " + this.randomDeckData.pretty_url)
            this.noArcLoading = false
            this.noArcDeckName = this.randomDeckData.deck_name + ".ydk"
        },
        pickRandomCard(idsList) {
            const random = idsList.sort(() => Math.random() - 0.5)
            for (const id of random) {
                const card = this.hashAllcards[id][0]
                if (
                    card.type !== undefined &&
                    !card.type.includes("Normal Monster") &&
                    card.tcg_date > "2014-01-01"
                )
                    return card
            }
            return undefined

            /*
            while (
                card.type !== undefined &&
                card.type.includes("Normal Monster")
            ) {
                card =
                    this.hashAllcards[
                        idsList[Math.floor(Math.random() * idsList.length)]
                    ][0]
            }
            return card
            */
        },
        addCard(card, level) {
            if (this.getMainDeck().length > 60) return
            if (this.deck.includes(card)) return

            const savedCard = this.savedCards.find((_) => _.id === card.id)

            /*
            const isExtra =
                card.type.includes("XYZ") ||
                card.type.includes("Synchro") ||
                card.type.includes("Fusion") ||
                card.type.includes("Link")

            if (isExtra && savedCard.copies > 0) savedCard.checked = 1
            else if (!isExtra) savedCard.checked = savedCard.copies
            */

            savedCard.checked =
                savedCard.copies === 3
                    ? Math.floor(Math.random() * 3) + 1
                    : savedCard.copies

            this.updateSearchedCard(card.id, savedCard.checked)
            this.reloadDeck(this.savedCards)
        },
        async publishDeck() {
            const name = prompt("Dai un nome a questo deck", this.noArcDeckName)
            if (name === null) {
                return
            }

            const mainDeck = this.getMainDeck()
            const extraDeck = this.getExtraDeck()

            let text = "#main\n"
            mainDeck.forEach((_) => {
                text += _.id + "\n"
            })

            text += "\n#extra\n"

            extraDeck.forEach((_) => {
                text += _.id + "\n"
            })

            await this.$axios.$post(
                "https://ygobox-nuxt-vercel.vercel.app/update_deck",
                {
                    deckName: name.replace(".ydk", ""),
                    ydk: text,
                }
            )

            alert(`Deck "${name.replace(".ydk", "")}" pubblicato con successo`)
            await this.getPublicDecks()
        },
        async getPublicDecks() {
            this.noArcDecks = await this.$axios.$get(
                "https://ygobox-nuxt-vercel.vercel.app/get_decks"
            )
            /*
            this.noArcDecks = [...this.noArcDecks, ...this.noArcDecks]
            this.noArcDecks = [...this.noArcDecks, ...this.noArcDecks]
            this.noArcDecks = [...this.noArcDecks, ...this.noArcDecks]
            this.noArcDecks = [...this.noArcDecks, ...this.noArcDecks]
            */
        },
        loadPublicDeck(e) {
            console.log("LOAD")
            const deckName = e.target.attributes["data-name"].value
            const deck = this.noArcDecks.find((_) => _.deckName === deckName)
            let newDeck = deck.ydk.toString().split("\r\n")
            if (newDeck.length < 2) newDeck = deck.ydk.toString().split("\n")
            newDeck = newDeck
                .filter((_) => _.length > 0 && !isNaN(_))
                .map((_) => {
                    return { id: +_ }
                })
            newDeck = this.hashGroupBy(newDeck, "id")
            this.savedCards.forEach((card) => {
                if (newDeck[card.id] === undefined) card.checked = 0
                else
                    card.checked =
                        newDeck[card.id].length > card.copies
                            ? card.copies
                            : newDeck[card.id].length
                // this.updateSearchedCard(card.id, card.checked)
            })
            this.reloadDeck(this.savedCards)
            console.log("LOAD END")
            this.noArcDeckName = deck.deckName + ".ydk"
            this.randomDeckData = {
                deck_name: "",
                deck_excerpt: "",
                pretty_url: "",
            }
        },
        async deletePublicDeck(deckName) {
            console.log("DELETE")
            await this.$axios.$post(
                "https://ygobox-nuxt-vercel.vercel.app/delete_deck",
                {
                    deckName: deckName.replace(".ydk", ""),
                }
            )
            this.noArcDecks = this.noArcDecks.filter(
                (_) => _.deckName !== deckName
            )
            // await this.getPublicDecks()
            /*
            const deck = this.noArcDecks.find((_) => _.deckName === deckName)
            let newDeck = deck.ydk.toString().split("\r\n")
            if (newDeck.length < 2) newDeck = deck.ydk.toString().split("\n")
            newDeck = newDeck
                .filter((_) => _.length > 0 && !isNaN(_))
                .map((_) => {
                    return { id: +_ }
                })
            newDeck = this.hashGroupBy(newDeck, "id")
            this.savedCards.forEach((card) => {
                if (newDeck[card.id] === undefined) card.checked = 0
                else
                    card.checked =
                        newDeck[card.id].length > card.copies
                            ? card.copies
                            : newDeck[card.id].length
                // this.updateSearchedCard(card.id, card.checked)
            })
            this.reloadDeck(this.savedCards)
            console.log("LOAD END")
            this.noArcDeckName = deck.deckName + ".ydk"
            this.randomDeckData = {
                deck_name: "",
                deck_excerpt: "",
                pretty_url: "",
            }
            */
            console.log("DELETE END")
        },
        /* DECK CONTAINER */
        removeFromDeck(e) {
            if (e?.which === 3) {
                try {
                    const cardId = +e.target.src
                        .split("/")
                    [e.target.src.split("/").length - 1].replace(".jpg", "")
                    const toRemove = this.savedCards.find(
                        (_) => _.id === cardId
                    )
                    if (toRemove !== undefined) {
                        toRemove.checked =
                            toRemove.checked > 0
                                ? toRemove.checked - 1
                                : toRemove.checked
                        this.reloadDeck(this.savedCards)
                        this.updateSearchedCard(cardId, toRemove.checked)
                        this.updatePackCard(cardId, false)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        reloadDeck(newSavedCards) {
            this.deck = []
            newSavedCards.forEach((card) => {
                if (card.checked === 0) return
                for (let i = 0; i < card.checked; i++) {
                    if (this.hashAllcards[card.id] === undefined) continue
                    this.deck.push(this.hashAllcards[card.id][0])
                }
            })

            // console.log("activated reload deck")
            this.deck = this.categorySort(this.deck)
            // console.log("finish sort")
        },
        getMainDeck() {
            return this.deck.filter((card) => {
                const isExtra =
                    card.type.includes("XYZ") ||
                    card.type.includes("Synchro") ||
                    card.type.includes("Fusion") ||
                    card.type.includes("Link")
                return !isExtra
            })
        },
        getExtraDeck() {
            return this.deck.filter((card) => {
                const isExtra =
                    card.type.includes("XYZ") ||
                    card.type.includes("Synchro") ||
                    card.type.includes("Fusion") ||
                    card.type.includes("Link")
                return isExtra
            })
        },
        getPoints() {
            let ris = 0
            // eslint-disable-next-line no-return-assign
            this.deck.forEach(_ => {
                console.log( _.name)
                console.log( +this.hashAllcards[_.id][0].points)
                console.log( this.hashAllcards[_.id][0])
                ris += +this.hashAllcards[_.id][0].points
            })
            return ris
        },
        fixDeckContainer(e) {
            const threshold = this.$el.querySelector(".cardsPack")?.offsetTop
            if (threshold === 0) return
            const deckContainer = this.$el.querySelector(".deck-container")
            if (deckContainer === undefined) return
            //	document.body.querySelector(".deck-container").style
            const setStyle = {
                top: 0,
                marginTop: "var(--header-padding)",
                position: "fixed",
                overflowY: "scroll",
                height: "30%",
                justifyContent: "flex-start",
                backgroundColor: "var(--color-light)",
                paddingRight: "1vw",
                paddingLeft: "1vw",
                zIndex: 9998,
            }
            if (window.scrollY >= threshold) {
                for (const prop of Object.keys(setStyle)) {
                    deckContainer.style[prop.toString()] =
                        setStyle[prop.toString()]
                }
            } else {
                for (const prop of Object.keys(setStyle)) {
                    if (
                        deckContainer === undefined ||
                        deckContainer === null ||
                        deckContainer.style === undefined
                    )
                        return
                    deckContainer.style[prop.toString()] = ""
                }
            }
        },
        getLimitImage(id) {
            const banlistCard = this.currentBanlist.find((_) => _.id === id)
            if (banlistCard !== undefined && banlistCard.status !== 3)
                return `/ygobox_nuxt_static/0${banlistCard.status}lim.png`
            return ""
        },
        /* BUTTONS FOR YDK AND EXPORTING */
        saveDeck() {
            const mainDeck = this.getMainDeck()
            if (this.draftMode) {
                if (mainDeck.length < 20)
                    return alert("Scegli almeno 20 carte!")
            } else if (mainDeck.length < 40 || mainDeck.length > 60)
                return alert("Scegli tra 40 e 60 carte!")
            const extraDeck = this.getExtraDeck()
            if (extraDeck.length >= 16 && !this.draftMode)
                return alert("Troppe carte in extra deck!")

            const copies = this.hashGroupBy(mainDeck.concat(extraDeck), "name")
            if (!this.draftMode)
                for (const name in copies) {
                    if (copies[name].length > 3)
                        return alert(`"${name}" presente in 4+ copie!`)
                    const banlistCard = this.currentBanlist.find(
                        (_) => _.name === name
                    )
                    if (
                        banlistCard !== undefined &&
                        copies[name].length > banlistCard.status
                    )
                        return alert(
                            `Deck non valido, "${name}" è a ${banlistCard.status}!`
                        )
                }

            let text = "#main\n"
            mainDeck.forEach((_) => {
                text += _.id + "\n"
            })
            // text += "300104005" //	Switcheroo
            // text += "\n511002116"; //Orichalcum

            text += "\n#extra\n"

            extraDeck.forEach((_) => {
                text += _.id + "\n"
            })

            if (!this.noArcMode) {
                this.download("0Deck.ydk", text)
                if (!this.draftMode)
                    this.download(
                        "00SavedCards.json",
                        JSON.stringify(this.savedCards)
                    )
            } else {
                this.download(this.noArcDeckName, text)
            }
            this.reloadDeck(this.savedCards)
            this.recentlySaved = true
            this.packAppendCards = []
        },
        resetDeck() {
            if (confirm("Sei sicuro di voler resettare il deck?")) {
                if (confirm("Vuoi mantenere l'extra?")) {
                    this.savedCards
                        .filter((_) => _.checked > 0)
                        .forEach((savedCard) => {
                            const card = this.hashAllcards[savedCard.id][0]
                            const isExtra =
                                card.type.includes("XYZ") ||
                                card.type.includes("Synchro") ||
                                card.type.includes("Fusion") ||
                                card.type.includes("Link")
                            if (!isExtra) {
                                this.savedCards.find(
                                    (_) => _.id === savedCard.id
                                ).checked = 0
                                this.updateSearchedCard(savedCard.id, 0)
                                this.updatePackCard(savedCard.id, false)
                            }
                        })
                } else {
                    this.savedCards.forEach((_) => {
                        _.checked = 0
                        this.updateSearchedCard(_.id, 0)
                        this.updatePackCard(_.id, false)
                    })
                }
                this.reloadDeck(this.savedCards)
            }
        },
        async uploadDeck(e) {
            console.log("upload new deck")
            if (!this.recentlySaved) {
                alert(
                    "NON PUOI CARICARE UN DECK SE NON HAI SALVATO DI RECENTE, SALVA E RICARICA LA PAGINA"
                )
                return false
            }
            const file = e.target.files[0]
            await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const file = e.target.result
                    try {
                        let newDeck = file.toString().split("\r\n")
                        if (newDeck.length < 2)
                            newDeck = file.toString().split("\n")
                        newDeck = newDeck
                            .filter((_) => _.length > 0 && !isNaN(_))
                            .map((_) => {
                                return { id: +_ }
                            })
                        newDeck = this.hashGroupBy(newDeck, "id")
                        console.log(newDeck)
                        this.savedCards.forEach((card) => {
                            if (newDeck[card.id] === undefined) card.checked = 0
                            else
                                card.checked =
                                    newDeck[card.id].length > card.copies
                                        ? card.copies
                                        : newDeck[card.id].length
                            this.updateSearchedCard(card.id, card.checked)
                        })
                        this.reloadDeck(this.savedCards)
                    } catch (error) {
                        console.log(error)
                        alert("Errore, seleziona un file valido!\n" + error)
                        resolve([])
                    }
                }
                reader.onerror = (e) => alert(e.target.error.name)
                try {
                    reader.readAsText(file)
                } catch (error) {
                    console.log(error)
                    resolve([])
                }
            })
        },
        /* FORM */
        bindFavouriteCards(e) {
            if (e.target.checked) {
                this.$refs.searchForm.form.favouriteCards = this.savedCards
                    .filter((_) => _.favourite)
                    .map((_) => _.id)
            } else {
                this.$refs.searchForm.form.favouriteCards = []
            }
        },
        bindSelectedSet(e) {
            this.$el.querySelector(".search-form-component").__vue__.form.pack =
                e.target.value
            const x = true
            if (x) return
            const pack = e.target.value.replace(
                e.target.value.split(" ")[0] + " ",
                ""
            )
            this.$el.querySelector(".search-form-component").__vue__.form.pack =
                pack.includes("(OCG)") ? "(OCG)" + pack.split("(OCG)")[1] : pack
        },
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
                    Math.ceil(this.searchedCards.length / this.cardsPerPage)
                ) {
                    alert("Inserisci un numero valido!")
                    return
                }
                this.index = +value - 1
            }
        },
        updateSearchedCard(cardId, checked) {
            const searchResults = this.$el.querySelector(".search-results")
            if (searchResults === undefined || searchResults === null) return
            const toUpdate = searchResults.__vue__.$slots.default.find(
                (slot) => slot.componentOptions.propsData.card.id === cardId
            )
            if (toUpdate === undefined || toUpdate === null) return
            toUpdate.componentInstance.checked = checked
        },
        /* PACK */
        async drafting() {
            if (!this.recentlySaved) {
                alert(
                    "NON PUOI APRIRE UN ALTRO PACCHETTO SE NON HAI SALVATO DI RECENTE"
                )
                return false
            }
            this.packLoading = true
            this.searchedCards = []
            const set_name = this.$refs.openPack.value
            if (!set_name) {
                alert("Empty set name")
                this.packLoading = false
                return
            }
            let { pack_img, cards, draftN, packN, setNameCorrect } = this
                .draftMode
                ? await this.$axios.$get(
                    `api/drafting/${set_name}_=_draft_mode`
                )
                : await this.$axios.$get(`api/drafting/${set_name}`)

            //	this.$refs.packImg.src = pack_img

            if (cards.length === 0) {
                if (set_name.toLowerCase().includes("card:")) {
                    const cardTmp = this.allcards.find(
                        (_) =>
                            _.name.toLowerCase() ===
                            set_name.toLowerCase().replace("card:", "")
                    )
                    if (cardTmp !== undefined) {
                        const singleCard = await this.$axios.$get(
                            `api/card/${cardTmp.id}`
                        )
                        const card_set = singleCard.rarity
                        pack_img =
                            "/sets/" + card_set.set_code.split("-")[0] + ".jpg"
                        cards = [singleCard, singleCard, singleCard]
                        draftN = 1
                        packN = 1
                        setNameCorrect = `${card_set.tcg_date} ${card_set.set_name}`
                        this.openedSet = {
                            set_name: card_set.set_name,
                            set_code: card_set.set_code.split("-")[0],
                            num_of_cards: 3,
                            tcg_date: card_set.tcg_date,
                        }
                    } else {
                        alert(pack_img)
                        this.packLoading = false
                        return
                    }
                } else {
                    alert(pack_img)
                    this.packLoading = false
                    return
                }
            } else {
                this.openedSet = this.allsets.find(
                    (_) => _.set_name.toLowerCase() === set_name.toLowerCase()
                )
            }
            this.packAppendCards = cards
                .sort((a, b) => {
                    const setCodeA = a.rarity.set_code
                    const setCodeB = b.rarity.set_code
                    if (setCodeA < setCodeB) return -1
                    if (setCodeA > setCodeB) return 1
                    return 0
                })
                .sort((a, b) => a.rarity.percentage - b.rarity.percentage)
            this.packAppendCards.forEach((card) => {
                const elem = this.savedCards.find((_) => _.id === card.id)
                if (elem !== undefined) {
                    elem.copies += 1
                    if (!elem.sets.includes(setNameCorrect))
                        elem.sets.push(setNameCorrect)
                    if (this.draftMode) {
                        elem.checked += 1 // elem.checked >= 3 ? 0 : 1
                        this.updateSearchedCard(card.id, elem.checked)
                        this.updatePackCard(card.id, true)
                    }
                } else {
                    this.savedCards.push({
                        id: card.id,
                        copies: 1,
                        checked: this.draftMode ? 1 : 0,
                        favourite: false,
                        sets: [setNameCorrect],
                    })
                    this.updateSearchedCard(card.id, 1)
                    this.updatePackCard(card.id, true)
                }
            })

            this.$refs.packInfo.innerHTML =
                packN +
                " carte diverse nel pacchetto\nSe apri il pacchetto avrai " +
                draftN +
                " carte a caso tra queste:"
            this.packLoading = false
            this.recentlySaved = false
        },
        getFavouriteStyle(cardId) {
            if (this.savedCards.find((_) => _.id === cardId).favourite)
                return {
                    fill: "orange",
                }
            return {
                fill: "var(--color-darker)",
            }
        },
        addToDeck(e) {
            setTimeout(() => {
                const cardId = e.target.value
                const elem = this.savedCards.find((_) => _.id === +cardId)
                if (e.target.checked) elem.checked += 1
                else elem.checked -= 1
                this.updateSearchedCard(+cardId, elem.checked)
                this.reloadDeck(this.savedCards)
            }, 10)
        },
        updatePackCard(cardId, value) {
            const checkboxes = this.$el.querySelectorAll(
                `input[value='${cardId}']`
            )
            if (checkboxes.length !== 0) {
                if (value) {
                    for (const checkbox of checkboxes) {
                        if (!checkbox.checked) {
                            checkbox.checked = true
                            return
                        }
                    }
                } else {
                    for (const checkbox of checkboxes) {
                        if (checkbox.checked) {
                            checkbox.checked = false
                            return
                        }
                    }
                }
            }
        },
    },
}
</script>

<style scoped>
.public-deck {
    /* border: 2px solid var(--color-darker); */
    border-radius: var(--border-radius);
    background-color: var(--color-darker);
    opacity: 0.5;
}

.public-deck>* {
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: var(--space-0);
}

.public-deck h4 {
    cursor: pointer;
}

.after-page {
    align-items: flex-start;
}

.deck-container {
    width: 50%;
    padding-top: 2%;
    margin-right: var(--space-1);
}

.deck-container>* {
    margin: 0;
}

.deck-container h3 {
    margin: var(--space-0);
}

.form-container {
    width: 40%;
}

.form-container>* {
    margin: 0;
}

.search-form {
    width: 100%;
    overflow-x: hidden;
    justify-content: flex-start;
    transition: all 0.2 linear;
    margin-bottom: 0;
}

.search-form>>>button {
    display: none;
}

.search-form div {
    margin: 0;
}

.search-results {
    margin-top: var(--space-1);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.form-container>>>.link-markers-grid {
    width: 25% !important;
}

.pack-section>* {
    margin-top: var(--space-0);
    margin-bottom: var(--space-0);
}

#pack-img {
    width: var(--pack-width);
}

.visible-pack>* {
    margin-top: var(--space-0);
    margin-bottom: var(--space-0);
}

.visible-pack h3 {
    text-align: center;
    white-space: pre-line;
}

.pack-card-checkbox-star>* {
    width: var(--font-size-h2);
    height: var(--font-size-h2);
}

.pack-card-checkbox-star>>>svg {
    cursor: pointer;
}
</style>
