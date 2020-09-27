<template>
	<div>
		{{ userData }}
	</div>
</template>

<script>
export default {
    middleware: "auth",
    computed: {
        userData() { return this.$store.state.userData; }
    }
};
</script>

<style scoped>
</style>