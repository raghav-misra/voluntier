<template>
	<div>
        <div class="top-bar-hero has-background-light">
            <div class="hero-body">
                <img class="logo" src="@/assets/logo.png" alt="logo" width="150" height="150" />
                <div>
                    <h1 class="has-text-primary title is-2">
                        VolunTier
                    </h1>
                    <h2 class="subtitle is-4">
                        voluntiering in california
                    </h2>
                </div>
            </div>
        </div>

        <div class="hero has-background-info">
            <div class="hero-body media">
                <div class="media-main has-text-centered">
                    <iframe 
                        src="https://www.youtube.com/embed/oHg5SJYRHA0"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        class="media-video"
                    >
                    </iframe>
                </div>

                <div class="media-content">
                    <div class="card">
                        <div class="container">
                            <h2 class="title is-2 has-text-primary">
                                Welcome to VolunTier
                            </h2>
                            <h1 class="title is-5 has-text-primary"> 
                                VolunTier is a way for (say what it is)
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <div class="header-before-cards card has-background-warning-light">
                    <div class="text-header-before-cards title is-2 has-text-primary">
                    <h1 class="title is-2 has-text-primary">
                    Start Volunteering and helping your community today!
                    </h1>
                    </div>
                </div>
        <div class="section has-text-centered">
            <div class="columns">
                <div class="column">
                    <div class="card has-background-warning-light">
                        <h2 class="title is-2 has-text-primary">
                        Find the nearest shift from your location
                        </h2>
                        <h1 class="subtitle is-5 has-text-primary"> 
                        paragraph text
                        </h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card has-background-warning-light">
                        <h2 class="title is-2 has-text-primary">
                        Get personalized recommended shifts
                        </h2>
                        <h1 class="subtitle is-5 has-text-primary"> 
                        paragraph text
                        </h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card has-background-warning-light">
                        <h2 class="title is-2 has-text-primary">
                        compete with an interactive leaderboard
                        </h2>
                        <h1 class="subtitle is-5 has-text-primary"> 
                        paragraph text
                        </h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card has-background-warning-light">
                        <h2 class="title is-2 has-text-primary">
                        column title
                        </h2>
                        <h1 class="subtitle is-5 has-text-primary"> 
                        paragraph text
                        </h1>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<style scoped>
.hero-body {
    display: flex;
    justify-content: center;
    vertical-align: bottom;
    align-items: center;
}
.top-bar-hero {
    margin-top:5rem;
}
.hero {
    margin-bottom: 12rem;
    margin-top: 10rem;
}

.media-main, .media-content {
    flex: 1;
    text-align: center;
}

.media-content .card * {
    color: #363636;
}

.media-content .card, .media-main .media-video {
    height: calc(100vw / 5);
    width: 95%;
    margin: 5%;
}

.media-main .media-video {
    height: calc(100vw / 5);
}

.column .card {
    height: 500px;
    width: 400px;
}

.header-before-cards {
    text-align: center;
    width: 200rem;
    height:5rem;
    margin-bottom: 10rem;
}



</style>

<script>
import GoTrue from "gotrue-js";
import { ToastProgrammatic as Toast } from 'buefy'
export default {
    computed: {
        auth() { return this.$store.state.auth; }
    },
    async mounted(){
        //Confirm if there is a hash
        if(location.hash.startsWith("#confirmation_token")){
            const token = window.location.hash.split("=")[1]
            if (token) {
                try {
                    await this.auth.confirm(token);
                    Toast.open("Your account has been verified")

                } catch (e) {
                    const error = `${e}`;
                    Toast.open(error)
                }
            }
        }
    }
};
</script>
