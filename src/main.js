import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import { gsap } from "gsap";
import {firestorePlugin} from "vuefire";
import './firestore/firebase'
import VueFire from 'vuefire'

Vue.use(gsap, firestorePlugin, VueFire)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
