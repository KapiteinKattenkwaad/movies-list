<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >
        genres: {{ this.$store.getters.getGenres }}
        <div v-if="loading">

            <div class="globe-wrapper flex justify-center flex-col text-center">
                <img class="globe"
                     src="./../assets/icons/worldwide.svg" alt="globe">
                <h5>
                    Loading
                </h5>
            </div>
        </div>
        <div v-else class="countries-list flex flex-wrap justify-center md:justify-between">
            <ul>
                <li v-for="genre in genres" :key="genre.index">
                    {{ genre.id }} {{ genre.name }}
                </li>
            </ul>
            <p v-for="movie in moviezz" :key="movie.id">

                <img width="200" height="300" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                     :alt="movie.title">
                {{ movie.title }}
                {{ movie.vote_average }}
                <!--     {{ movie.overview }}-->
                genre:
                {{ movie.genre }}
            <span v-for="genre in movie.genre_ids" :key="genre.index">
                <span v-if="genre === 14">
                    Action
                </span>
                {{ genre }}
            </span>
             <router-link :to="{ name: 'DetailMovie', params: { name: movie.id }}">
                    click

             </router-link>
            </p>

        </div>

    </div>
</template>

<style scoped lang="scss">
    .globe {
        width: 40vw;
        max-height: 60vh;
        margin: 4rem auto;
        animation: spin-around 3s linear infinite alternate-reverse;
    }

    @keyframes spin-around {
        0% {
            transform: rotateZ(0deg);
        }
        40% {
            transform: scale(.75);
        }
        100% {
            transform: scale(.45);
            opacity: .6;
        }
    }

    .select-region {
        position: absolute;
        top: 8px;
        left: 12px;
        z-index: 8;
        @media screen and (max-width: 600px) {
            left: 92px;
        }
    }

    .select {
        width: 13rem;
        border-radius: 3px;
        padding: .5rem 0;
    }


    @media screen and (max-width: 495px) {
        .countries-list {
            justify-content: center;
        }
    }

</style>

<script>
    import axios from 'axios'



    export default {
        name: 'AllMovies',
        components: {},
        props: {},
        data() {
            return {
                movies: null,
                region: null,
                nameCountry: null,
                isHidden: false,
                theme: 'theme-light',

                genres: null
            }
        },
        watch: {
            theme(newTheme) {
                newTheme === "theme-light"
                    ? document.querySelector("html").classList.remove("theme-dark")
                    : document.querySelector("html").classList.add("theme-dark");
            },
        },
        computed: {
            moviezz() {
                return this.$store.state.movies;
            },
        },

        mounted() {
            this.$store.dispatch("fetchMovies");
            axios
                .get('https://api.themoviedb.org/3/genre/movie/list?api_key=e08cb297a367a56d0964018be877415c&language=en-US')
                .then(response => {
                    console.log('genre', response.data.genres)
                    this.genres = response.data.genres
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {

                })

        },
        methods: {

        },
    }
</script>
