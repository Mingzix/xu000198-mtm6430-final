<template>
  <div id="app">
    <div class="heading">
      <h1>State Manager</h1>
      <div id="nav">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link v-if="!auth" :to="{ name: 'signup' }">Sign Up</router-link>
        <router-link v-if="!auth" :to="{ name: 'signin' }">Sign In</router-link>
        <router-link v-if="auth" :to="{ name: 'dashboard' }">Dashboard</router-link>
        <!---add action log out step 5: call the action--->
        <a v-if="auth" class="logout" @click="logout">Log out</a>
      </div>
    </div>
    <!--create click action step 1--->
    <div v-if="error" @click="clearError" class="error">{{ error }}</div>
    <router-view/>
    <footer>
      <p>Copyright ©Mingzi Xu</p>
    </footer>
  </div>
</template>
<script>
//create click action step 2
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["error"]),
    ...mapGetters({
      auth: "isAuthenticated"
    })
  },
  //create click action step 2
  //add action log out step 6:
  methods: {
    //add auto log in step 2
    ...mapActions(["clearError", "logout", "autoLogin"])
  },
  created() {
    this.autoLogin();
  }
};
</script>

<style>
.heading {
  background-color: beige;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  align-items: baseline;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1024px;
  margin: 0 auto;
}
h1 {
  margin: 0 auto;
  text-align: center;
}
#nav {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
}

#nav a:last-child {
  border: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
p {
  text-align: center;
}
.error {
  background-color: rosybrown;
  padding: 20px;
}

footer {
  background-color: beige;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>