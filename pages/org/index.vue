<template>
    <div class="org-page">
        <!-- heading -->
        <div class="hero is-info">
            <div class="hero-body">
                <h1 class="subtitle is-2">Your Organizations</h1> 
            </div>
        </div>

        <!-- Show org cards -->
        <div v-if="hasOrganizations" class="section">
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
                    </div>
                </div>
            </div>
        </div>

        <!-- create btn -->
        <div class="has-text-centered section">
            <h1 v-if="!hasOrganizations" class="subtitle is-2">
                You currently have no organizations.
            </h1>

            <b-button type="is-primary is-large">
                Create an organization
            </b-button>
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


.org-card {
    background: #363636;
    padding: 1rem 1rem;
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