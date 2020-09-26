<template>
    <div class="main-page">
        <AppNavigation />
        <div class="current-page">
            <Nuxt />
        </div>
        <AppFooter />
    </div>
</template>

<style scoped>
.current-page {
    min-height: 100vh;
}
</style>