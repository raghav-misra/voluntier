<template>
	<div class="discover-page">
		<div class="hero is-success">
			<div class="hero-body">
				<h1 class="subtitle is-2">Discover Shifts Near You</h1>
			</div>
		</div>

		<div class="root-container">
			<!-- Map -->
			<GmapMap :center="cityCoords" :zoom="mapZoom">
				<GmapMarker
					v-for="(shift, i) in shiftsByState"
					:key="i"
					@click="triggerModal(shift)"
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
					<b-button @click="triggerModal(shift)" type="is-primary"
						>View</b-button
					>
				</section>
			</div>

			<!-- Modal for each shift --->
			<b-modal
				v-model="showShiftModal"
				v-if="modalData"
				aria-modal
				aria-role="dialog"
			>
				<div class="hero is-info">
					<div class="hero-body">
						<h1 class="title">
							{{ modalData.title }}
						</h1>
						<h2 class="subtitle">
							{{ modalData.organization.name }} -
							{{
								moment
									.unix(modalData.starts)
									.format("MMMM Do YYYY")
							}},
							{{ moment.unix(modalData.starts).format("hh:mm") }}
							{{ moment.unix(modalData.ends).format("hh:mm") }}
						</h2>
						<p>
							{{ modalData.desc }}
						</p>
						<br />
						<p>
							Slots Remaining:
							{{ modalData.signedUp.data.length }}/{{
								modalData.max
							}}
						</p>
						<b-button
							@click="signUp"
							type="is-primary"
							v-if="
								modalData.signedUp.data.length < modalData.max
							"
							>Sign Up</b-button
						>
					</div>
				</div>
			</b-modal>
		</div>
	</div>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";
export default {
	middleware: "auth",
	data() {
		return {
			viewType: "city",
			cityCoords: { lat: 0, lng: 0 },
			shiftsByState: [],

			modalData: null,
			showShiftModal: false,
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

	methods: {
		async triggerModal(shift) {
			this.modalData = shift;
			this.showShiftModal = true;
		},
		async signUp() {
			console.log(this.modalData);
			const res = await this.$axios(
				`${process.env.BASE_URL}/signup-for-shift`,
				{
					method: "POST",
					headers: {
						authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
					},
					data: JSON.stringify({
						id: this.modalData._id,
					}),
				}
			);
			console.log(res.data);
			if (res.data.success) {
				Toast.open({
					type: "is-success",
					message: `You signed up for ${this.modalData.title}`,
				});
				this.$router.push("/user");
			} else {
				Toast.open({
					type: "is-danger",
					message: `An Error Has Occurred.`,
				});
			}
		},
	},

	watch: {
		showShiftModal(mode) {
			!mode && (this.modalData = null);
		},
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