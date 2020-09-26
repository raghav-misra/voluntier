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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>