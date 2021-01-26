<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >
        <button v-if="this.$store.state.page >= 1" @click="getNextPage">
            next page
        </button>
        <button v-if="this.$store.state.page > 1" @click="getPreviousPage">
            previous page
        </button>
        {{ pages }}

        <div class="region mt-4  md:mt-0 relative">

            <select class="border select border-solid cursor-pointer relative"
                    @change="getSortedList"
                    v-model="sorting"
                    name="sorting" id="region">
                <option disabled value="">Select your region</option>
                <option class="z-10" v-for="(value, sorting) in this.$store.state.sortedBy" :key="sorting.index"
                        :value="sorting">
                    {{ value }}
                </option>
            </select>
        </div>


        <div class="countries-list flex flex-wrap justify-center md:justify-between">
            <p class="movie__card" v-for="movie in moviezz" :key="movie.id">
                <router-link :to="{ name: 'DetailMovie', params: { name: movie.id }}">
                    <img class="movie__img" width="220" height="300"
                         :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                         :alt="movie.title">
                    <div class="movie__average">
                        {{ movie.vote_average }}
                    </div>
                    <div class="movie__text-wrapper">
                        <h3 class="movie__title">
                            {{ movie.title }}
                        </h3>
                        <div class="movie__genre">
                        <span v-for="genre in movie.genre_ids" :key="genre.index">
                            <span v-if="genre === 14">
                                Fantasy
                            </span>
                            <span v-if="genre === 28">
                                Action
                            </span>
                            <span v-if="genre === 12">
                                Adventure
                            </span>
                            <span v-if="genre === 14">
                                Action
                            </span>
                            <span v-if="genre === 16">
                                Animation
                            </span>
                            <span v-if="genre === 35">
                                Comedy
                            </span>
                            <span v-if="genre === 80">
                                Crime
                            </span>
                            <span v-if="genre === 99">
                                Documentary
                            </span>
                            <span v-if="genre === 18">
                                Drama
                            </span>
                            <span v-if="genre === 10751">
                                Family
                            </span>
                            <span v-if="genre === 36">
                                History
                            </span>
                            <span v-if="genre === 27">
                                Horror
                            </span>
                            <span v-if="genre === 10402">
                                Music
                            </span>
                            <span v-if="genre === 9648">
                                Mystery
                            </span>
                            <span v-if="genre === 10749">
                                Romance
                            </span>
                            <span v-if="genre === 878">
                                Science Fiction
                            </span>
                            <span v-if="genre === 10770">
                                TV Movie
                            </span>
                            <span v-if="genre === 53">
                               Thriller
                            </span>
                            <span v-if="genre === 10752">
                                War
                            </span>
                            <span v-if="genre === 37">
                               Western
                            </span>
                         </span>
                        </div>

                    </div>
                </router-link>
            </p>


            <!--     {{ movie.overview }}-->


        </div>

    </div>
</template>

<style lang="scss">

    .movie {
        &__card {
            max-width: 220px;
            min-height: 26rem;
            border-radius: 5px;
            border: .1px solid transparent;
            box-shadow: 5px 5px 10px rgba(0, 10, 0, .15);
            margin: 3rem 1rem 1rem 1rem;
            position: relative;
            transition: all .25s ease-in;
            &:hover {
                box-shadow: none;
                transform: translateY(-3px) rotateY(-30deg);
                transform-style: preserve-3d;
                border: .1px solid rgba(0,0,0, .1);
                perspective: 300px;
            }
        }

        &__img {
            border-radius: 5px;
        }
        &__text-wrapper {
            padding: 6px 8px 16px 8px;
        }

        &__average {
            position: absolute;
            top: -10px;
            right: -5px;
            background: darkgoldenrod;
            border-radius: 500px;
            height: 25px;
            width: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            box-shadow: 5px 5px 10px, rgba(0, 10, 0, .15);
            border-top: white;
        }

        &__title {
            font-size: 1.1rem;
            font-weight: bold;
            margin: 16px 0;
        }

        &__genre {
            span {
                span {
                    text-align: center;
                    margin: 10px 10px 0 0;
                    font-size: 12px;
                }
            }

        }
    }

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
                theme: 'theme-light',
                genres: null,
                sorting: null,
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
            pages() {
                return this.$store.state.page;
            }
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

            axios
                .get('https://api.themoviedb.org/3/movie/615677/similar?api_key=e08cb297a367a56d0964018be877415c&language=en-US&page=1')
                .then(response => {
                    console.log('netflix', response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {

                })

        },
        methods: {
            getNextPage() {
                this.$store.commit("SET_NEXT_PAGE");
                this.$store.dispatch("fetchMovies");
            },
            getPreviousPage() {
                this.$store.commit("SET_PREVIOUS_PAGE");
                this.$store.dispatch("fetchMovies");
            },
            getSortedList() {
                console.log(this.sorting)
                this.$store.commit("SET_SORTING", this.sorting);
                this.$store.dispatch("fetchMovies");
            }
        },
    }
</script>
