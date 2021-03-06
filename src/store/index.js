import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        theme: 'theme-dark',
        movies: [],
        tvshows: [],
        page: 1,
        likedMovie: false,
        favouriteMovies: {},
        userId: null,
        tvOrMovie: 'movie',
        isLoading: true,
        sortBy: 'popularity.desc',
        sortedBy:
            {
                'popularity.desc': 'Popularity',
                'release_date.desc': 'Release date',
                'vote_average.desc': 'Voters average',
                'now_playing': 'Now Playing',
                'latest': 'Latest',
                'top_rated': 'Top rated',
                'upcoming': 'Upcoming'
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
        SET_USER_ID: (state, payload) => {
            state.userId = payload
        },
        CHANGE_FAVORITES: (state, singleMovie) => {

            if (state.favouriteMovies[singleMovie.id]) {
                delete state.favouriteMovies[singleMovie.id]
            } else {
                state.favouriteMovies[singleMovie.id] = singleMovie
            }
        },
        SET_MOVIES: (state, movies) => (state.movies = movies),
        SET_SEARCH_FILTER: (state, movies) => (state.movies = movies),
        SET_TV_OR_MOVIE: (state) => {
            if (state.tvOrMovie === 'movie') {
                state.tvOrMovie = 'tv'
            } else {
                state.tvOrMovie = 'movie'
            }
        }
    },
    actions: {

        fetchMovies({state, commit}) {
            axios
                .get(`https://api.themoviedb.org/3/discover/${state.tvOrMovie}?api_key=e08cb297a367a56d0964018be877415c&language=en-BE&sort_by=${state.sortBy}&include_adult=true&include_video=false&page=${state.page}`)
                .then(response => {
                    commit('SET_MOVIES', response.data.results)
                    state.isLoading = false
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
        getMovieId: (state, payload) => {
            state.movies.filter((movie)=> {
                return movie.id === payload
            })
        },
        getAllmovies: (state) => state.movies,

        getFavorites: (state) => {
            return state.movies;
        },



        getAllActionMovies: (state) => {
            state.movies.map((movie) => {
                movie.genre_ids.filter((genre) => {
                    return genre === 14
                })
            })
        },


    },
    modules: {}
})
