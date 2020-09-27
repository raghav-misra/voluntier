<template>
  <div class="whole-page">

    <div class="hero is-primary">
      <div class="hero-body">
        <h1 class="subtitle is-2">Leaderboard</h1>
      </div>

    </div>

    <section class="container">
      <div class="chart">
        <h1 style="font-size: 50px" class="title leaderboard-header">
          Top 10 Volunteers in {{ userData.state.toUpperCase() }}
          <div class="sk-cube-grid" v-if="!loaded">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
          </div>
        </h1>

        <column-chart v-if="loaded" :data="top3">
        </column-chart>
      </div>
      <section v-if="loaded" class="columns">
        <div style="" class="medal 1stmedal column">
          <img src=@/assets/leaderboard/2nd.png alt="1stplacemedal">
        </div>
        <div style="" class="medal 1stmedal column">
          <img src=@/assets/leaderboard/1st.png alt="1stplacemedal">
        </div>
        <div style="" class="medal 1stmedal column">
          <img src=@/assets/leaderboard/3rd.png alt="1stplacemedal">
        </div>
      </section>
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
        top3: [],

      };
    },
    async created() {
      const res = await this.$axios(
        `${process.env.BASE_URL}/get-user-by-state`, {
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
      this.top3 = [
        [users[1].firstName, 100],
        [users[0].firstName, 200],
        [users[2].firstName, 50],
      ]
      this.loaded = true;

    },
  };

</script>

<style scoped>
  .leaderboard-header {
    margin-top: 5rem;
    margin-bottom: 5rem;
    text-align: center;
  }

  .medal {

    text-align: center;

  }

  .medal img {
    width: 5vw;
  }

  .sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 100px auto;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #333;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }

  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  @-webkit-keyframes sk-cubeGridScaleDelay {

    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }

    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

  @keyframes sk-cubeGridScaleDelay {

    0%,
    70%,
    100% {
      -webkit-transform: scale3D(1, 1, 1);
      transform: scale3D(1, 1, 1);
    }

    35% {
      -webkit-transform: scale3D(0, 0, 1);
      transform: scale3D(0, 0, 1);
    }
  }

</style>
