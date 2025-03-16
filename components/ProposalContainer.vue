<template>
	<div class="proposal-container">
		<p class="description">{{ description }}</p>
		<p class="approvers">Votato da:
			<span v-if="votes.length > 0">
				{{ votes.slice(0, -1).join(',') + votes.slice(-1) }}
			</span>
			<span v-else>-</span>
		</p>
		<div class="footer">
			<p class="author">Proposto da: {{ author }}</p>
			<p class="votes" @click="upvote()">{{ votes.length }}⬆</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProposalContainer",
	props: {
		author: { required: true, type: String },
		description: { required: true, type: String },
		votes: { required: true, type: Object },
	},
	methods: {
		upvote() {
			this.$emit("update:votes", this.votes + 1);
		},
	},
};
</script>

<style scoped>
.proposal-container {
	border: 1px solid #ddd;
	padding: 16px;
	padding-bottom: 0px;
	border-radius: 8px;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
	margin-bottom: 12px;
	min-width: 90%;
}

.description,
.approvers {
	font-size: 16px;
	margin-bottom: 0px;
}

.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.votes {
	display: flex;
	align-items: center;
	font-size: 24px;
	font-weight: bolder;

	cursor: pointer;

	margin: 0;
}

.author {
	font-size: 18px;
	font-weight: bolder;
}

button {
	margin-right: 8px;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 16px;
}
</style>
