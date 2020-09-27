import GoTrue from "gotrue-js";

export const state = () => ({
    auth: new GoTrue({
        APIUrl: process.env.IDENTITY_URL,
        setCookie: true
    }),
    userIdentity: null,
    userData: null
});

export const mutations = {
    SET_USER_IDENTITY: (current, newIdentity) => current.userIdentity = newIdentity,
    SET_USER_DATA: (current, newData) => current.userData = newData,
    LOGOUT: (current) => {
        current.auth.currentUser().logout();
        current.userIdentity = null;
        current.userData = null;
    }
};

export const actions = {
    async SYNC_USER_DATA({ commit, state }) {
        if (!state.userIdentity) return;
        console.log("User data update token: ", state.userIdentity.token.access_token);

        const userData = await this.$axios(`${process.env.BASE_URL}/get-user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${state.userIdentity.token.access_token}`
            }
        });

        userData.data.success && commit("SET_USER_DATA", userData.data.data);
    }
}