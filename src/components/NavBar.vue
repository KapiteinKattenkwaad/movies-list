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
          <button class="hamburger-menu" :class="{ 'active': isOpen } ">
            <svg viewBox="0 0 64 48">
              <path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
              <path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
              <path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
            </svg>
          </button>

        </div>
        <transition name="fade">
          <div v-if="isOpen" class="pop-out">
            <div class="common" @click="togglePopOut">
              <router-link
                  :to="{name: 'CommonFavorites' }">
                Common Favorites
              </router-link>
            </div>
            <div class="wrapper"   @click="togglePopOut">
              <button @click="toggleTheme">
                <div v-if="this.$store.state.theme === 'theme-dark'">
                  Light mode
                </div>
                <div v-else>
                  Dark mode
                </div>
              </button>
            </div>

            <div>
              <div class="wrapper"   @click="togglePopOut">
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
        </transition>

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

.hamburger-menu {
  --color: #fff;
  width: 36px;
  height: 36px;
  padding: 0;
  margin: 0;
  outline: none;
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  -webkit-appearence: none;
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 64px;
    height: 48px;
    top: -6px;
    left: -14px;
    stroke: var(--color);
    stroke-width: 4px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    display: block;
    position: absolute;

    path {
      transition: stroke-dasharray var(--duration, .85s) var(--easing, ease) var(--delay, 0s), stroke-dashoffset var(--duration, .85s) var(--easing, ease) var(--delay, 0s);
      stroke-dasharray: var(--array-1, 26px) var(--array-2, 100px);
      stroke-dashoffset: var(--offset, 126px);
      transform: translateZ(0);

      &:nth-child(2) {
        --duration: .7s;
        --easing: ease-in;
        --offset: 100px;
        --array-2: 74px;
      }

      &:nth-child(3) {
        --offset: 133px;
        --array-2: 107px;
      }
    }
  }

  &.active {
    svg {
      path {
        --offset: 57px;

        &:nth-child(1),
        &:nth-child(3) {
          --delay: .15s;
          --easing: cubic-bezier(.2, .4, .2, 1.1);
        }

        &:nth-child(2) {
          --duration: .4s;
          --offset: 2px;
          --array-1: 1px;
        }

        &:nth-child(3) {
          --offset: 58px;
        }
      }
    }
  }
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
