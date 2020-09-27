<template>
	<div class="main">
		<div class="top-bar-hero has-background-light">
			<div class="hero-body">
				<img
					class="logo"
					src="@/assets/logo.png"
					alt="logo"
					width="150"
					height="150"
				/>
				<div>
					<h1 class="has-text-primary title is-2">VolunTier</h1>
					<h2 class="subtitle is-4">
						Making volunteering a fun experience
					</h2>
				</div>
			</div>
		</div>

		<div class="hero">
			<div class="hero-body media">
				<div class="media-main has-text-centered">
					<iframe
						src="https://www.youtube.com/embed/oHg5SJYRHA0"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="media-video"
					>
					</iframe>
				</div>

				<div class="media-content">
					<div class="card">
						<h3 class="title has-text-primary">
							Welcome to VolunTier!
						</h3>
						
						<p
							style="
								margin-left: 1rem;
								margin-right: 1rem;
								font-size: 20px;
							"
						>
							VolunTier allows Organizers to post upcoming
							volunteering shifts for their organizations.
							Volunteers can view these upcoming shifts, and
							get personalized reccomendations for where to
							volunteer next. In addition, volunteers can find
							shifts near their location, track their shifts
							on a calender, view detailed statistics of their
							past volunteering activity unlock milestones as
							they progress, compete with other volunteers on
							an interactive leaderboard, and much more.
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="header-before-cards card">
			<div class="text-header-before-cards">
				<br />
				<h1 class="title is-3 has-text-primary">
					Start volunteering and helping your community today!
				</h1>
			</div>
		</div>

		<img
			class="cover-image"
			src="@/assets/volunteer.png"
			alt="loginimage"
		/>

		<div class="has-text-centered">
			<div class="columns benefit-cards">
				<div class="column">
					<div>
						<h2 class="subtitle">Personalized</h2>
						<h1 class="title">Recommendations</h1>
						<br />
						<p>Discover shifts based on your interests.</p>
						<img
							class="cover-image"
							src="@/assets/images/recommend.svg"
							alt="recommend"
						/>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Find shifts</h2>
						<h1 class="title">Closest to you</h1>
						<br />
						<p>Find the perfect shifts in your city.</p>
						<img
							class="cover-image"
							src="@/assets/images/world.svg"
							alt="world"
						/>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Interactive</h2>
						<h1 class="title">Leaderboard</h1>
						<br />
						<p>Your standing in your city and state.</p>
						<img
							class="cover-image"
							src="@/assets/images/leaderboard.svg"
							alt="leaderboard"
						/>
					</div>
				</div>
			</div>

			<div class="columns benefit-cards">
				<div class="column">
					<div>
						<h2 class="subtitle">Detailed</h2>
						<h1 class="title">Statistics</h1>
						<br />
						<p>Receive detailed statistics on past shifts.</p>
						<img
							class="cover-image"
							src="@/assets/images/stats.svg"
							alt="stats"
						/>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Unlock</h2>
						<h1 class="title">Milestones</h1>
						<br />
						<p>
							Unlock milestones as you progress and get more
							hours.
						</p>
						<img
							class="cover-image"
							src="@/assets/images/milestone.svg"
							alt="milestone"
						/>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Detailed</h2>
						<h1 class="title">Calendar</h1>
						<br />
						<p class>Track your upcoming shifts in a calendar.</p>
						<img
							class="cover-image"
							src="@/assets/images/calendar.svg"
							alt="calendar"
						/>
					</div>
				</div>
			</div>
		</div>
		<br>
		<section class="container">
			<h1 class="title is-1 has-text-primary has-text-light">
				Represent an organization?
			</h1>
			<div class="has-text-centered">
					<h2 class="title has-text-light use-our-platform">
					Use our platform to manage volunteers intuitively.
				</h2>
				<div class="columns organization-cards">
					<div class="card column">
						<div class="card-content">
							<p class="title">
								<i class="bx bx-world"></i> 
							</p>
							<p class="subtitle">
								 Quickly find and
								promote shifts
							</p>
						</div>
					</div>

					<div class="card column">
						<div class="card-content">
							<p class="title">
								<i class="bx bx-trophy"></i> 
							</p>
							<p class="subtitle">
								 Motivate your volunteers out of the box
							</p>
						</div>
					</div>

					<div class="card column">
						<div class="card-content">
							<p class="title">
								<i class="bx bx-data"></i> 
							</p>
							<p class="subtitle">
								Let us handle the tedious tasks like taking attendence, loging times, and managing shifts. 
							</p>
						</div>
					</div>

					<div class="card column">
						<div class="card-content">
							<p class="title">
								<i class="bx bx-star"></i>
							</p>
							<p class="subtitle">
								Use a platform that volunteers will love and engage with!
							</p>
						</div>
					</div>

					
				</div>
			</div>
		</section>
		<section class="hero is-medium is-primary is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						What are you waiting for?
					</h1>
					<h2 class="subtitle">
						Sign up for the best hub for both nonprofit organizations and volunteers!
					</h2>
					<router-link to="/auth/signup">
					<b-button type="is-info">
						Get Started
					</b-button>
					</router-link>
				</div>
			</div>
		</section>
		</div>
</template>

<style scoped>
.main {
	flex: 1;
}

.hero-body {
	display: flex;
	justify-content: center;
	vertical-align: bottom;
	align-items: center;
}
.hero {
	margin-bottom: 1rem;
}
.main {
	background-image: linear-gradient(to right, #ec77ab 0%, #7873f5 100%);
}
.media-main,
.media-content {
	flex: 1;
	text-align: center;
}

.media-content .card * {
	color: #363636;
}

.media-content .card,
.media-main .media-video {
	height: 25vw;
	max-height: 25rem;
	width: 95%;
	margin: 5%;
}

.organization-cards {
	position: relative;
	top: 5rem;
}

.use-our-platform {
	position: relative;
	top: 5rem;
}

.media-content .card {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.column .card {
	height: 500px;
	width: 400px;
	margin: 1%;
}
.level .card{
	display:inline-block;
}
.cover-image {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 50%;
}

.card1 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}

.card2 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}
.card3 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}

.card4 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}

.header-before-cards {
	text-align: center;
	width: 200rem;
	height: 5rem;
	margin-bottom: 3rem;
}

.benefit-cards {
	align-items: start;
	margin: 0 !important;
	background-color: #363636;
}

.benefit-cards > .column {
	padding: 2rem 1rem;
}

.benefit-cards > .column h2 {
	line-height: 2rem;
	margin-bottom: 1rem;
}

.benefit-cards > .column p {
	font-size: 1.25rem !important;
}

.benefit-cards * {
	color: white;
}
</style>

<script>
import GoTrue from "gotrue-js";
import { ToastProgrammatic as Toast } from "buefy";
export default {
	computed: {
		auth() {
			return this.$store.state.auth;
		},
	},
	async mounted() {
		//Confirm if there is a hash
		if (location.hash.startsWith("#confirmation_token")) {
			const token = window.location.hash.split("=")[1];
			if (token) {
				try {
					await this.auth.confirm(token);
					Toast.open("Your account has been verified");
				} catch (e) {
					const error = `${e}`;
					Toast.open(error);
				}
			}
		}
	},
};
</script>
