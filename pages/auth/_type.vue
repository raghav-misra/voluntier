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
			class="login-form"
		>
			
			<h1 class="title">Login</h1>
			

			<div class="container">
				<div class="columns is-gapless">

					<div class="column">
						<img src=~assets/loginimage.jpg alt=loginimage>
					</div>

					<div class="column">
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
					

				</div>

				
				
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import GoTrue from "gotrue-js";
import { ToastProgrammatic as Toast } from "buefy";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},

	computed: {
		authType() {
			return this.$route.params.type;
		},
		auth() {
			return this.$store.state.auth;
		},
	},

	methods: {
		async triggerSignup() {
			try {
				const user = await this.auth.signup(this.email, this.password);
				Toast.open("Confirmation email sent! Login after confirming");
				this.$router.push("/auth/signup");
			} catch (e) {
				Toast.open("Error, try again " + e);
			}
		},

		async triggerLogin() {
			try {
                // Get identity:
				const userIdentity = await this.auth.login(
					this.email,
					this.password
                );
                console.log("User Identity:", userIdentity);
                
				
                // Get data:
				const userData = await this.$axios(`${process.env.BASE_URL}/get-user`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${userIdentity.token.access_token}`,
					},
                });
                console.log("User Data:", userData);

                // Save to store:
                this.$store.commit("SET_USER_IDENTITY", userIdentity);
                userData.data.success &&
                    this.$store.commit("SET_USER_DATA", userData);

                Toast.open("Login successful.");

                this.$router.push(userData.data.success ? 
                    "/user" : 
                    "/onboarding"
                );
			} catch (_e) {
				const error = `${_e}`;
				console.log(error);
				if (error.includes("Email not confirmed"))
					Toast.open("Your Email Is Not Verifed");
				else if (
					error.includes(
						"No user found with that email, or password invalid"
					)
				)
					Toast.open("Unknown Password/Email");
				else Toast.open("Unknown Error");
			}
		},
	},
};
</script>

<style scoped>

.section {
  width:100vw;
  height:100vh;
  background-image: url('~assets/loginbackground.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

}

.login-form .container{
	margin-top: 10rem;
	width: 300px;
}

.login-form .container .columns {
	
}


</style>