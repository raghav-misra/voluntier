

<template>
    <div class="onboarding">
        <div class="section header has-background-dark">
            <h1 class="title has-text-light">
                Fill out your profile.
            </h1>
        </div>

        <div class="section current-question">
              <img src="@/assets/images/onboarding.svg" alt="onboarding" />
            <div>
                <b-field 
                    v-for="(question, i) in questions" 
                    :label="question.text" :key="i" v-show="currentQuestion === i">
                    <b-input type="text" @input="setAnswer" />
                </b-field>

                <div class="buttons">
                    <!-- Next -->
                    <b-button 
                        type="is-success is-light is-medium" 
                        v-if="currentQuestion < (questions.length - 1)"
                        @click="currentQuestion++">
                        Next Question
                    </b-button>

                    <!-- Finish -->
                    <b-button 
                        type="is-success is-light is-medium" 
                        v-if="currentQuestion === (questions.length - 1)"
                        @click="submitAnswers()">
                        Save Profile
                    </b-button>

                    <!-- Go back -->
                    <b-button 
                        type="is-info is-light is-medium" 
                        v-if="currentQuestion > 0"
                        @click="currentQuestion--">
                        Last Question
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";

export default {
    middleware: "auth",
    data() {
        return {
            questions: [
                {
                    text: "First Name",
                    name: "firstName"
                },
                {
                    text: "Last Name",
                    name: "lastName"
                },
                {
                    text: "State",
                    name: "state"
                },
                {
                    text: "City",
                    name: "city"
                }
            ],
            currentQuestion: 0,
            answers: {}
        }
    },

    methods: {
        setAnswer(answer) {
            this.answers[this.questions[this.currentQuestion].name] = answer;
        },
        async submitAnswers() {
            console.log(this.answers)
            try {
                // Update data:
                const userData = await this.$axios({
                    method: "post",
                    url: `${process.env.BASE_URL}/create-user/`,
                    data: this.answers,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 
                            `Bearer ${this.$store.state.userIdentity.token.access_token}`,
                        "X-POG-DATA": JSON.stringify(this.answers)
                    }
                });

                console.log(userData)

                // Save to DB:
                this.$store.commit("SET_USER_DATA", userData.data.data);

                // Success and redirect:
                Toast.open("Saved data!");
                this.$router.push("/user");
            }

            catch (e) {
                Toast.open(`Error: ${e}`);
            }
        }
    }
};
</script>

<style>
.onboarding {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
}

.onboarding input {
    background: #363636 !important;
    color: white !important;
}

.onboarding .header {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.onboarding .current-question {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.onboarding .current-question img:first-of-type {
    width: 25%;
    margin-right: 2rem;
}

.onboarding .current-question > div {
    width: 75%;
}

.onboarding .label {
    color: white !important;
    font-size: 2rem !important;
}
</style>