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
					<h2 class="subtitle is-4">Making volunteering a fun experience</h2>
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
						<div class="container">
							<h2 class="title is-2 has-text-primary">
								Welcome to VolunTier
							</h2>
							<h1 class="title is-5 has-text-primary">
								Watch this video to get started! VolunTier is a
								way for (say what it is)
							</h1>
						</div>
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
			<div class="level benefit-cards">
				<div class="level-item">
					<div>
						<h2 class="subtitle">Personalized</h2>
						<h1 class="title">Recommendations</h1>
						<br />
						<p>
							Find shifts based on your personal interests and acheivements
						</p>
					</div>
				</div>

				<div class="level-item">
					<div>
						<h2 class="subtitle">Find shifts</h2>
						<h1 class="title">Closest to you</h1>
						<br />
						<p>Use your location to find the perfect shifts near you</p>
					</div>
				</div>

				<div class="level-item">
					<div>
						<h2 class="subtitle">Interactive</h2>
						<h1 class="title">Leaderboard</h1>
						<br />
						<p>See where you stand in your city and state</p>
					</div>
				</div>
			</div>

			<div class="level benefit-cards">
				<div class="level-item">
					<div>
						<h2 class="subtitle">Detailed</h2>
						<h1 class="title">Statistics</h1>
						<br />
						<p>
							Receive detailed statistics 
						</p>
					</div>
				</div>

				<div class="level-item">
					<div>
						<h2 class="subtitle">Find shifts</h2>
						<h1 class="title">Closest to you</h1>
						<br />
						<p>Use your location to find the perfect shifts</p>
					</div>
				</div>

				<div class="level-item">
					<div>
						<h2 class="subtitle">Interactive</h2>
						<h1 class="title">Leaderboard</h1>
						<br />
						<p>See where you stand in your city and state.</p>
					</div>
				</div>
			</div>
		</div>
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
	height: calc(100vw / 5);
	width: 95%;
	margin: 5%;
}

.media-main .media-video {
	height: calc(100vw / 5);
}

.column .card {
	height: 500px;
	width: 400px;
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
}

.benefit-cards > .level-item {
	background-color: #363636;
	padding: 2rem 1rem; 
}

.benefit-cards > .level-item h2 {
	line-height: 2rem;
	margin-bottom: 1rem;
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
