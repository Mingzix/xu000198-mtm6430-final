import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import SignIn from "./views/SignIn.vue";
import Dashboard from "./views/Dashboard.vue";
// Navigation Guard step 1
//lock the dashboard when the user didn't sign in
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      //Navigation Guard step 2
      //when the user didn't sign in ,when click the dashboard ,it will trabsfer to the sign in page.
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("/signin");
        }
      }
    }
  ]
});
