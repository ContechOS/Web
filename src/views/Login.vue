<template>
  <div class="container">
    <div class="card" style="width: 18rem">
      <i class="fas fa-user-circle fa-5x" id="account-icon"></i>
      <div class="card-body">
        <h5 class="card-title mb-5">Log in</h5>
        <div class="mb-3">
          <label for="mailInput" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="mailInput"
            aria-describedby="emailHelp"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div class="mb-5">
          <label for="passwordInput" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="password"
            minlength="8"
            required
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="agreeCheck"
            checked
            required
          />
          <label class="form-check-label" for="agreeCheck"
            >I agree to the terms</label
          >
        </div>
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-primary" @click="formSubmit">Log in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Login",
  methods: {
    formSubmit() {
      if (!document.getElementById("agreeCheck").checked) {
        alert("You must agree our terms in order to use our services");
        return;
      }
      let mail = document.getElementById("mailInput").value;
      let password = document.getElementById("passwordInput").value;
      this.requestAPI(mail, password);
    },
    async requestAPI(email, password) {
      const QUERY_SIGN_IN = gql`mutation ($email: String!, $password: String!) {
                signIn(signInInput: {
                  email: $email
                  password: $password
                }) {
                    token
                    user{
                      name
                    }
                }
            }`;
      this.$apollo.mutate({
          mutation: QUERY_SIGN_IN,
          variables: {
              email: email,
              password: password 
      }}).then((data) => {
        var sessionToken = data["data"]["signIn"]["token"]
        var userName = data["data"]["signIn"]["user"]["name"]

        sessionStorage.setItem('sessionToken', sessionToken); 
        sessionStorage.setItem('userName', userName); 

        this.$router.push("/");
      }).catch((error) => {
        console.error(error)
      })
    },
  },
};
</script>

<style>
#account-icon {
  padding: 15%;
  padding-bottom: 0;
  color: gray;
}
* {
  margin: 0 auto;
}
</style>
