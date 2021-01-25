<template>
  <div id="app"
       :class="this.$store.state.theme" >
    <router-view/>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #app {
    min-height: 100vh;
  }
</style>
