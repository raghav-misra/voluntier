export default ({ store, redirect }) =>
    !store.state.userIdentity && redirect("/auth/login");