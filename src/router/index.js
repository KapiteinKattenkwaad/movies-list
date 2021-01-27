import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailMovie from '../components/DetailMovie'
import FavoriteMovies from '../components/FavoriteMovies'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
      path: '/movie/:id',
      name: 'DetailMovie',
      component: DetailMovie,
    },
    {
      path: '/favorites',
      name: 'FavoriteMovies',
      component: FavoriteMovies,
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
