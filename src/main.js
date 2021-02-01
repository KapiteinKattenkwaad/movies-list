import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import { gsap } from "gsap";
import {firestorePlugin} from "vuefire";
import './firestore/firebase'
import 'firebase/auth';
import {auth} from './firestore/firebase'
/*import firebase from 'firebase/app'*/

Vue.prototype.$axios = 'axios'

Vue.use(gsap, firestorePlugin)

/*const firebaseConfig = {
  apiKey: "AIzaSyARDyMhhgI2IqGiisTRpuHW1eC70ZBFxZY",
  authDomain: "movies-list-db.firebaseapp.com",
  databaseURL: "https://movies-list-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movies-list-db",
  storageBucket: "movies-list-db.appspot.com",
  messagingSenderId: "759508318345",
  appId: "1:759508318345:web:d4279cea154bd322c9ae58",
  measurementId: "G-LZMV2K7KMG"
}

firebase.initializeApp(firebaseConfig)*/


Vue.config.productionTip = false

let app = null;


auth.onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});


