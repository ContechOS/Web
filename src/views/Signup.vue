<template>
  <div class="container">
    <div class="card" style="width: 18rem">
      <i class="fas fa-user-circle fa-5x" id="account-icon"></i>
      <div class="card-body">
        <h5 class="card-title mb-5">Sign up</h5>
        <div class="mb-3">
          <label for="nameInput" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            aria-describedby="emailHelp"
            placeholder="John"
            required
          />
        </div>
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
          <button class="btn btn-primary" @click="formSubmit">Sign up</button>
        </div>
      </div>
    </div>
    <p>PROVA {{ hello }}</p>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Register",
  data() {
    return {
      hello: "",
    };
  },
  methods: {
    formSubmit() {
      if (!document.getElementById("agreeCheck").checked) {
        alert("You must agree our terms in order to use our services");
        return;
      }
      let name = document.getElementById("nameInput").value;
      let mail = document.getElementById("mailInput").value;
      let password = document.getElementById("passwordInput").value;
      this.requestAPI(name, mail, password);
    },
    async requestAPI(name, mail, password) {
      this.$apollo.queries.test;
    },
  },
  apollo: {
    test: gql`
      query {
        test(id: "asas") {
          id
        }
      }
    `,
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
