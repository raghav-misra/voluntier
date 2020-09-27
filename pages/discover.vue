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
				<div class="hero is-dark">
					<div class="hero-body">
						<small class="has-text-success">Viewing Shift:</small>

						<h1 class="title has-text-info">
							{{ modalData.title }}
						</h1>
						
						<h2 class="subtitle">
							from {{ modalData.organization.name }}
						</h2>	

						<h2 class="subtitle">
							starts on <b>
								{{moment.unix(modalData.starts).format("MMM Do YYYY")}}
							</b>, from: 
							<b>{{ moment.unix(modalData.starts).format("hh:mm") }}</b> to
							<b>{{ moment.unix(modalData.ends).format("hh:mm") }}</b>
						</h2>

						<hr>

						<h2 class="title is-4 no-ttl-margin">Shift Description:</h2>
						<p>{{ modalData.desc }}</p>

						<br>

						<h2 class="title is-4 no-ttl-margin">Recommended Qualifications:</h2>
						<p>{{ modalData.qualifications }}</p>

						<hr />

						<!-- Slots open, allow signup -->
						<div 
							class="field has-addons" 
							v-if="shiftSpaceAvailable && !isSignedUpForShift"
						>
							<p class="control">
								<b-button @click="signUp" type="is-success">
									Signup for this shift.
								</b-button>
							</p>
							<p class="control">
								<b-button @click="signUp" type="is-info">
									{{ modalData.signedUp.data.length }} / 
									{{ modalData.max }}
								</b-button>
							</p>
						</div>

						<!-- Already signed up, show cancel -->
						<div class="field" v-else-if="isSignedUpForShift">
							<b-button @click="cancelShift" type="is-danger">
								Cancel shift.
							</b-button>
						</div>

						<!-- Shift is full -->
						<div class="field" v-else-if="is-warning" disabled>
							<b-button type="is-danger">
								This shift is full.
							</b-button>
						</div>
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
		shiftSpaceAvailable() {
			return this.modalData.signedUp.data.length < this.modalData.max;
		},
		isSignedUpForShift() {
			return this.modalData.signedUp.data.map(d => d._id).includes(this.userData._id);
		}
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
					message: `An Error Has Occurred. ${res.data.error}`,
				});
			}
		},
		async cancelShift() {
			console.log(this.modalData);
			const res = await this.$axios(
				`${process.env.BASE_URL}/cancel-a-shift`,
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
					message: `You have canceled your slot for ${this.modalData.title}`,
				});
				this.$router.push("/user");
			} else {
				Toast.open({
					type: "is-danger",
					message: `An Error Has Occurred. ${res.data.error}`,
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

.root-container *:not(button):not([class*="has-text-"]) {
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

.no-ttl-margin {
	margin-bottom: 0.5rem !important;
}
</style>