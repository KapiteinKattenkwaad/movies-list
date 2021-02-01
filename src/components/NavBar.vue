<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class=" shadow-lg font-semibold "
       :class="this.$store.state.theme">
    <div class="max-w-5xl mx-auto flex justify-between content-center px-4 py-3 ">
      <p>
        <router-link :to="{name: 'Home' }">
          Movies List
        </router-link>
      </p>
      <small>
        Add your favorite movies to your list.
      </small>
      <div>
        logged in {{ loggedIn }}
        <span v-if="loggedIn">
           <button @click="handleLogOut">
            Log out
          </button>
        </span>
        <span v-else>
           <router-link :to="{name: 'Login' }">Login</router-link>

        </span>
      </div>
      <div>
        <button @click="toggleTheme">
          <div v-if="this.$store.state.theme === 'theme-dark'">
            Light mode
          </div>
          <div v-else>
            Dark mode
          </div>
        </button>
      </div>
    </div>

  </nav>

</template>

<script>
import {mapGetters} from "vuex";
import 'firebase/auth';
import {auth} from './../firestore/firebase'

export default {
  name: 'Navbar',
  props: {},
  data() {
    return {
      loggedIn: false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("signed in");
        this.loggedIn = true;
      } else {
        // No user is signed in.
        this.loggedIn = false;
        console.log("signed out", this.loggedIn);
      }
    })
  },
  computed: {
    ...mapGetters({theme: "getTheme"}),
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
    async handleLogOut() {
      try {
        const data = await auth.signOut()
        console.log(data)
        this.$router.replace({name: 'Login'})
      } catch (error) {
        console.log(error)
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-active, a {
  margin: 0 1rem 0 0;
}

button {
  outline: none;
  border: transparent;
}

@media screen and (max-width: 690px) {
  small {
    display: none;
  }
}

</style>
