<template>
    <div class="">
        <div class=" max-w-5xl mx-auto px-1">
            <router-link :to="{ name: 'Home'}">
                <div class="btn btn--back w-32 mt-8
                            ">
                    Back
                </div>
            </router-link>


            <div class="movie-detail flex items-center flex-col md:flex-row justify-between text-center md:text-left ">
              <div >
                <img class="movie-detail__img" width="500" height="700"
                     :src="`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`"
                     :alt="singleMovie.title">
              </div>
                <div class="movie-detail__text-wrapper">
                    <h1 v-if="singleMovie.title" class="movie-detail__title">
                        {{ singleMovie.title }}
                    </h1>
                    <h1 v-else-if="singleMovie.name" class="movie-detail__title">
                        {{ singleMovie.name }}
                    </h1>
                    <h4 class="movie-detail__tagline">
                        {{ singleMovie.tagline }}
                    </h4>
                    <p class="movie-detail__overview">
                        {{ singleMovie.overview }}
                    </p>
                    <div class="movie-detail__genre" v-for="genre in singleMovie.genres" :key="genre.index">
                        {{ genre.name }}
                    </div>

                    <p class="movie-detail__favorite"
                       @click="handleFavoriteClick">
                        <transition name="fade">
                            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 id="heart-like"
                                 :class="{  'fill-red': likedMovie }">
                                <path d="M474.644 74.27C449.391 45.616 414.358 29.836 376 29.836c-53.948 0-88.103 32.22-107.255 59.25-4.969 7.014-9.196 14.047-12.745 20.665-3.549-6.618-7.775-13.651-12.745-20.665-19.152-27.03-53.307-59.25-107.255-59.25-38.358 0-73.391 15.781-98.645 44.435C13.267 101.605 0 138.213 0 177.351c0 42.603 16.633 82.228 52.345 124.7 31.917 37.96 77.834 77.088 131.005 122.397 19.813 16.884 40.302 34.344 62.115 53.429l.655.574c2.828 2.476 6.354 3.713 9.88 3.713s7.052-1.238 9.88-3.713l.655-.574c21.813-19.085 42.302-36.544 62.118-53.431 53.168-45.306 99.085-84.434 131.002-122.395C495.367 259.578 512 219.954 512 177.351c0-39.138-13.267-75.746-37.356-103.081zM309.193 401.614c-17.08 14.554-34.658 29.533-53.193 45.646-18.534-16.111-36.113-31.091-53.196-45.648C98.745 312.939 30 254.358 30 177.351c0-31.83 10.605-61.394 29.862-83.245C79.34 72.007 106.379 59.836 136 59.836c41.129 0 67.716 25.338 82.776 46.594 13.509 19.064 20.558 38.282 22.962 45.659a15 15 0 0028.524 0c2.404-7.377 9.453-26.595 22.962-45.66 15.06-21.255 41.647-46.593 82.776-46.593 29.621 0 56.66 12.171 76.137 34.27C471.395 115.957 482 145.521 482 177.351c0 77.007-68.745 135.588-172.807 224.263z"/>
                            </svg>
                        </transition>
                        <span v-if="likedMovie">
                                 Added!
                            </span>
                        <span v-else>
                                 Add to favorites
                            </span>
                    </p>
                    <a target="_blank"
                       :href="`http://www.youtube.com/results?search_query=${singleMovie.title}+preview`">
                        <button class="movie-detail__preview">
                            Preview
                        </button>
                    </a>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import {db} from './../firestore/firebase'

    export default {
        name: 'DetailMovie',
        props: {},
        data() {
            return {
                singleMovie: {},
                likedMovie: false,
                formData: {},
                state: 'loading',
                errorMessage: null,
                firebaseData: null,
                favoriteMovies: null,
            }
        },
        computed: {
        },
        methods: {
            getSingleMovie() {
                axios.get(`https://api.themoviedb.org/3/${this.$store.state.tvOrMovie}/${this.$route.params.name}?api_key=e08cb297a367a56d0964018be877415c&language=en-US/`)
                    .then(response => {
                      console.log('single movie', response.data)
                        this.singleMovie = response.data
                    }).catch(error => {
                    console.log(error)
                })
            },
            handleFavoriteClick() {
                this.$store.commit("CHANGE_FAVORITES", this.singleMovie);
                if (this.$store.state.favouriteMovies[this.singleMovie.id] !== undefined) {
                    this.updateFirebase()
                } else if (this.$store.state.favouriteMovies[this.singleMovie.id] === undefined) {
                    this.deleteFavorite()
                }

                if (this.$store.state.favouriteMovies[this.singleMovie.id] !== undefined) {
                    if (this.singleMovie.id === this.$store.state.favouriteMovies[this.singleMovie.id].id) {
                        this.likedMovie = true
                    }
                } else {
                    this.likedMovie = false
                }
            },
            async updateFirebase() {
                try {
                    await db.doc(`${this.$store.state.userId}/${this.singleMovie.id}`).set(this.singleMovie)
                    this.state = 'synced'
                } catch (error) {
                    this.errorMessage = JSON.stringify(error)
                    console.log(this.errorMessage)
                    this.state = 'error'
                }
            },

            async deleteFavorite() {
                try {
                    const docRef = db.doc(`${this.$store.state.userId}/${this.singleMovie.id}`);
                    let data = (await docRef.delete());
                   console.log(data)
                } catch (error) {
                    this.errorMessage = JSON.stringify(error)
                    console.log(this.errorMessage)
                    this.state = 'error'
                }
            }
        },
        firestore() {
            return {
                firebaseData: db.doc(`${this.$store.state.userId}/${this.singleMovie.id}`)
            }
        },
        mounted() {
            this.getSingleMovie()
            setTimeout(() => {

                let singleM = this.singleMovie.id
                function isFavorite(movie) {
                    return movie.id === singleM;
                }


                setTimeout(() => {
                    if (this.favoriteMovies.find(isFavorite)) {
                        this.likedMovie = true
                    } else {
                        this.likedMovie = false
                    }
                })


               /* if (this.$store.state.favouriteMovies[this.singleMovie.id] !== undefined) {
                    if (this.singleMovie.id === this.$store.state.favouriteMovies[this.singleMovie.id].id) {
                        this.likedMovie = true
                    }
                } else {
                    this.likedMovie = false
                }*/
            }, 800)

        },
        created: async function () {
            try {
                const docRef = db.doc(`${this.$store.state.userId}/${this.singleMovie.id}`);
                let data = (await docRef.get()).data();

                let favorites = await db.collection('favorites').get()
                this.favoriteMovies = favorites.docs.map(doc => doc.data())

                if (!data) {
                    data = {title: ''}
                    docRef.set(data)
                }

                this.formData = data;
                this.state = 'synced'
            } catch (error) {
                this.errorMessage = JSON.stringify(error)
                console.log(this.errorMessage)
                this.state = 'error'
            }
        },
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .fill-red {
        fill: var(--red);
    }

    .fill-white {
        fill: white;
    }

    .movie-detail {
        &__title {
            font-size: 1.6rem;
            font-weight: 600;
        }

        &__img {
            max-height: 80vh;
            margin: 2rem 2rem 2rem 0;
            animation: fly-in .8s ease-in;
            @media (max-width: 992px) {
                max-height: 60vh;
                max-width: 90vw;
            }
        }

        &__text-wrapper {
            animation: fly-in .7s ease-in;
            padding: 0 1rem;
        }

        &__tagline {
            font-size: 1.2rem;
            margin: .6rem 0;
        }

        &__overview {
            margin: 2rem 0;
        }


        &__favorite {
            cursor: pointer;
            fill: white;
            margin: 2rem 0;

            svg {
                display: inline;
            }
        }

        &__genre {
            font-size: 12px;
            display: inline;
            margin: 0 1rem 0 0;
        }

        &__preview {
            display: block;
            margin-top: 3rem;
            text-transform: uppercase;
            padding: 6px 8px;
            text-align: center;
            border-radius: 5px;
            border: 1px solid white;
            transition: all .3s ease;
            @media (max-width: 992px) {
                display: flex;
                margin: 3rem auto;
            }

            &:hover {
                background: var(--red);
                letter-spacing: .7px;
            }
        }

        @keyframes fly-in {
            0% {
                opacity: 0;
                transform: translateY(200px);
            }
            90% {
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
</style>
