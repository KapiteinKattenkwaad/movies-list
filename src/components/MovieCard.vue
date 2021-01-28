<template>
    <div class=" ">

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
                    <span v-if="movie.genres">
                        <span v-for="genre in movie.genres" :key="genre.index">
                            {{ genre.name }}
                        </span>
                    </span>
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
        <span class="movie__heart"
              @click="handleFavoriteClick()">
                <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     id="heart-like"
                     :class="{  'fill-red': likedMovie  }">
                    <path d="M474.644 74.27C449.391 45.616 414.358 29.836 376 29.836c-53.948 0-88.103 32.22-107.255 59.25-4.969 7.014-9.196 14.047-12.745 20.665-3.549-6.618-7.775-13.651-12.745-20.665-19.152-27.03-53.307-59.25-107.255-59.25-38.358 0-73.391 15.781-98.645 44.435C13.267 101.605 0 138.213 0 177.351c0 42.603 16.633 82.228 52.345 124.7 31.917 37.96 77.834 77.088 131.005 122.397 19.813 16.884 40.302 34.344 62.115 53.429l.655.574c2.828 2.476 6.354 3.713 9.88 3.713s7.052-1.238 9.88-3.713l.655-.574c21.813-19.085 42.302-36.544 62.118-53.431 53.168-45.306 99.085-84.434 131.002-122.395C495.367 259.578 512 219.954 512 177.351c0-39.138-13.267-75.746-37.356-103.081zM309.193 401.614c-17.08 14.554-34.658 29.533-53.193 45.646-18.534-16.111-36.113-31.091-53.196-45.648C98.745 312.939 30 254.358 30 177.351c0-31.83 10.605-61.394 29.862-83.245C79.34 72.007 106.379 59.836 136 59.836c41.129 0 67.716 25.338 82.776 46.594 13.509 19.064 20.558 38.282 22.962 45.659a15 15 0 0028.524 0c2.404-7.377 9.453-26.595 22.962-45.66 15.06-21.255 41.647-46.593 82.776-46.593 29.621 0 56.66 12.171 76.137 34.27C471.395 115.957 482 145.521 482 177.351c0 77.007-68.745 135.588-172.807 224.263z"/>
                </svg>
            </span>
    </div>
</template>

<script>
    import {db} from './../firestore/firebase'

    export default {
        name: 'MovieCard',
        props: {
            movie: Object,

        },
        data() {
            return {
                likedMovie: false,
                clickedItem: '',
                favoriteMovies: null
            }
        },
        created: async function () {
            try {


                let favorites = await db.collection('favorites').get()
                this.favoriteMovies = favorites.docs.map(doc => doc.data())
                console.log(this.favoriteMovies)

            } catch (error) {
                this.errorMessage = JSON.stringify(error)
                console.log(this.errorMessage)

            }
        },
        mounted() {
            setTimeout(() => {
                let singleM = this.movie.id

                function isFavorite(movie) {
                    return movie.id === singleM;
                }
                console.log('fav', this.favoriteMovies.find(isFavorite));

                if (this.favoriteMovies.find(isFavorite)) {
                    this.likedMovie = true
                } else {
                    this.likedMovie = false
                }
            }, 1500)
        },
        methods: {
            handleFavoriteClick() {
                this.$store.commit("CHANGE_FAVORITES", this.movie);

                if (this.$store.state.favouriteMovies[this.movie.id] !== undefined) {
                    this.updateFirebase()
                } else if (this.$store.state.favouriteMovies[this.movie.id] === undefined) {
                    this.deleteFavorite()
                }

            }
        },
        firestore() {
            return {
                firebaseData: db.doc(`favorites/${this.movie.id}`)
            }
        },
    }
</script>

<style scoped>

</style>
