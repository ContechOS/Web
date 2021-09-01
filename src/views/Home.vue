<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Homepage</h1>
    <p v-if="getUser()">Welcome {{ getUser().name }}</p>
    <p v-if="!getUser()">You are not logged in yet</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "Home",
  methods: {
    ...mapGetters(["getUser"]),
  },
});
</script>

<style lang="scss">
* {
  text-align: center;
}
</style>
