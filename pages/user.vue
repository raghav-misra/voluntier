<template>
	<div>
		<header>
			<div class="top-bar-hero has-background-dark">
				<div class="hero-body">
					<vs-avatar size="80" primary badge badge-color="success">
						<template #text>
							{{ userData.firstName }} {{ userData.lastName }}
						</template>
					</vs-avatar>
					<span class="has-text-success subtitle is-2">
						Welcome {{ userData.firstName }}
					</span>
				</div>
			</div>
		</header>
		<section class="section">
			<h1 class="title">
				Upcoming Shifts&nbsp;&nbsp;
				<b-button tag="nuxt-link" to="/discover" type="is-success">
					<i class="bx bx-search"></i>
					Find Shifts Near Me
				</b-button>
			</h1>

			<div class="event-container">
				<section
					class="shift-card"
					v-for="(shift, i) in shifts"
					:key="`shift-${i}`"
				>
					<h1 class="title">{{ shift.title }}</h1>
					<h2 class="subtitle">
						{{ moment.unix(shift.starts).format("MMMM Do YYYY") }},
						{{ moment.unix(shift.starts).format("hh:mm") }} -
						{{ moment.unix(shift.ends).format("hh:mm") }}
					</h2>
					<b-button type="is-primary">View</b-button>
					<b-button type="is-danger">Cancel</b-button>
				</section>
			</div>
		</section>

		<section class="section container">
			<h1 class="title">My Stats</h1>
			<div class="level">
				<div class="level-item">
					<section class="shift-card">
						<h2 class="subtitle">Hours Worked</h2>
						<br />
						<h1 class="title">5</h1>
					</section>
					<section class="shift-card">
						<h2 class="subtitle">Shifts Worked</h2>
						<br />
						<h1 class="title">68</h1>
					</section>
				</div>
				<div class="level-item">
					<section class="shift-card">
						<h2 class="subtitle">Hours Worked</h2>
						<br />
						<h1 class="title">5</h1>
					</section>
					<section class="shift-card">
						<h2 class="subtitle">Shifts Worked</h2>
						<br />
						<h1 class="title">68</h1>
					</section>
				</div>
			</div>
		</section>
	</div>
</template>



<script>
export default {
	computed: {
		userData() {
			return this.$store.state.userData;
		},
		moment() {
			return moment;
		},
	},
	data: () => {
		return {
			shifts: [
				{
					title: "Delete Fortnite",
					starts: "1601166383",
					ends: "1601126383",
				},
				{
					title: "Delete Fortnite",
					starts: "1601166383",
					ends: "1601126383",
				},
				{
					title: "Delete Fortnite",
					starts: "1601166383",
					ends: "1601126383",
				},
				{
					title: "Delete Fortnite",
					starts: "1601166383",
					ends: "1601126383",
				},
			],
		};
	},
};
</script>

<style scoped>
.shift-card {
	display: inline-block;
	margin: 1.5rem;
	border-radius: 10px;
	padding: 1rem 2rem;
	background: #363636;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	transition: all 0.2s ease-in-out;
}

.shift-card * {
	color: white !important;
}

.event-container .vs-card {
	display: inline-block;
}

.vs-avatar-content {
	margin-right: 1.5rem;
}

.hero-body {
	display: flex;
	align-items: center;
}

.event-container {
	padding-top: 1rem;
	white-space: nowrap;
	overflow-x: scroll;
	position: relative;
}
</style>