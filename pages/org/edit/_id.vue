<template>
	<div class="edit-page">
		<div class="no-flex hero is-info">
			<div class="hero-body">
				<h1 class="subtitle is-2" style="margin-bottom: 0">
					{{ organization.name }}
				</h1>
				<h2 class="subtitle is-5">{{ organization.desc }}</h2>
			</div>
		</div>
		<div>
			<b-notification
				v-if="access == false"
				type="is-danger"
				@close="$router.push('/user')"
				has-icon
				aria-close-label="Close notification"
				role="alert"
			>
				You cannot access the requested organization.
			</b-notification>

			<section v-if="access == true" class="dashboard columns">
				<!--SIDE BAR-->
				<b-sidebar
					class="column is-one-fifth"
					position="static"
					:open="true"
					style="height: 100vh"
					:can-cancel="false"
				>
					<b-menu style="padding: 4%" class="sidebar">
						<b-menu-list label="Manage Organization">
							<b-menu-item
								@click="page = 'shifts'"
								icon="hand-heart"
								label="Manage Shifts"
							></b-menu-item>
							<b-menu-item
								@click="page = 'access'"
								icon="account-multiple-plus"
								label="Access Control"
							></b-menu-item>
						</b-menu-list>
					</b-menu>
				</b-sidebar>

				<!-- Access control page -->
				<section
					v-if="page == 'access'"
					class="column has-text-centered section"
				>
					<div class="container">
						<h1 class="title">Manage Access</h1>
						<h2 class="subtitle">
							Add or remove organization members
						</h2>

						<!-- email form -->
						<form class="section" @submit.prevent="inviteMember">
							<p class="title is-5">Invite a member</p>
							<b-field
								class="has-addons"
								style="display: inline-block !important"
							>
								<b-input
									type="email"
									v-model="inviteEmail"
									placeholder="Type here"
								/>
								<p class="control">
									<b-button
										native-type="submit"
										type="is-success"
										:loading="emailLoad"
									>
										Invite <i class="bx bxs-send"></i>
									</b-button>
								</p>
							</b-field>
						</form>

						<!-- Member table -->
						<vs-table v-model="selectedUser">
							<template #thead>
								<vs-tr>
									<vs-th>Name</vs-th>
									<vs-th> Email </vs-th>
									<vs-th> Remove </vs-th>
								</vs-tr>
							</template>
							<template #tbody>
								<vs-tr
									:key="i"
									v-for="(tr, i) in memberTable"
									:data="tr"
								>
									<vs-td>
										{{ `${tr.firstName} ${tr.lastName}` }}
									</vs-td>
									<vs-td>
										{{ tr.email }}
									</vs-td>
									<vs-td>
										<b-button
											:loading="removeLoad"
											type="is-danger"
											@click="removeMember(tr.email)"
											>Remove Access
										</b-button>
									</vs-td>
								</vs-tr>
							</template>
						</vs-table>
					</div>
				</section>

				<!-- shifts page -->
				<section v-if="page === 'shifts'" class="section">
					<div class="container has-text-centered">
						<h1 class="title">Manage Shifts</h1>
						<b-button
							type="is-success is-medium"
							@click="createNewShiftsModal = true"
						>
							Create shift <b>+</b>
						</b-button>
					</div>

					<div class="event-container">
						<section
							class="shift-card"
							v-for="(shift, i) in organization.shifts.data"
							:key="`shift-${i}`"
						>
							<h1 class="title">{{ shift.title }}</h1>
							<h2 class="subtitle">
								{{
									moment
										.unix(shift.starts)
										.format("MMM Do YYYY")
								}},
								{{ moment.unix(shift.starts).format("hh:mm") }}
								-
								{{ moment.unix(shift.ends).format("hh:mm") }}
							</h2>
							<b-collapse
								class="card"
								style="width: 100%"
								animation="slide"
								:open="false"
							>
								<div
									slot="trigger"
									slot-scope="props"
									class="card-header"
									role="button"
								>
									<p class="card-header-title">Volunteers</p>
									<a class="card-header-icon">
										<b-icon
											:icon="
												props.open
													? 'menu-down'
													: 'menu-up'
											"
										>
										</b-icon>
									</a>
								</div>
								<div class="card-content">
									<div class="content">
										<h6
											v-for="(vol, i) in shift.signedUp
												.data"
											:key="`member-${vol.email}-${i}`"
										>
											{{ vol.firstName }},
											{{ vol.lastName }}
											<code>{{ vol.email }}</code>
										</h6>
										<h6
											v-if="
												shift.signedUp.data.length == 0
											"
										>
											No one has signed up yet
										</h6>
									</div>
								</div>
							</b-collapse>
							<br />
							<b-button type="is-dark">Edit</b-button>
						</section>

						<section
							class="shift-card"
							v-if="organization.shifts.data.length === 0"
						>
							<h1 class="title">No shifts</h1>
							<h2 class="subtitle">
								Find opportunities near you
							</h2>
							<b-button
								tag="nuxt-link"
								type="is-primary"
								to="/discover"
							>
								Discover Shifts
							</b-button>
						</section>
					</div>
				</section>
			</section>
		</div>

		<b-modal
			v-model="createNewShiftsModal"
			:width="800"
			class="has-background-light"
			scroll="keep"
		>
			<div class="section modal-picker has-background-light">
				<h1 class="title">New Shift</h1>

				<form @submit.prevent="addNewShift">
					<b-field label="Title">
						<b-input required v-model="modal.title" />
					</b-field>

					<b-field label="Description">
						<b-input required v-model="modal.desc" />
					</b-field>

					<b-field label="Qualifications">
						<b-input
							type="textarea"
							required
							v-model="modal.qualifications"
						/>
					</b-field>

					<b-field label="Start Time">
						<b-datetimepicker
							required
							v-model="starts"
							icon="calendar-today"
						>
						</b-datetimepicker>
					</b-field>

					<b-field label="End Time">
						<b-datetimepicker
							required
							v-model="end"
							icon="calendar-today"
						>
						</b-datetimepicker>
					</b-field>

					<b-field label="Street Address">
						<b-input
							placeholder="e.g. 1234 Example Road"
							required
							v-model="modal.address"
						/>
					</b-field>

					<b-field label="City">
						<b-input
							placeholder="e.g. San Francisco"
							required
							v-model="modal.city"
						/>
					</b-field>

					<b-field label="State">
						<b-input
							placeholder="e.g. CA"
							required
							:maxlength="2"
							v-model="modal.state"
						/>
					</b-field>

					<b-field label="Max Volunteers">
						<b-input
							placeholder="e.g. 7"
							type="number"
							required
							:maxlength="2"
							v-model="modal.max"
						/>
					</b-field>

					<b-field>
						<b-checkbox>
							Follows COVID guidelines (required)
						</b-checkbox>
					</b-field>

					<b-button type="is-success" native-type="submit"
						>Add shift!</b-button
					>
				</form>
			</div>
		</b-modal>

		<!-- Loader -->
		<b-loading
			:is-full-page="true"
			mobile="reduce"
			:active="loading"
			:can-cancel="false"
		></b-loading>
	</div>
