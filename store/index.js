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