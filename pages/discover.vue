<template>
	<div class="discover-page">
		<div class="hero is-success">
			<div class="hero-body">
				<h1 class="subtitle is-2">Discover Shifts Near You</h1>
			</div>
		</div>
		<div class="root-container">
			<GmapMap :center="cityCoords" :zoom="mapZoom">
				<GmapMarker
					v-for="(shift, i) in shiftsByState"
					:key="i"
					:position="{ lat: shift.lat, lng: shift.lng }"
				/>
			</GmapMap>

			<div class="list-view has-background-dark">
				<!-- Toggle between city & state -->
				<h1 class="display-type-picker subtitle is-5">
					<span>Show shifts in</span>
					<b-radio v-model="viewType" native-value="city">
						City
					</b-radio>
					<b-radio v-model="viewType" native-value="state">
						State
					</b-radio>
				</h1>

				<!-- loop over list view -->
				<section
					class="shift-card"
					v-for="(shift, i) in shiftsForList"
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
		</div>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	data() {
		return {
			viewType: "city",
			cityCoords: { lat: 0, lng: 0 },
			shiftsByState: [],
		};
	},
	computed: {
		moment() {
			return moment;
		},
		userData() {
			return this.$store.state.userData;
		},
		mapZoom() {
			return this.viewType === "city" ? 14 : 6;
		},
		shiftsByCity() {
			return this.shiftsByState.filter(
				(s) => s.city === this.userData.city.toLowerCase()
			);
		},
		shiftsForList() {
			return this.viewType === "city"
				? this.shiftsByCity
				: this.shiftsByState;
		},
	},
	async created() {
		this.cityCoords = { lat: this.userData.lat, lng: this.userData.lng };
		try {
			const shiftReq = await this.$axios(
				`${process.env.BASE_URL}/get-shifts-by-state`,
				{
					method: "POST",
					headers: {
						authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
					},
					data: JSON.stringify({
						state: this.userData.state.toLowerCase(),
					}),
				}
			);

			console.log(shiftReq.data);

			this.shiftsByState = shiftReq.data.data;
		} catch (e) {
			console.log(e);
		}
	},
};
</script>

<style scoped>
.shift-card {
	margin-bottom: 1rem;
}

.discover-page {
	background: #363636;
	flex: 1;
	display: flex;
	flex-direction: column;
}

.root-container {
	flex: 1;
	display: flex;
	align-items: stretch;
}

.root-container * {
	color: white !important;
}

.list-view {
	padding: 2rem 4rem;
	max-width: 37.5vw;
}

.display-type-picker {
	padding-bottom: 1rem;
	border-bottom: white 2px solid;
}

.display-type-picker > * {
	vertical-align: top;
}

.display-type-picker > span {
	margin-right: 0.5rem;
}
</style>

<style>
.vue-map-container {
	flex: 1;
}

.discover-page .radio:hover .control-label {
	color: white !important;
}
</style>