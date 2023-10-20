<template>
	<div class="grid-container" :style="gridAttributes()">
		<slot />
	</div>
</template>

<script>
export default {
	name: "GridView",
	props: {
		columns: {
			type: Number,
			required: true,
		},
		rowGap: {
			type: Number,
			required: true,
		},
		colGap: {
			type: Number,
			required: true,
		},
	},
	methods: {
		gridAttributes() {
			return {
				gridTemplateColumns: `repeat(${this.columns}, ${
					(100 - (this.columns - 1) * this.colGap) / this.columns
				}%)`,
				gridRowGap: this.rowGap + "%",
				gridColumnGap: this.colGap + "%",
			}
		},
	},
}
</script>

<style scoped>
.grid-container {
	display: grid;
}
</style>
