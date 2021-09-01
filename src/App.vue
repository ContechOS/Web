<template>
  <div id="nav">
    <router-link to="/">Home</router-link> <span v-if="!userName">| </span>
    <router-link to="/login" v-if="!userName">Login</router-link>
    <span v-if="!userName">| </span>
    <router-link to="/signup" v-if="!userName">Signup</router-link>
    <span v-if="userName">| </span>
    <a @click="logout" href="/" v-if="userName">Logout</a>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userName: sessionStorage["userName"],
      sessionToken: sessionStorage["sessionToken"],
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      console.log(sessionStorage["username"], sessionStorage["sessionToken"]);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #3472cf;
    }
  }
}
</style>
