<template>
  <div class="register">
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <form class="form" @submit.prevent="handleRegister">
      <h3>
        Register
      </h3>
      <input type="text" v-model="fname" placeholder="First name">
      <input required type="email" v-model="email" placeholder="email">
      <input required type="password" v-model="password" placeholder="password">
      <button class="btn btn--submit" type="submit">
        Register
      </button>
    </form>
    <div>
      <p class="form__register">
        Already have an account? Go to <b>
        <router-link :to="{name: 'Login' }"> Login</router-link>
      </b>
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
  components: {},
  data() {
    return {
      fname: '',
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    handleRegister() {
      auth.createUserWithEmailAndPassword(this.email, this.password).then(function(user) {
        // [END createwithemail]
        // callSomeFunction(); Optional
        user.updateProfile({
          displayName: this.fname
        }).then(function() {
          // Update successful.
        }, function(error) {
          console.log(error)
          // An error happened.
        });
      }, function(error) {
        // Handle Errors here.
        if (error.code === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });



    }
  },

}
</script>
