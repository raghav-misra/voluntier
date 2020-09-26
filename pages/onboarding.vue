

<template>
    <div class="onboarding">
        <div class="section has-background-dark">
            <h1 class="title has-text-light">
                Fill out your profile.
            </h1>
        </div>

        <div class="section current-question">
            <div>
                <b-field 
                    v-for="(question, i) in questions" 
                    :label="question.text" :key="i" v-show="currentQuestion === i">
                    <b-input type="text" @input="setAnswer" />
                </b-field>

                <div class="buttons">
                    <!-- Next -->
                    <b-button 
                        type="is-success" 
                        v-if="currentQuestion < (questions.length - 1)"
                        @click="currentQuestion++">
                        Next Question
                    </b-button>

                    <!-- Finish -->
                    <b-button 
                        type="is-success" 
                        v-if="currentQuestion === (questions.length - 1)"
                        @click="submitAnswers()">
                        Save Profile
                    </b-button>

                    <!-- Go back -->
                    <b-button 
                        type="is-info" 
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
                    text: "First Name:",
                    name: "firstName"
                },
                {
                    text: "Last Name:",
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
            try {
                // Update data:
                const userData = await this.$axios(`${process.env.BASE_URL}/create-user`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.$store.state.userIdentity.token.access_token}`,
                        "Content-Type": "application/json"
                    },
                    data: this.answers
                });

                // Save to DB:
                this.$store.commit("SET_USER_DATA", userData);

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
}

.onboarding .current-question {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.onboarding .current-question > div {
    width: 75%;
}

.onboarding .label {
    font-size: 1.5rem !important;
}
</style>