<template>
	<div>
		<div class="hero is-primary">
			<div class="hero-body">
				<h1 class="subtitle is-2">Check-In</h1>
			</div>
		</div>

		<section class="container has-text-centered">
			<h2 class="title">{{ selected.title }}</h2>
			<form @submit.prevent="checkIn()">
				<b-field label="Shift">
					<b-select
						v-model="selected"
						required
						placeholder="Select a shift"
					>
						<option
							v-for="option in eligibleShifts"
							:value="option._id"
							:key="option._id"
						>
							{{ option.title }}
						</option>
					</b-select>
				</b-field>
				<b-button native-type="submit" type="is-success"
					>Check In</b-button
				>
			</form>
		</section>
	</div>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";
export default {
	middleware: "auth",
	computed: {
		userData() {
			return this.$store.state.userData;
		},
	},
	data() {
		return {
			eligibleShifts: [],
			selected: { title: "" },
		};
	},
	mounted() {
		const now = new Date().getTime();
		const eligibleShifts = this.userData.shifts.data.filter(
			(s) => Math.sign(now - new Date(parseInt(s.ends) * 1000)) == 1
		);
		this.eligibleShifts = eligibleShifts;
	},
	methods: {
		async checkIn() {
			console.log(this.selected);
			try {
				const res = await this.$axios(
					`${process.env.BASE_URL}/checkin`,
					{
						method: "POST",
						headers: {
							authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
						},
						data: JSON.stringify({
							id: this.selected,
						}),
					}
				);

				if (res.data.success) {
				Toast.open("Your hours have been added!")
					this.$router.push("/user");
				}
			} catch (e) {
				console.log("An error occurred", e);
			}
		},
	},
};
</script>

<style>
</style>