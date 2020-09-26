<template>
    <div class="section"> 
        <form 
            v-if="authType === `signup`" 
            @submit.prevent="triggerSignup" 
            class="signup-form"
        >
            <h1 class="title">Signup</h1>

            <div class="container">
                <b-field label="Email Address">
                    <b-input v-model="email" type="email" />
                </b-field>

                <b-field label="Password">
                    <b-input v-model="password" type="password" />
                </b-field>

                <b-button type="is-success" native-type="submit">
                    Create your account!
                </b-button>
            </div>
        </form>

        <form 
            v-if="authType === `login`" 
            @submit.prevent="triggerLogin" 
            class="signup-form"
        >
            <h1 class="title">Login</h1>

            <div class="container">
                <b-field label="Email Address">
                    <b-input v-model="email" type="email" />
                </b-field>

                <b-field label="Password">
                    <b-input v-model="password" type="password" />
                </b-field>

                <b-button type="is-success" native-type="submit">
                    Login
                </b-button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import GoTrue from "gotrue-js";
import { ToastProgrammatic as Toast } from "buefy";

export default Vue.extend({
    data() {
        return {
            email: "",
            password: ""
        }
    },

    computed: {
        authType() { return this.$route.params.type; },
        auth(): GoTrue { return this.$store.state.auth; }
    },

    methods: {
        async triggerSignup() {
            try {
                const user = await this.auth.signup(this.email, this.password);
                Toast.open('Confirmation email sent! Login after confirming');
                setTimeout(() => this.$router.push("/auth/signup"), 500);
            }

            catch (e) {
                Toast.open("Error, try again " + e);
            }
        },

        async triggerLogin() {
            try {
                const identity = await this.auth.login(this.email, this.password);
                Toast.open("Login successful.");
                console.log("Identity:", identity);
                
                const dbUser = await this.$axios;
            }
            catch (_e) {
                const error = `${_e}`;
                console.log(error)
                if(error.includes("Email not confirmed"))
                    Toast.open("Your Email Is Not Verifed");
                else if(error.includes("No user found with that email, or password invalid"))
                    Toast.open("Unknown Password/Email");
                else
                    Toast.open("Unknown Error");
            }
        }
    }
});
</script>

<style scoped>

</style>