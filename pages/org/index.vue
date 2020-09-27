<template>
    <div class="org-page">
        <div class="no-flex hero is-info">
            <div class="hero-body">
                <h1 class="subtitle is-2">Your Organizations</h1> 
            </div>
        </div>

        <div v-if="hasOrganizations" class="section container">
            <div 
                v-for="(org, i) in organizations" :key="i" 
                class="org-card level"
            >
                <div class="level-left level-item">
                    <div>
                        <h1 class="title" style="margin-bottom: 1.25rem;" v-text="org.name"></h1>
                        <h2 class="subtitle" v-text="org.desc"></h2>
                    </div>
                </div>

                <div class="level-right">
                    <div>
                        <nuxt-link 
                            title="Edit" 
                            class='level-item bx bxs-dashboard subtitle is-4' 
                            :to="`/org/edit/${org._id}`"
                        ></nuxt-link>
                        <a
                            title="Delete" 
                            class='bx bxs-trash subtitle is-4' 
                            @click="deleteOrg"
                        >
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="org-card level">
                <div class="level-left level-item">
                    <div>
                        <h1 class="title" style="margin-bottom: 1.25rem;" v-text="testOrg.name"></h1>
                        <h2 class="subtitle" v-text="testOrg.desc"></h2>
                    </div>
                </div>

                <div class="level-right">
                    <div>
                        <nuxt-link title="Edit" class='level-item bx bxs-dashboard subtitle is-4' :to="`/org/edit/${testOrg._id}`">
                        </nuxt-link>
                        <a title="Delete" class='bx bxs-trash subtitle is-4' @click="deleteOrg">
                        </a>
                    </div>
                </div>
            </div>

           <div class="has-text-centered">
                <b-button type="is-primary is-large">Create an organization</b-button>
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

.org-page > div:not(.no-flex) {
    flex: 1;
}

.org-card {
    background: #363636;
    padding: 0.5rem 1rem;
    margin: 1rem 2rem;
    border-radius: 20px;
}

.org-card * {
    color: white;
}

.org-card a:hover {
    color: cornflowerblue;
}
</style>