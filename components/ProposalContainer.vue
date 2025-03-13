<template>
	<div class="proposal-container">
		<p class="description">{{ description }}</p>
		<div class="footer">
			<h3 class="author">Proposto da: {{ author }}</h3>
			<div class="votes">
				<h2>{{ votes }}⬆</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProposalContainer",
	props: {
		author: { required: true, type: String },
		description: { required: true, type: String },
		votes: { required: true, type: Number },
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
	border-radius: 8px;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
	margin-bottom: 12px;
	width: 90%;
}

.description {
	font-size: 16px;
	margin-bottom: 8px;
}

.footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.votes {
	display: flex;
	align-items: center;
}

button {
	margin-right: 8px;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 16px;
}
</style>
