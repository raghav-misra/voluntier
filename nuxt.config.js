export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Target (https://go.nuxtjs.dev/config-target)
    target: "static",

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: "VolunTier",
        meta: [{
                charset: "utf-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: ""
            }
        ],
        link: [{
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap"
            }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        "@/assets/global.css"
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/buefy
        "nuxt-buefy",
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
    ],

    pageTransition: "page",

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    env: {
        BASE_URL: process.env.NODE_ENV !== "production" ?
            "http://localhost:8888/.netlify/functions" : "https://voluntier.netlify.app/.netlify/functions",
        IDENTITY_URL: "https://voluntier.netlify.app/.netlify/identity",
    }
}