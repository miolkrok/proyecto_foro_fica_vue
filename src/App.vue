<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'autorizacion'" class="nav" />
    <router-view class="router-view" />
    <Footer />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;

  text-align: center;
  height: inherit;
}
.router-view {
  flex-grow: 1;
}
.nav {
  z-index: 3;
}
</style>
