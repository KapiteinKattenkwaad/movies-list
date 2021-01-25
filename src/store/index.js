import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        theme: 'theme-dark',
        movies: [],
    },
    mutations: {
        SET_THEME(state, theme) {
            state.theme = theme;

        },
        SET_MOVIES: (state, movies) => (state.movies = movies),
    },
    actions: {

        fetchMovies({commit}) {
            axios
                .get('https://api.themoviedb.org/3/movie/popular?api_key=e08cb297a367a56d0964018be877415c&language=en-US&page=2')
                .then(response => {
                    console.log('from store', response.data.results)
                    commit('SET_MOVIES', response.data.results)
                })
        },
        toggleTheme({state, commit}) {
            if (state.theme === 'theme-light') {
                commit('SET_THEME', 'theme-dark')
            } else if (state.theme === 'theme-dark') {
                commit('SET_THEME', 'theme-light')
            } else {
                commit('SET_THEME', 'theme-light')
            }

        }

    },

    getters: {
        getTheme: (state) => {
            return state.theme;
        },
        getAllmovies: (state) => state.movies,


    },
    modules: {}
})
