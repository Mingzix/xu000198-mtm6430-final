<template>
  <div id="content">
    <h1>Sign In</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" requried>
      </div>
      <div>
        <label for="pass">Password</label>
        <input type="password" v-model="pass" id="pass" requried>
      </div>

      <button type="submit">Sign in</button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass: ""
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.pass
      };
      this.signIn(formData);
    }
  }
};
</script>

<style>
form {
  border-radius: 10px;
  padding: 20px;
  background: white;
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
  max-width: 300px;
  margin: 0 auto;
}
form div {
  display: flex;
  justify-content: space-around;
}
label {
  width: 100px;
  display: block;
}

input {
  padding: 5px 10px;
  margin: 5px 0;
}
#content h1 {
  padding: 20px 0;
}
#content {
  padding-top: 100px;
}
button {
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 5px;
  background-color: rgb(211, 211, 211);
  display: flex;
  justify-content: center;
}
</style>