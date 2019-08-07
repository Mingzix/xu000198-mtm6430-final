import Vue from "vue";
import Vuex from "vuex";
//no longer need this after we add axiosAuth --> import Axios from "axios";
import axiosAuth from "./axios-auth";
import router from "./router";
//0807 import global axios
import globalAxios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    error: "",
    user: null
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
    },
    STORE_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    //step 2
    signUp({ commit, dispatch }, authData) {
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

          //0807
          localStorage.setItem("userEmail", authData.email);
          //0807:step 1 for user data
          dispatch("storeUser", authData);

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
          //0807
          localStorage.setItem("userEmail", autoData.email);
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
    },

    //auto log in step 1
    //when refresh, if there is user id in the local storage,
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expirationDate");
      const userId = localStorage.getItem("userId");

      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      commit("AUTH_USER", {
        token: token,
        userId: userId
      });
    },
    //0807: step 4 user data
    storeUser({ state }, userData) {
      console.log("running action");

      if (!state.idToken) {
        console.log("returning user");

        return;
      }
      globalAxios
        .post(
          "https://mingzi-week-12-ed87a.firebaseio.com/users.json" +
            "?auth=" +
            state.idToken,
          userData
        )
        .then(res => console.log(res))
        .catch(error => console.log(error.message));
    },

    fetchUser({ commit, state }, userEmail) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get(
          "https://mingzi-week-12-ed87a.firebaseio.com/users.json" +
            "?auth=" +
            state.idToken
        )
        .then(res => {
          const data = res.data;
          for (let key in data) {
            const user = data[key];
            if (user.email == userEmail) {
              console.log(user);
              user.id = key;
              commit("STORE_USER", user);
            }
          }
        });
    },
    //edit user name step 4
    updateUser({ state }) {
      //define which to patch, go to the perticular user
      globalAxios
        .patch(
          "https://mingzi-week-12-ed87a.firebaseio.com/users/" +
            state.user.id +
            ".json" +
            "?auth=" +
            state.idToken,
          { name: state.user.name }
          //multi edits:  { name: state.user.name, email: state.user.email }
        )
        .then(res => console.log(res))
        .catch(error => console.log(error.reponse));
    }
    //end of edit user name step 4
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    //for display information on dashboard step 2
    getUser(state) {
      return state.user;
    }
  }
});
// get the Web API key from firebase-project-projectOverview: AIzaSyCArkd4uepay2eVAqzZxrXhTa-1GX5LVHc, and just copy to here fot remember
