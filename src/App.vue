<template>
  <div id="app"
       :class="this.$store.state.theme" >
    <Navbar />
    <router-view/>

  </div>
</template>

<script>
  import Navbar from "@/components/NavBar";
  export default {
    components: {Navbar}
  }
</script>

<style scoped>
  #app {
    min-height: 100vh;
  }
</style>
