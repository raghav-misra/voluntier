l<template>
	<div class="account-page">
		<div class="hero is-primary">
			<div class="hero-body">
				<h1 class="title is-1">Account Settings</h1>
			</div>
		</div>

		<form class="section container" @submit.prevent="update">
			<p class="subtitle"><b>First Name:</b> {{ settings.firstName }}</p>
			<b-input v-model="settings.firstName" placeholder="edit me" />

			<p class="subtitle"><b>Last Name: </b>{{ settings.lastName }}</p>
			<b-input v-model="settings.lastName" placeholder="edit me" />

			<p class="subtitle"><b>State: </b>{{ settings.state }}</p>
			<b-input v-model="settings.state" placeholder="edit me" />

			<p class="subtitle"><b>City: </b>{{ settings.city }}</p>
			<b-input v-model="settings.city" placeholder="edit me" />
		</form>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	data() {
		return {
			settings: {}
		};
	},
	mounted() {
        this.settings = this.$store.state.userData;
	},
	methods: {
		update() {
			
		}
	}
};
</script>

<style>
.account-page input,
.account-page p {
	margin: 0.5rem !important;
}
</style>