<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Homepage</h1>
    <p v-if="userName">Welcome {{userName}} </p>
    <p v-if="!userName">You are not logged in yet</p>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      userName: sessionStorage["userName"],
      sessionToken: sessionStorage["sessionToken"],
    }
  },
  components: {},
});
</script>

<style lang="scss">
* {
  text-align: center;
}
</style>
