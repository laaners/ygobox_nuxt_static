<!-- eslint-disable vue/multi-word-component-names -->
<!-- This Layout will be applied by default to all pages -->
<!--
<template>
	<div class="wrapper">
		<div class="content">
			<main class="container">
				<nuxt />
			</main>
		</div>
	</div>
</template>
-->
<template>
	<div>
		<nuxt class="main" />
	</div>
</template>

<script>
export default {
	layout: "empty",
}
</script>

<style>
body {
	font-family: var(--font-family-body);
	background: var(--color-light);
	color: var(--color-darker);
	margin: 0;

	/*
	font-size: var(--font-size-body);
	 background-color: var(--color-dark);
	margin: 0;
	*/
}

.main {
	padding-bottom: var(--header-padding);
}

@media screen and (min-width: 840px) {
	.main {
		padding-bottom: var(--header-padding);
	}
}
</style>
