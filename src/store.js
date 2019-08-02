import Vue from "vue";
import Vuex from "vuex";
//no longer need this after we add axiosAuth --> import Axios from "axios";
import axiosAuth from "./axios-auth";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    error: ""
  },
  mutations: {
    AUTH_USER(state, userData) {
      state.idToken = userData.token;
      state.uerId = userData.userId;
    },
    SET_ERROR(state, errorMessage) {
      state.error = errorMessage;
    },
    //create click action step 4
    EMPTY_ERROR(state) {
      state.error = "";
    },
    //add action log out step 4
    CLEAR_DATA(state) {
      state.idToken = null;
      state.uerId = null;
    }
  },
  actions: {
    signUp({ commit }, authData) {
      axiosAuth
        .post(
          //complete the url with axios-auth.js
          //accounts:signUp?key=[API_KEY]
          "accounts:signUp?key=AIzaSyCArkd4uepay2eVAqzZxrXhTa-1GX5LVHc",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          //saving the auth info in the state
          commit("AUTH_USER", {
            token: res.data.idToken,
            userID: res.data.localId
          });
          //Local storage
          //set time expiration
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          //if we want to use router,remember to import router
          router.push({ name: "dashboard" });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message);
            commit("SET_ERROR", error.response.data.error.message);
          }
        });
    },
    signIn({ commit }, authData) {
      axiosAuth
        .post(
          "accounts:signInWithPassword?key=AIzaSyCArkd4uepay2eVAqzZxrXhTa-1GX5LVHc",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          commit("AUTH_USER", {
            token: res.data.idToken,
            userID: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          //if we want to use router,remember to import router
          router.push({ name: "dashboard" });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message);
            commit("SET_ERROR", error.response.data.error.message);
          }
        });
    }, //closing signin
    //create click action step 3
    clearError({ commit }) {
      commit("EMPTY_ERROR");
    },
    //add action log out step 1
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userId");
      //add action log out step 2
      //commit mutation to clear the state
      commit("CLEAR_DATA");
      //add action log out step 3
      //send user to signin route
      router.push({ name: "signin" });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});
// get the Web API key from firebase-project-projectOverview: AIzaSyCArkd4uepay2eVAqzZxrXhTa-1GX5LVHc, and just copy to here fot remember
