<template>
    <div class="detail-country">
        <div class="detail-country-wrapper max-w-5xl mx-auto px-1">
            <router-link :to="{ name: 'Home'}">
                <div class="back-button flex content-center shadow-lg rounded border-solid
                            px-6 py-4 mt-8 flex mx-auto md:mx-0 w-24 ">
                    Back
                </div>
            </router-link>
            state: {{ state }}
            <div class="countries-list flex flex-wrap justify-center md:justify-between">
                <div class="movie__card" v-for="fav in favoriteMovies" :key="fav.index">
                    {{ fav.genre_ids }}
                    <div v-if="fav.title !== '' ">
                        <MovieCard
                                :movie=fav>
                        </MovieCard>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import MovieCard from "./MovieCard";
    import {db} from './../firestore/firebase'

    export default {
        name: 'FavoriteMovies',
        props: {},
        components: {
            MovieCard
        },
        data() {
            return {
                singleMovie: {},
                likedMovie: false,
                formData: {},
                state: 'loading',
                errorMessage: null,
                firebaseData: null,
                favoriteMovies: null
            }
        },
        mounted() {
          this.getFavorite()
        },
        methods: {
            handleFavoriteClick() {
                this.likedMovie = !this.likedMovie
                if (this.likedMovie === true) {
                    this.updateFirebase()
                } else if (this.likedMovie === false) {
                    this.deleteFavorite()
                }
            },
            async updateFirebase() {
                try {
                    await db.doc(`favorites/${this.singleMovie.id}`).set(this.singleMovie)
                    this.state = 'synced'
                }
                catch (error) {
                    this.errorMessage = JSON.stringify(error)
                    console.log(this.errorMessage)
                    this.state = 'error'
                }
            },
            async getFavorite() {
                try {
                    let favorites = await db.collection('favorites').get()
                    this.favoriteMovies = favorites.docs.map(doc => doc.data())
                    console.log('favos',this.favoriteMovies)
                }
                catch (error) {
                    this.errorMessage = JSON.stringify(error)
                    console.log(this.errorMessage)
                    this.state = 'error'
                }
            },
            async deleteFavorite() {
                try {
                    const docRef = db.doc(`favorites/${this.singleMovie.id}`);
                    let data = (await docRef.delete());
                    console.log('fb', data)
                }
                catch (error) {
                    this.errorMessage = JSON.stringify(error)
                    console.log(this.errorMessage)
                    this.state = 'error'
                }
            }
        },
        firestore() {
            return {
                firebaseData: db.doc(`favorites/jeanneke`)
            }
        },
        created: async function () {
            const docRef = db.doc(`favorites/jeanneke`);

            let data = (await docRef.get()).data();

            if (!data) {
                data = { title: '' }
                docRef.set(data)
            }
            this.formData = data;
            this.state = 'synced'
        },
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .fill-red {
        fill: indianred;
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
            margin: 2rem;
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
                background: indianred;
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
