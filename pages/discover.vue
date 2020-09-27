<template>
	<div class="discover-page">
		<div class="hero is-success">
			<div class="hero-body">
				<h1 class="subtitle is-2">Discover Shifts Near You</h1>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	middleware: "auth",
};
</script>

<style scoped>
.discover-page {
    background: #363636;
    flex: 1;
}
</style>