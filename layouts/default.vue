<template>
    <div class="main-page">
        <AppNavigation />
        <div class="current-page">
            <Nuxt />
        </div>
    </div>
</template>

<style scoped>
.current-page {
    min-height: calc(100vh - 3.25rem);
    display: flex;
    flex-direction: column;
}
</style>