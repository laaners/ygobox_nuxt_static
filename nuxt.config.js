export default {
	telemetry: false,
	// Global page headers: https://go.nuxtjs.dev/config-head
	ssr: true,
	target: "static",
	/*
	server: {
		port: 3000, // default: 3000
		host: "0.0.0.0", // default: localhost
	},
	*/
	serverMiddleware: [
		{
			path: "/api",
			handler: "~/server/api.js",
		},
		/*
		{
			path: "/ws",
			handler: "~/server/ws.js",
		},
		*/
	],
	head: {
		title: "YGOBox-Nuxt",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" },
		],
		link: [
			{
				rel: "icon",
				type: "image/x-icon",
				href: "https://ms.yugipedia.com/6/64/Favicon.ico",
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["@/assets/styles/main.css"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [{ src: "~/plugins/utils.js" }],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		"@nuxtjs/axios",
		"nuxt-clipboard",
		["nuxt-clipboard", { autoSetContainer: true }],
	],

	clipboard: {
		autoSetContainer: true,
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			config.module.rules.push({
				enforce: "pre",
				test: /\.txt$/,
				loader: "raw-loader",
				exclude: /(node_modules)/,
			})
		},
	},

	axios: {
		//	baseURL: `${process.env.HEROKU_HOSTNAME ?? "http://localhost:3000"}`,
		baseURL: `${
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: "https://ygobox-nuxt.fly.dev"
		}`,
	},

	render: {
		fallback: false,
	},

	static: {
		prefix: false,
	},
}
