<template>
	<header
		class="page-header"
		:class="{ 'header-collapse-active': isMenuActive }"
	>
		<nav class="container header-grid">

			<div id="header-nav" class="header-nav">
				<ul
					class="nav-list nav-collapse"
					:class="{ 'nav-collapse-active': isMenuActive }"
				>
					<li
						v-for="(item, index) in navItems"
						:key="index"
						class="nav-link"
					>
						<nuxt-link
							class="nuxt-link"
							:to="item.uri"
							@click.native="isMenuActive = false"
							>{{ item.name }}</nuxt-link
						>
					</li>
				</ul>
			</div>
			<button
				class="nav-menu"
				aria-label="toggle menu"
				aria-controls="heaver-nav"
				:aria-expanded="String(isMenuActive)"
				@click="isMenuActive = !isMenuActive"
			>
				<menu-icon v-show="!isMenuActive" />
				<x-icon v-show="isMenuActive" />
				<!--
				<h1 style="color: var(--color-light); margin: var(--space-1)">
					{{ isMenuActive ? "Close" : "Menu" }}
				</h1>
				-->
			</button>
		</nav>
	</header>
</template>

<script>
import MenuIcon from "./icons/MenuIcon.vue"
import XIcon from "./icons/XIcon.vue"
export default {
	name: "PageHeaderRemote",
	components: { XIcon, MenuIcon,  },
	data: () => ({
		isMenuActive: false,
		navItems: [
			// { uri: "/deck_editor", name: "Il tuo Deck" },
			// { uri: "/banned_cards", name: "Carte Bandite" },
			// { uri: "/proposals", name: "Regole Spicy" },
			{ uri: "/remote_rounds", name: "Turni" },
			{ uri: "/remote_availabilities", name: "Orari dei Partecipanti" },
			// { uri: "/archetypes", name: "Archetipi" },
			// { uri: "/banlist", name: "Tutte le banlist" },
			/* { uri: "/guess_card", name: "Indovina la Carta" }, */
			// { uri: "/concept_arts", name: "Concept Arts" },
			// { uri: "/trivia_graph", name: "Trivia" },
		],
	}),
	head: () => ({
		meta: [
			{
				name: "theme-color",
				content: "#d6d6b1",
			},
		],
	}),
	methods: {
		invertColors() {
			const r = document.querySelector(":root")
			// Get the styles (properties and values) for the root
			const rs = getComputedStyle(r)
			// Alert the value of the --blue variable
			/*
				--color-light-transparent: rgba(255, 255, 255, 0.33);
	--color-light: white;
	--color-neutral: #f1f1f1;
	--color-dark: #403b2a;
	--color-darker: #222222;
			*/
			const lightTransparent = rs.getPropertyValue(
				"--color-light-transparent"
			)
			const light = rs.getPropertyValue("--color-light")
			const dark = rs.getPropertyValue("--color-dark")
			const darker = rs.getPropertyValue("--color-darker")

			r.style.setProperty("--color-light-transparent", dark)
			r.style.setProperty("--color-light", darker)
			r.style.setProperty("--color-dark", lightTransparent)
			r.style.setProperty("--color-darker", light)
		},
	},
}
</script>

<style>
.page-header {
	position: fixed;
	width: 100%;
	height: var(--header-padding);
	background-color: var(--color-darker);
	z-index: 1000;
}

.header-grid {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas:
		"title menu"
		"nav nav";
}
.header-title {
	align-self: center;
	grid-area: title;
	margin-left: var(--space-0);
}
.header-title h1 {
	font-size: var(--font-size-header-title);
	color: var(--color-light);
	margin: 0;
}
.header-title a {
	display: block;
	text-decoration: none;
}
.header-nav {
	font-size: var(--font-size-h4);
	align-self: center;
	grid-area: nav;
}

.nav-menu {
	display: flex;
	align-self: center;
	grid-area: menu;
	background: none;
	border: none;
	padding: 0;
	height: var(--font-size-h1);
	color: var(--color-dark);
	font-family: var(--font-family-body);
	font-size: var(--font-size-header-menu);
}
.nav-menu svg {
	margin-top: 2px;
}
.nav-menu svg,
.nav-menu span {
	align-self: center;
}

.nav-menu > * {
	color: var(--color-light);
	margin-right: var(--space-1);
}

.nav-list {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}
.nav-link {
	display: block;
	margin-top: var(--space-0);
}
.nav-link a {
	display: block;
	padding: 0;
	text-decoration: none;
	color: var(--color-light);
}
.nav-link .nuxt-link-active {
	color: var(--color-light-transparent);
	text-decoration: underline;
}
.nav-collapse {
	display: none;
}
.nav-collapse-active {
	display: block;
}
.header-collapse-active {
	display: block;
	position: sticky;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
}
.header-collapse-active .header-grid {
	border-bottom: 0;
}

.nuxt-link {
	margin-left: var(--space-1);
	margin-right: var(--space-1);
	font-size: var(--font-size-h3);
}

@media screen and (min-width: 840px) {
	.header-grid {
		flex-flow: row;
		height: 100%;
		grid-template-columns: 1fr auto;
		grid-template-areas: "title nav";
	}
	.nav-menu {
		display: none;
	}
	.nav-collapse {
		display: block;
	}
	.header-collapse-active {
		display: block;
		position: relative;
		height: auto;
		width: auto;
		background-color: var(--color-darker);
		top: auto;
		left: auto;
	}
	.nav-link {
		margin: 0;
		display: inline-block;
	}
	.nav-link a {
		padding: var(--space-0);
	}
	.nav-link a:hover,
	.nav-link a:focus {
		color: var(--color-light-transparent);
	}
	.nav-link .nuxt-link-active {
		text-decoration: none;
		font-weight: bolder;
	}

	.nuxt-link {
		margin-left: 0;
		margin-right: 0;
		font-size: var(--font-size-h4);
	}
}
</style>
