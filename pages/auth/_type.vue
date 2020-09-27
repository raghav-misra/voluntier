<template>
	<div class="auth-page">
		<form
			v-if="authType === `signup`"
			@submit.prevent="triggerSignup"
			class="login-form is-signup section"
		>
			<h1 class="main-head title is-1 has-text-centered">Signup</h1>
			<br /><br />

			<div class="container">
				<div class="columns $column-gap=1rem">
					<div class="column">
						<img src="~/assets/volunteer.png" alt="loginimage" />
					</div>

					<div class="column">
						<div class="column2">
							<h1 class="title is-2">Let's Get Going!</h1>

							<b-field label="Email Address">
								<b-input v-model="email" type="email" />
							</b-field>

							<b-field label="Password">
								<b-input v-model="password" type="password" />
							</b-field>

							<b-button type="is-success" native-type="submit">
								Create an account
							</b-button>
						</div>
					</div>
				</div>
			</div>
		</form>

		<form
			v-if="authType === `login`"
			@submit.prevent="triggerLogin"
			class="login-form is-login section"
		>
			<h1 class="main-head title is-1 has-text-centered">Login</h1>
			<br /><br />

			<div class="container">
				<div class="columns $column-gap=1rem">
					<div class="column">
						<img src="~/assets/volunteer.png" alt="loginimage" />
					</div>

					<div class="column">
						<div class="column2">
							<h1 class="title is-2">Welcome Back!</h1>

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
			</div>
		</form>
	</div>
</template>

<script>
import GoTrue from "gotrue-js";
import { ToastProgrammatic as Toast } from "buefy";

export default {
	data() {
		return {
			email: "",
			password: "",
			background: require("~/assets/loginimage2.png"),
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
				const userData = await this.$axios(
					`${process.env.BASE_URL}/get-user`,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${userIdentity.token.access_token}`,
						},
					}
				);
				console.log("User Data:", userData);

				// Save to store:
				this.$store.commit("SET_USER_IDENTITY", userIdentity);
				userData.data.success &&
					this.$store.commit("SET_USER_DATA", userData.data.data);

				Toast.open("Login successful.");

				this.$router.push(
					userData.data.success ? "/user" : "/onboarding"
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

<style>
.auth-page.section {
	width: 100vw;
	height: 100vh;
}

.login-form *:not(input),
.signup-form *:not(input) {
	color: white !important;
}

.login-form {
	background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}

.login-form.is-signup {
	background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}

.main-head {
	margin-top: 4rem;
}

.login-form .container,
.signup-form .container {
	margin-top: 2rem;
}

.login-form .container .columns .column {
	width: 500px;
}

.login-form .container .columns .column2 {
	width: 30rem;
	height: 100rem;
	margin-top: 3rem;
}
</style>