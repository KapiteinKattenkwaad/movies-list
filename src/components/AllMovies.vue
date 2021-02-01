<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >


        <button class="button button-tv">
            TV Shows
        </button>

        <router-link :to="{ name: 'FavoriteMovies'}">
            <div class="button flex content-center shadow-lg rounded border-solid
                            px-6 py-4 mt-8 flex mx-auto md:mx-0 w-24 ">
                Favorites
            </div>
        </router-link>


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
            <p class="movie__card" v-for="(movie, index) in moviezz" :key="index">

                <transition name="fade">
                    <MovieCard
                            :movie=movie>
                    </MovieCard>
                </transition>
            </p>

        </div>

        <div class="pagination">
            <button v-if="this.$store.state.page > 1" @click="getPreviousPage">
                previous
            </button>
            <p>
                {{ pages }}
            </p>
            <button v-if="this.$store.state.page >= 1" @click="getNextPage">
                next
            </button>

        </div>

    </div>
</template>

<style lang="scss">

    .pagination {
        display: flex;
        max-width: 200px;
        margin: 2rem auto;
        justify-content: center;
        align-items: center;

        button {
            margin: 0 2rem;
            color: #444444;
            border-radius: 5px;
            border: .2px solid #444444;
            padding: 6px;
            background: white;
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 600;
        }

        p {
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 600;
        }
    }

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
                transform: translateY(-3px);
                transform-style: preserve-3d;
                border: .1px solid rgba(0, 0, 0, .1);
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

        &__heart {
            position: absolute;
            bottom: 5px;
            right: 5px;
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
    import MovieCard from "./MovieCard";


    export default {
        name: 'AllMovies',
        components: {MovieCard},
        props: {},
        data() {
            return {
                theme: 'theme-light',
                genres: null,
                sorting: null,
                likedMovie: true,
                clickedItem: '',
                favoriteMovies: [],
                newFavorite: '',
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
            },
            favorites() {
                return this.$store.state.favouriteMovies
            }
        },

        mounted() {
            this.$store.dispatch("fetchMovies");
            axios
                .get('https://api.themoviedb.org/3/tv/{tv_id}/watch/providers?api_key=<<api_key>>')
                .then(response => {
                    this.genres = response.data.genres
                    console.log('watchpr', this.genres)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {

                })

            axios
                .get('https://api.themoviedb.org/3/movie/615677/similar?api_key=e08cb297a367a56d0964018be877415c&language=en-US&page=1')
                .then(response => {
                    console.log('similar', response.data)
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
                this.$store.commit("SET_SORTING", this.sorting);
                this.$store.dispatch("fetchMovies");
            },

        },
    }
</script>
