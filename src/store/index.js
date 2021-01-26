import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        theme: 'theme-dark',
        movies: [],
        page: 1,
        likedMovie: false,
        sortBy: 'popularity.desc',
        sortedBy:
            {
                'popularity.desc': 'Popularity',
                'release_date.desc': 'Release date',
                'vote_average.desc': 'Voters average'
            }
    },
    mutations: {
        SET_THEME(state, theme) {
            state.theme = theme;
        },
        SET_NEXT_PAGE: (state) => {
            state.page++
        },
        SET_PREVIOUS_PAGE: (state) => {
            state.page--
        },
        SET_SORTING: (state, sorted) => {
            state.sortBy = sorted
        },
        SET_LIKED_MOVIE: (state) => {
            state.likedMovie = !state.likedMovie
        },
        SET_MOVIES: (state, movies) => (state.movies = movies),
    },
    actions: {

        fetchMovies({state, commit}) {
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?api_key=e08cb297a367a56d0964018be877415c&language=en-BE&sort_by=${state.sortBy}&include_adult=true&include_video=false&page=${state.page}`)
                .then(response => {
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


        getAllActionMovies: (state) => {
            state.movies.map((movie) => {

                return movie
            })
        }


    },
    modules: {}
})
