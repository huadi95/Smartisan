<template>
  <div id="app">
    <header-nav />
    <router-view />
    <footer-nav />
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav";
import FooterNav from "./components/FooterNav";
export default {
  name: "App",
  components: {
    HeaderNav,
    FooterNav
  }
};
</script>

<style scoped>
</style>
