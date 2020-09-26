import GoTrue from "gotrue-js";

export const state = () => ({
    auth: new GoTrue({
        APIUrl: process.env.IDENTITY_URL,
        setCookie: true
    }),
    currentUser: null
});

export const mutations = {
    SET_USER: (state, newUser) => state.currentUser = newUser
};