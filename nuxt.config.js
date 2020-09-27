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
            },
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
            }

        ],
        script: [
            { src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js" }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        "@/assets/global.css"
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ["@/plugins/vuesax.js", "@/plugins/vue2-google-maps.js", "@/plugins/vue-chartkick.js", "@/plugins/v-calendar.js"],

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
    build: {
        transpile: [/^vue2-google-maps($|\/)/]
    },

    env: {
        BASE_URL: process.env.NODE_ENV !== "production" ?
            "http://localhost:8888/.netlify/functions" : "https://voluntier.netlify.app/.netlify/functions",
        IDENTITY_URL: "https://voluntier.netlify.app/.netlify/identity",
        MAPS_JS_KEY: "AIzaSyAjh8lpH_ydhtY7Vs0Un35E-he0GT9IOog"
    }
}