<template>
  <div>
    <div class="no-flex hero is-info">
      <div class="hero-body">
        <h1 class="subtitle is-2">Manage Organization</h1>
        {{id}}
      </div>
    </div>

    <div>
      <section v-if="access == false" class="alert">
        <b-notification type="is-danger" @close="$router.push('../../user');" has-icon
          aria-close-label="Close notification" role="alert">
          You cannot access the requested organization.
        </b-notification>
      </section>

      <section v-if="access == true" class="dashboard columns">
        <!--SIDE BAR-->
        <b-sidebar class="column is-one-fifth" position="static" :open="true" style="height:100vh" :can-cancel="false">
          <b-menu style="padding:4%;" class="sidebar">
              <br>
            <b-menu-list label="Menu">
              <b-menu-item @click="page='info'" icon="information-outline" label="Info"></b-menu-item>
              <b-menu-item @click="page='access'" icon="account-multiple-plus" label="Access"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
               <b-menu-item icon="exit-to-app" @click="$router.push('../../user');" label="Logout"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </b-sidebar>
         <!--PAGE-->
         <section v-if="page =='info'" class="column has-text-centered">
             <div class="container">
                 <h1 class="title">Info Page</h1>
             </div>
         </section>
         <section v-if="page =='access'" class="column has-text-centered">
           <div class="container">
             <h1 class="title">Manage Access</h1>
             <h2 class="subtitle">Add or remove organization members</h2>
             <div class="columns">
               <form class="column">
                 <b-field label="Email">
                   <b-input type="email" required placeholder="email@example.com" maxlength="30">
                   </b-input>
                 </b-field>
                 <b-button native-type="submit" type="is-success">Invite</b-button>
               </form>
               <div class="column">
                 <vs-table v-model="selectedUser">
                   <template #thead>
                     <vs-tr>
                       <vs-th>
                         Name
                       </vs-th>
                       <vs-th>
                         Email
                       </vs-th>
                       <vs-th>
                         Id
                       </vs-th>
                     </vs-tr>
                   </template>
                   <template #tbody>
                     <vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
                       <vs-td>
                         {{ tr.name }}
                       </vs-td>
                       <vs-td>
                         {{ tr.email }}
                       </vs-td>
                       <vs-td>
                         {{ tr.id }}
                       </vs-td>
                     </vs-tr>
                   </template>
                 </vs-table>
               </div>
             </div>
           </div>
         </section>
      </section>
  
    </div>

    <b-loading  :is-full-page="true" mobile="reduce" :active="loaded" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
export default {
    computed: {
        id() {
			return this.$route.params.orgid;
		},
    },
    data: function(){
        return {
          page: "info",
          loading: true,
          access: null,
          users: [{
              "id": 1,
              "name": "Leanne Graham",
              "username": "Bret",
              "email": "Sincere@april.biz",
              "website": "hildegard.org",
            },
            {
              "id": 2,
              "name": "Ervin Howell",
              "username": "Antonette",
              "email": "Shanna@melissa.tv",
              "website": "anastasia.net",
            },
            {
              "id": 3,
              "name": "Clementine Bauch",
              "username": "Samantha",
              "email": "Nathan@yesenia.net",
              "website": "ramiro.info",
            },
            {
              "id": 4,
              "name": "Patricia Lebsack",
              "username": "Karianne",
              "email": "Julianne.OConner@kory.org",
              "website": "kale.biz",
            },
            {
              "id": 5,
              "name": "Chelsey Dietrich",
              "username": "Kamren",
              "email": "Lucio_Hettinger@annie.ca",
              "website": "demarco.info",
            },
            {
              "id": 6,
              "name": "Mrs. Dennis Schulist",
              "username": "Leopoldo_Corkery",
              "email": "Karley_Dach@jasper.info",
              "website": "ola.org",
            },
            {
              "id": 7,
              "name": "Kurtis Weissnat",
              "username": "Elwyn.Skiles",
              "email": "Telly.Hoeger@billy.biz",
              "website": "elvis.io",
            },
            {
              "id": 8,
              "name": "Nicholas Runolfsdottir V",
              "username": "Maxime_Nienow",
              "email": "Sherwood@rosamond.me",
              "website": "jacynthe.com",
            },
            {
              "id": 9,
              "name": "Glenna Reichert",
              "username": "Delphine",
              "email": "Chaim_McDermott@dana.io",
              "website": "conrad.com",
            },
            {
              "id": 10,
              "name": "Clementina DuBuque",
              "username": "Moriah.Stanton",
              "email": "Rey.Padberg@karina.biz",
              "website": "ambrose.net",
            },
          ],
            selectedUser:false
        }
        },
    mounted: function(){
        this.loading = false
        this.access = true
    }
}
</script>

<style scoped>
.sidebar{
    height: 100vh;

}
</style>