<template>
	<div>
		<header>
			<div class="top-bar hero is-dark">
				<div class="hero-body">
					<div class="avatar has-background-info">
						{{ userData.firstName[0] }}
						{{ userData.lastName[0] }}
						<div class="badge has-background-success"></div>
					</div>
					<span class="has-text-success subtitle is-2 no-ttl-margin">
						Welcome {{ userData.firstName }}
					</span>

					<b-button tag="nuxt-link" to="/org" type="is-primary" class="view-org-button">
						My Organizations
					</b-button>
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
					<b-button tag="nuxt-link" to="/checkin" type="is-success">
					<i class='bx bx-clipboard' ></i>
					Check-in
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
					<b-button @click="cancelShift(shift)" type="is-danger"
						>Cancel</b-button
					>
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

		<section class="section">
			<div class="columns">
				<div class="column">
					<h1 class="title" id="myStats">My Stats</h1>
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
							v-if="nextMilestone !== undefined"
							type="3"
						>
							<template #title>
								<h3>
									Next Milestone:
									{{ nextMilestone.title }}
								</h3>
							</template>
							<template #img>
								<img
									style="transform: scale(0.5)"
									:src="nextMilestone.path"
									alt=""
								/>
							</template>
							<template #text>
								<p class="has-text-weight-bold">
									{{ nextMilestone.desc
									}}<br />
									Only
									{{
										nextMilestone.hours -
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
				<div class="column">
					<h1 class="title" id="myCalender">Calendar</h1>
					 <v-calendar :attributes="userData.shifts.data.map(s => { 
						return  { key: s.title, highlight: true, dates: new Date(s.starts*1000) }
						 })" is-dark></v-calendar>
				</div>
			</div>
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
		moment() {
			return moment;
		},
		userMilestones() {
			const milestones = this.milestones.filter(
				(m) => m.hours <= this.userData.hoursWorked
			);
			return { milestones };
		}
		
	},
	async mounted() {
		const milestones = this.milestones.filter(
				(m) => m.hours <= this.userData.hoursWorked
			);
			const nextMilestone = this.milestones.reverse().slice(milestones.length)[0];
			this.nextMilestone = nextMilestone
	},
	methods: {
		async cancelShift(modalData) {
			const res = await this.$axios(
				`${process.env.BASE_URL}/cancel-a-shift`,
				{
					method: "POST",
					headers: {
						authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
					},
					data: JSON.stringify({
						id: modalData._id,
					}),
				}
			);
			console.log(res.data);
			if (res.data.success) {
				Toast.open({
					type: "is-success",
					message: `You have canceled your slot for ${modalData.title}`,
				});
				this.trySync();
			} else {
				Toast.open({
					type: "is-danger",
					message: `An Error Has Occurred. ${res.data.error}`,
				});
			}
		},
		trySync() {
			try {
				this.$store.dispatch("SYNC_USER_DATA");
			} catch (e) {
				console.log("Error in syncing user: ", e);
			}
		},
	},

	data() {
		return {
			nextMilestone: undefined,
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
	beforeCreate() {
		try {
			this.$store.dispatch("SYNC_USER_DATA");
		} catch (e) {
			console.log("Error in syncing user: ", e);
		}
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
	max-height: 53vh;
	overflow-y: scroll;
	margin-top: 0;
}
.shift-card * {
	color: white !important;
}

.event-container .vs-card {
	display: inline-block;
}

.top-bar .hero-body {
	display: flex;
	align-items: center;
}

.top-bar .hero-body > * {
	margin: 0 0.5rem;
}

.top-bar .hero-body > button {
	justify-self: flex-end;
}

.avatar {
	width: 5rem;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
	border-radius: 50%;
	position: relative;
}

.avatar .badge {
	position: absolute;
	border-radius: 50%;
	bottom: 0.25rem;
	right: 0.25rem;
	width: 1.25rem;
	height: 1.25rem;
}

.event-container {
	padding-top: 1rem;
	white-space: nowrap;
	overflow-x: scroll;
	position: relative;
}
</style>

<style>
.vc-bg-gray-900 {
	background: #363636 !important;
}
</style>