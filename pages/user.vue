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
					v-for="(shift, i) in userData.shifts.data"
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

				<section
					class="shift-card"
					v-if="userData.shifts.data.length === 0"
				>
					<h1 class="title">No signups</h1>
					<h2 class="subtitle">Find opportunities near you</h2>
					<b-button tag="nuxt-link" type="is-primary" to="/discover">
						Discover Shifts
					</b-button>
				</section>
				<img
					style="width: 35vh; vertical-align: bottom"
					src="@/assets/images/empty_street.svg"
					alt="empty street"
				/>
			</div>
		</section>

		<section class="section container">
			<div class="columns">
				<div class="column">
					<h1 class="title" id="myStats">My Stats</h1>
					<br />
					<section class="shift-card fullWidth">
						<h2 class="subtitle">Hours Worked</h2>
						<br />
						<h1 class="title">{{ userData.hoursWorked }}</h1>
					</section>
					<br />
					<section class="shift-card fullWidth">
						<h2 class="subtitle">Shifts Worked</h2>
						<br />
						<h1 class="title">{{ userData.shiftsWorked }}</h1>
					</section>
				</div>
				<div class="column">
					<h1 class="title" id="myStats">Milestones</h1>
					<div class="milestones mile-card">
						<!-- cards for milestone -->
						<vs-card
							v-if="userMilestones.nextMilestone !== undefined"
							type="3"
						>
							<template #title>
								<h3>
									Next Milestone:
									{{ userMilestones.nextMilestone.title }}
								</h3>
							</template>
							<template #img>
								<img
									style="transform: scale(0.5)"
									:src="userMilestones.nextMilestone.path"
									alt=""
								/>
							</template>
							<template #text>
								<p class="has-text-weight-bold">
									{{ userMilestones.nextMilestone.desc
									}}<br />
									Only
									{{
										userMilestones.nextMilestone.hours -
										userData.hoursWorked
									}}
									Hours to go!
								</p>
							</template>
						</vs-card>
						<vs-card
							v-for="(milestone, i) in userMilestones.milestones"
							:key="`milestone-${i}`"
							type="3"
						>
							<template #title>
								<h3>{{ milestone.title }}</h3>
							</template>
							<template #img>
								<img
									style="transform: scale(0.5)"
									:src="milestone.path"
									alt=""
								/>
							</template>
							<template #text>
								<p>
									{{ milestone.desc }}
								</p>
							</template>
						</vs-card>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	computed: {
		userData() {
			return this.$store.state.userData;
		},
		moment() {
			return moment;
		},
		userMilestones() {
			const milestones = this.milestones.filter(
				(m) => m.hours <= this.userData.hoursWorked
			);
			const nextMilestone = this.milestones.reverse()[milestones.length];
			return { milestones, nextMilestone };
		},
	},
	data: () => {
		return {
			milestones: [
				{
					path: require("@/assets/milestones/200.png"),
					desc: "Volunteer for 200 hours",
					title: "Canopy",
					hours: 200,
				},
				{
					path: require("@/assets/milestones/100.png"),
					desc: "Volunteer for 100 hours",
					title: "Sequoia",
					hours: 100,
				},
				{
					path: require("@/assets/milestones/50.png"),
					desc: "Volunteer for 50 hours",
					title: "Redwood",
					hours: 50,
				},
				{
					path: require("@/assets/milestones/25.png"),
					desc: "Volunteer for 25 hours",
					title: "Oak",
					hours: 25,
				},
				{
					path: require("@/assets/milestones/10.png"),
					desc: "Volunteer for 10 hours",
					title: "Flower",
					hours: 10,
				},
				{
					path: require("@/assets/milestones/5.png"),
					desc: "Volunteer for 5 hours",
					title: "Sapling",
					hours: 5,
				},
				{
					path: require("@/assets/milestones/0.png"),
					desc: "Create an account on VolunTier",
					title: "Seedling",
					hours: 0,
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
.fullWidth {
	display: block;
}
.mile-card {
	display: inline-block;
	margin: 1.5rem;
	border-radius: 10px;
	padding: 1rem 2rem;
	background: #363636;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	transition: all 0.2s ease-in-out;
}
.mile-card .vs-card-content {
	margin: 5%;
}
.milestones {
	max-height: 50vh;
	overflow-y: scroll;
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