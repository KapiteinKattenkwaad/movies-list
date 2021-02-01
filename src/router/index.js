import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailMovie from '../components/DetailMovie'
import FavoriteMovies from '../components/FavoriteMovies'
import CommonFavorites from '../components/CommonFavorites'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import 'firebase/auth';
import {auth} from './../firestore/firebase'

Vue.use(VueRouter)


const routes = [
    {
        path: '/movies',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
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
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/common',
      name: 'CommonFavorites',
      component: CommonFavorites,
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser;
    if (requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router
