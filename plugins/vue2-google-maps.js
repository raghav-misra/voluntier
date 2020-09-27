import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.MAPS_JS_KEY
    },
    installComponents: true
})