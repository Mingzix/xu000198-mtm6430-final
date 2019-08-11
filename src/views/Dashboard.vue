<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard</p>
    <p>your login email is {{user.email}}</p>
    <!---create form for edit the user's name - step 1---->
    <form @submit.prevent="submitForm">
      <p>Edit your profile</p>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name">
      </div>
      <div>
        <label for="age">Age:</label>
        <input type="text" id="age" v-model="user.age">
      </div>
      <div>
        <label for="city">City:</label>
        <input type="text" id="city" v-model="user.city">
      </div>
      <div>
        <label for="job">Job:</label>
        <input type="text" id="job" v-model="user.job">
      </div>
      <br>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>
<!----0807--->
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  //add information to dashboard step 1, then got to store.js
  computed: {
    ...mapGetters({
      //getUser is the getters name. userData is the property id,what we got from getter: getUser, we will put it into useData
      userData: "getUser"
    }),
    user() {
      return !this.userData ? false : this.userData;
    }
  },
  created() {
    this.getUserData();
  },
  methods: {
    //edit user name step 3: add the update user name action
    //next step , got to store.js
    ...mapActions(["fetchUser", "updateUser"]),
    getUserData() {
      let userEmail = localStorage.getItem("userEmail");
      this.fetchUser(userEmail);
    },
    //edit user name step 2:
    submitForm() {
      this.updateUser();
    }
  }
};
</script>


