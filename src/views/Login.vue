<template>
  <div class="login">
    <h1>
      Login
    </h1>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <form @submit.prevent="handleLogin">
      <h3>
        Login
      </h3>
      <input type="email" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">
      <button type="submit">
        Login
      </button>
    </form>
    <div>
      <p>
        No account yet? <b><router-link :to="{name: 'Register' }"> Register</router-link> </b> your account.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import 'firebase/auth';
import {auth} from './../firestore/firebase'

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const user = await auth.signInWithEmailAndPassword(this.email, this.password)
        console.log(user)
        this.$router.replace({name: 'Home'})
      }
      catch(error) {
        console.log(error)
      }
    }
  },

}
</script>
