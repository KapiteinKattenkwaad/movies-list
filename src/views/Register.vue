<template>
  <div class="register">
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <form class="form" @submit.prevent="handleRegister">
      <h3>
        Register
      </h3>
      <input type="email" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">
      <button class="btn btn--submit" type="submit">
        Register
      </button>
    </form>
    <div>
      <p class="form__register">
        Already have an account? Go to <b><router-link :to="{name: 'Login' }"> Login</router-link> </b>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import 'firebase/auth';
import {auth} from './../firestore/firebase'


export default {
  name: 'Register',
  components: {

  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleRegister() {
      try {
        const user = auth.createUserWithEmailAndPassword(this.email, this.password)
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
