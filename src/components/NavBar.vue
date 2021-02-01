<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class=" shadow-lg font-semibold "
       :class="this.$store.state.theme">
    <div class="max-w-5xl mx-auto flex justify-between items-center content-center px-4 py-3 ">
      <p>
        <router-link :to="{name: 'Home' }">
          Movies List
        </router-link>
      </p>
      <small>
        Add your favorite movies to your list.
      </small>
      <div>
        <div class="hamburger"
             @click="togglePopOut"
             :class="{ 'hamburger--closed': isOpen } ">
          <svg viewBox="0 0 100 80" width="35" height="35">
            <rect width="100" height="15" rx="8"></rect>
            <rect y="30" width="100" height="15" rx="8"></rect>
            <rect y="60" width="100" height="15" rx="8"></rect>
          </svg>
        </div>
        <div v-if="isOpen" class="pop-out">
          <div class="common">
            <router-link :to="{name: 'CommonFavorites' }">
              Common Favorites
            </router-link>
          </div>
          <button @click="toggleTheme">
            <div v-if="this.$store.state.theme === 'theme-dark'">
              Light mode
            </div>
            <div v-else>
              Dark mode
            </div>
          </button>

          <div>
        <span v-if="loggedIn">
           <button @click="handleLogOut">
            Log out
          </button>
        </span>
            <span v-else>
           <router-link :to="{name: 'Login' }">Login</router-link>

        </span>
          </div>
        </div>
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
      loggedIn: false,
      isOpen: false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        let uid = auth.currentUser.uid;
        this.$store.commit("SET_USER_ID", uid);
        // User is signed in.
        this.loggedIn = true;
      } else {
        // No user is signed in.
        this.loggedIn = false;
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
    togglePopOut() {
      this.isOpen = !this.isOpen
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
<style scoped lang="scss">
.router-link-active, a {
  margin: 0 1rem 0 0;
}


.hamburger {
  cursor: pointer;
  transition: .8s ease;
  margin-right: 1rem;

  &--closed {
    svg {
      rect {
        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(1) {
          transform: skewX(45deg);
        }
      }
    }
  }
}

.pop-out {
  position: absolute;
  top: 65px;
  right: 0;
  box-shadow: 5px 5px 10px rgba(0, 10, 0, .15);
  padding: 2rem 1rem;
  background: var(--lightblue);
  border-radius: 5px;
}

@media screen and (max-width: 690px) {
  small {
    display: none;
  }
}

</style>
