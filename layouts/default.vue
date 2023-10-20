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
		<page-header />
		<nuxt class="main" />
	</div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue"
export default {
	// eslint-disable-next-line vue/no-unused-components
	components: { PageHeader },
	layout: "default",
}
</script>

<style>
body {
	font-family: var(--font-family-body);
	background: var(--color-light);
	color: var(--color-darker);
	margin: 0;
	/* width: 200% */

	/*
	font-size: var(--font-size-body);
	 background-color: var(--color-dark);
	margin: 0;
	*/
}

.main {
	padding-top: var(--header-padding);
	padding-bottom: var(--header-padding);
}

@media screen and (min-width: 840px) {
	.main {
		padding-top: var(--header-padding);
		padding-bottom: var(--header-padding);
	}
}
</style>
