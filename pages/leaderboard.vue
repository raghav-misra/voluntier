<template>
	<div>
		<div class="hero is-primary">
			<div class="hero-body">
				<h1 class="subtitle is-2">Leaderboard</h1>
			</div>
			
		</div>

		<section class="container">
			<div class="chart">
				<h1 style="font-size: 50px" class="title leaderboard-header">
					Top 10 Volunteers in {{ userData.state.toUpperCase() }}
				</h1>

				<column-chart
					:data="[
						['2nd place', 100],
						['First Place', 200],
						['ha nub got third', 50],
					]"
				>
				</column-chart>
			</div>
			
			<div>
				<div v-if="loaded" class="center examplex">
					<vs-table striped>
						<template #thead>
							<vs-tr>
								<vs-th> Name </vs-th>
								<vs-th> Hours </vs-th>
							</vs-tr>
						</template>
						<template #tbody>
							<vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
								<vs-td>
									{{ tr.firstName }}
								</vs-td>
								<vs-td>
									{{ tr.hoursWorked }}
								</vs-td>
							</vs-tr>
						</template>
					</vs-table>
				</div>
				<div v-if="!loaded">
					<b-skeleton
						width="80%"
						height="50%"
						:animated="true"
					></b-skeleton>
				</div>
			</div>

			<footer class="section"></footer>
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
	},
	data() {
		return {
			loaded: false,
			users: [],
		};
	},
	async created() {
		const res = await this.$axios(
			`${process.env.BASE_URL}/get-user-by-state`,
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
		console.log(res.data);
		let users = res.data.data.sort(function (a, b) {
			if (parseInt(a.hoursWorked) > parseInt(b.hoursWorked)) return -1;
			if (parseInt(a.hoursWorked) < parseInt(b.hoursWorked)) return 1;
			return 0;
		});
		this.users = users.slice(0, 10);
		this.loaded = true;
	},
};
</script>

<style scoped>
.chart {
	margin-bottom: 8rem;
}

.leaderboard-header {
	margin-top: 5rem;
	margin-bottom: 5rem;
	text-align: center;
}
</style>