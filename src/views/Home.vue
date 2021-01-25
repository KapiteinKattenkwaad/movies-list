<template>
  <div class="home">
    <Navbar />
  <AllMovies />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/NavBar";
import { mapGetters } from "vuex";
import AllMovies from "../components/AllMovies";

export default {
  name: 'Home',
  components: {
    AllMovies,
      Navbar,

  },
  beforeMount() {
    this.$store.dispatch("initTheme");
  },
  computed: {
    ...mapGetters({ theme: "getTheme" }),
  },
  watch: {
    theme(newTheme) {
      if (newTheme === "theme-light") {
        document.querySelector("html").classList.remove("theme-light")
        document.querySelector("html").classList.add("theme-dark")
      } else if (newTheme === 'theme-dark') {
        document.querySelector("html").classList.remove("theme-dark")
        document.querySelector("html").classList.add("theme-light")
      }

    },
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
  },
}
</script>
