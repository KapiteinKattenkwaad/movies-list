<template>
    <div class="detail-country">
        <div class="detail-country-wrapper max-w-5xl mx-auto px-1">
            <router-link :to="{ name: 'Home'}">
                <div class="back-button flex content-center shadow-lg rounded border-solid
                            px-6 py-4 mt-8 flex mx-auto md:mx-0 w-24 ">
                    Back
                </div>
            </router-link>
          <div class="common">
            <p>
              What's the uid of the person?
            </p>
            <form class="common--form" @submit.prevent="getFavorite" >
              <input type="text" v-model="otherPersonId">
            </form>
          </div>
          <div v-if="state !== 'synced' ">
            <p>
              Loading...
            </p>
          </div>
            <div v-else class="countries-list flex flex-wrap justify-center md:justify-between">
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
                favoriteMovies: null,
              otherPersonId: null
            }
        },
        mounted() {
          this.getFavorite()
        },
        methods: {


            async getFavorite() {
                try {
                    let favorites = await db.collection(`${this.otherPersonId}`).get()
                    this.favoriteMovies = favorites.docs.map(doc => doc.data())

                }
                catch (error) {
                    this.errorMessage = JSON.stringify(error)
                    console.log(this.errorMessage)
                    this.state = 'error'
                }
            },

        },
        firestore() {
            return {
                firebaseData: db.doc(`${this.$store.state.userId}/${this.singleMovie.id}`)
            }
        },
        created: async function () {
            const docRef = db.doc(`${this.$store.state.userId}/${this.singleMovie.id}`);

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

.common {
  &--form {
    input {
      min-width: 16rem;
      font-size: 14px;
    }
  }
}
</style>
