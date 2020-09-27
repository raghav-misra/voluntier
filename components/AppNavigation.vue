<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item
				class="has-text-primary has-text-weight-bold"
				tag="nuxt-link"
				to="/"
			>
				vt
			</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item tag="nuxt-link" to="/"> Home </b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/user">
				Dashboard
			</b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/user#myStats">
				Statistics
			</b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/user#myStats">
				Milestones
			</b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/org">
				Organizations
			</b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/discover">
				Discover Shifts
			</b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/leaderboard">
				Leaderboard
			</b-navbar-item>
			<b-navbar-item tag="nuxt-link" to="/user">
				Account Settings
			</b-navbar-item>
			
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<template v-if="loggedIn">
						<b-button type="is-danger" @click="logout">
							<strong>Logout</strong>
						</b-button>
					</template>
					<template v-else>
						<nuxt-link to="/auth/signup" class="button is-primary">
							<strong>Sign up</strong>
						</nuxt-link>
						<nuxt-link to="/auth/login" class="button is-light">
							Login
						</nuxt-link>
					</template>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	computed: {
		loggedIn() {
			return !!this.$store.state.userIdentity;
		},
	},
	methods: {
		logout() {
			this.$store.commit("LOGOUT");
			this.$router.push("/auth/login");
		},
	},
});
</script>

<style scoped>
</style>