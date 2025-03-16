<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
    <div class="flex-col">
        <div v-if="proposals.length === 0" class="loader" style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
				margin-top: var(--space-1) !important;
			"></div>
        <div v-else class="flex-col" style="width: 100%">
            <div v-if="user.length < 1" class="flex-col" style="width: 40%; margin-bottom: 10%">
                <h1>Tu sei:</h1>
                <grid-view :columns="1" :row-gap="3" :col-gap="3" style="width: 100%">
                    <button-secondary v-for="u of users" :key="u" :title="u" style="font-size: 24px"
                        @click.native="user = u" />
                </grid-view>
            </div>
            <div v-else class="flex-col" style="width: 100%">
                <form class="flex-col" @submit.prevent="sendProposal()">
                    <h1 style="text-align: center;">Proponi qualcosa qua (proponi una cosa alla volta!):</h1>
                    <textarea v-model="form.proposal" class="make-proposal" name="proposal"></textarea>
                    <button-secondary :title="'INVIA'" style="font-size: 18px" type="submit" />
                </form>

                <div v-for="proposal of proposals" :key="proposal.id" class="proposal-container">
                    <p class="description">{{ proposal.description }}</p>
                    <p class="approvers">
                        Votato da:
                        <span v-if="proposal.votes.length > 0">
                            {{
                                proposal.votes
                            }}
                        </span>
                        <span v-else>-</span>
                    </p>
                    <div class="footer">
                        <p class="author">Proposto da: {{ proposal.author }}</p>
                        <p class="votes" @click="voteUnvote(proposal)">
                            {{ proposal.votes.length }}
                            <span>
                                <svg id="like-svg" xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                                    viewBox="0 0 24 24" :fill="proposal.votes.includes(user)
                                        ? 'red'
                                        : 'black'
                                        ">
                                    <path
                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GridView from "../components/GridView.vue";
import ButtonSecondary from "../components/ButtonSecondary.vue";
import Utils from "~/mixins/utils";

export default {
    name: "RemoteLocal",
    // eslint-disable-next-line vue/no-unused-components
    components: {
        GridView,
        ButtonSecondary,
    },
    mixins: [Utils],
    layout: "default_remote",
    data: () => ({
        user: "",
        users: [
            "Alessio",
            "Curry",
            "Fabian",
            "Edoardo",
            "Fede",
            "Giorgio",
            "Ignazio",
            "Luiso",
            "Riccardo",
            "Richard",
            "Stefano",
            "Yu",
        ],
        proposals: [],
        form: {
            proposal: "",
        },
        // apiPoint: "http://localhost:4000"
        apiPoint: "https://ygobox-nuxt-vercel.vercel.app"
    }),
    watch: {},
    async mounted() {
        this.proposals = await this.$axios.$get(
            this.apiPoint + "/get_proposals"
        );
        this.proposals.sort((a, b) => b.votes.length - a.votes.length)
        console.log(this.proposals.map(_ => _.description))
    },
    methods: {
        async sendProposal() {
            // console.log(this.form.proposal)
            const id = new Date().getTime().toString();
            await this.$axios.$post(
                this.apiPoint + "/update_proposal",
                {
                    id,
                    author: this.user,
                    description: this.form.proposal,
                    votes: [this.user],
                }
            );

            this.proposals = await this.$axios.$get(
                this.apiPoint + "/get_proposals",
            );
            this.proposals.sort((a, b) => b.votes.length - a.votes.length)
        },
        async voteUnvote(proposal) {
            proposal.votes.includes(this.user);
            await this.$axios.$post(
                this.apiPoint + "/update_proposal",
                {
                    id: proposal.id,
                    author: proposal.user,
                    description: proposal.description,
                    votes:
                        proposal.votes.includes(this.user)
                            ? proposal.votes.filter((_) => _ !== this.user)
                            : [...proposal.votes, this.user],
                }
            );

            this.proposals = await this.$axios.$get(
                this.apiPoint + "/get_proposals",
            );
            this.proposals.sort((a, b) => b.votes.length - a.votes.length)
        },
    },
};
</script>

<style scoped>
form {
    width: 60%;
}

.make-proposal {
    width: 100%;
    background-color: lightgray;
    border: 1px solid #ddd;
    padding: 16px;
    padding-bottom: 0px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;

    height: 100px;
    resize: none;
}

h1 {
    font-size: 24px;
}

.flex-col>* {
    margin: var(--space-0);
}

table,
th,
td {
    border: 1px solid #dddddd;
    border-collapse: collapse;
}

th {
    width: 50px;
}

td {
    width: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    white-space: pre;
}

table {
    overflow-x: scroll;
    margin-left: auto;
    margin-right: auto;
}

.submit-table-container {
    overflow-x: scroll;
    width: 80%;
}

.submit-table-container table {
    width: 100%;
    margin: 0;
}

.submit-table-container table td {
    cursor: pointer;
}

/*Proposals ----------------------------------------*/

.proposal-container {
    border: 1px solid #ddd;
    padding: 16px;
    padding-bottom: 0px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
    width: 90%;
}

.description,
.approvers,
.approvers span {
    font-size: 16px;
    margin-bottom: 0px;
}

.description {
    white-space: pre-line
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.votes {
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: bolder;

    cursor: pointer;

    margin: 0;
}

.author {
    font-size: 18px;
    font-weight: bolder;
}
</style>