</template>
<script>
import { ToastProgrammatic as Toast } from "buefy";

export default {
	middleware: "auth",
	data() {
		return {
			createNewShiftsModal: false,
			emailLoad: false,
			inviteEmail: "",
			page: "shifts",
			loading: true,
			access: null,
			selectedUser: false,
			removeLoad: false,
			modal: {
				title: null,
				desc: null,
				qualifications: null,
				state: null,
				city: null,
				max: null,
				starts: new Date(),
				ends: new Date(),
				address: null,
			},
		};
	},
	computed: {
		id() {
			return this.$route.params.id;
		},
		userData() {
			return this.$store.state.userData;
		},
		organization() {
			return this.userData.organizations.data.find(
				(o) => o._id === this.id
			);
		},
		moment() {
			return moment;
		},
		memberTable() {
			return this.organization.members.data;
		},
	},
	mounted() {
		this.loading = false;
		this.access = true;
	},
	methods: {
		async inviteMember() {
			if (this.inviteEmail.trim() === "") return false;
			const email = this.inviteEmail;
			this.inviteEmail = "";
			this.emailLoad = true;
			try {
				const successReq = await this.$axios(
					`${process.env.BASE_URL}/add-access/`,
					{
						method: "POST",
						headers: {
							authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
						},
						data: JSON.stringify({
							id: this.id,
							email: email,
						}),
					}
				);

				if (!successReq.data.success) {
					Toast.open("Error: " + successReq.data.error);
				} else Toast.open("Success! They have been added.");
			} catch (e) {
				Toast.open("Error: " + e);
			}
			this.emailLoad = false;
		},
		async removeMember(email) {
			this.removeLoad = true;
			try {
				const successReq = await this.$axios(
					`${process.env.BASE_URL}/remove-access/`,
					{
						method: "POST",
						headers: {
							authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
						},
						data: JSON.stringify({
							id: this.id,
							email: email,
						}),
					}
				);

				if (!successReq.data.success) {
					Toast.open("Error: " + successReq.data.error);
				} else Toast.open("Success! They have been removed.");
			} catch (e) {
				Toast.open("Error: " + e);
			}
			this.removeLoad = false;
		},
		async addNewShift() {
			try {
				const address = `${this.modal.address}, ${this.modal.city}, ${this.modal.state}`;

				const coords = await this.$axios(
					`${process.env.BASE_URL}/geocode`,
					{
						method: "POST",
						headers: {
							authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
						},
						data: JSON.stringify({
							input: address,
						}),
					}
				);

				// Get lat/long:
				const lat = coords.data.data.lat;
				const lng = coords.data.data.lng;

				const shift = {
					...this.modal,
					address,
					starts: this.modal.starts.getTime() / 1000,
					ends: this.modal.ends.getTime() / 1000,
					lat,
					lng,
				};

				console.log("SHIFT", shift);

				const createShiftReq = await this.$axios(
					`${process.env.BASE_URL}/create-shift`,
					{
						headers: {
							Authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
						},
						method: "POST",
						data: JSON.stringify({
							id: this.id,
							shift,
						}),
					}
				);

				if (createShiftReq.data.success) {
					alert("Success!");
					this.$router.push("/user");
				}
			}
			catch (e) {
				console.log("An error occurred", e);
			}
		},
	},
};
</script>
<style scoped>
.sidebar {
	height: 100vh;
}

.shift-card,
.event-container {
	margin: 1rem;
	width: 100%;
}

.modal-picker {
	max-height: 900px;
	overflow-y: auto;
}
</style>



























































































































































































































































































































































<style>
.vs-table * {
	font-size: 1rem;
	text-align: left;
}

.vs-table {
	margin: 0.5rem 2rem;
	width: auto;
	border: 1px #363636 solid;
	border-radius: 20px;
}

.collapse.card {
	width: 100%;
}
</style>