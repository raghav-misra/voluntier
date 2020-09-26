<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item
				class="has-text-primary has-text-weight-bold"
				tag="nuxt-link"
				:to="{ path: '/' }"
			>
				vt
			</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item href="#" tag="nuxt-link" :to="{ path: '/' }">
				Home
			</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<nuxt-link to="../auth/signup" class="button is-primary">
						<strong>Sign up</strong>
					</nuxt-link>
					<nuxt-link to="../auth/login" class="button is-light">
						Log in
					</nuxt-link>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
</style>