<template>
    <div class="org-page">
        <!-- <div v-if="hasOrganizations" class="section container">
            <div v-for="(org, i) in organizations" :key="i">
                <h1 class="title">{{ org.name }}</h1>
            </div>
        </div> -->

        <div class="section container">
            <div class="org-card level" :title="testOrg.desc">
                <h1 class="title level-left" v-text="testOrg.name"></h1>

                <div class="edit-buttons">
                    <nuxt-link class='bx bxs-edit subtitle is-3' :to="`/org/edit/${testOrg.id}`">
                    </nuxt-link>
                    <a class='bx bxs-trash subtitle is-3' @click="deleteOrg">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            testOrg: {
                _id: "ewgfwet43t35y6",
                name: "Genuine Global",
                desc: "trash org by yash tryna goto college",
                websiteUrl: "https://projectgenuine.com",
                donateUrl: "https://gophundmeee.gg",
                shifts: []
            }
        };
    },
    computed: {
        userData() { return this.$store.state.userData; },
        hasOrganizations() {
            return this.userData && this.userData.organizations && 
            Array.isArray(this.userData.organizations.data) && 
            this.userData.organizations.data.length > 0;
        },
        organizations() {
            return this.userData.organizations.data
        }
    },
};
</script>

<style scoped>
.org-page {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.org-page > div {
    flex: 1;
}

.org-card {
    background: #363636;
    padding: 1rem;
}

.org-card *:not(a) {
    color: white !important;
}
</style>