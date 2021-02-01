<template>
  <div class="login">
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <form class="form" @submit.prevent="handleLogin">
      <h3>
        Login
      </h3>
      <input type="email" v-model="email" placeholder="email">
      <input type="password" v-model="password" placeholder="password">
      <button class="btn btn--submit" type="submit">
        Login
      </button>
    </form>
    <div>
      <p class="form__register">
        No account yet? <b><router-link :to="{name: 'Register' }"> Register</router-link> </b> your account.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.form {
  display: flex;
  min-height: 60vh;
  max-width: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  margin: 4rem auto 1rem auto;
  border-radius: 15px;
  border: 1px solid rgba(0, 10, 0, .15);
  box-shadow: 5px 5px 10px rgba(0, 10, 0, .15);

  h3 {
    text-transform: uppercase;
    font-size: 2rem;
    margin-bottom: 3rem;
    background: radial-gradient(circle, var(--red) 0%,  var(--yellow) 20%, var(--green) 40%, var(--lightblue) 60%, var(--darkblue) 100%);
    -webkit-background-clip: text;
    color: transparent;
    background-size: 400%;
    animation: gradient 10s linear infinite alternate;
    font-family: Open Sans, sans-serif;
    font-weight: 100;
  }

  @keyframes gradient {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }

  input {
    display: block;
    border-radius: 4px;
    padding: 6px 4px;
    margin: 1rem 0 0 0;
    border-bottom: 3px solid transparent;
    background: rgba(255,255,255,.9);
    outline: none;
    &::placeholder {
      text-transform: uppercase;
      font-size: 12px;
      color: #111517;
    }
    &:focus {
      border-bottom: 2px solid var(--green);
    }
  }
  button {
    margin-top: 2rem;
    text-transform: uppercase;
  }
  &__register {
    text-align: center;
    margin: 1rem;
  }
}
</style>

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
