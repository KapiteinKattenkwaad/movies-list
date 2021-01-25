<template>
    <div class="detail-country">
        <Navbar/>
        <div class="detail-country-wrapper max-w-5xl mx-auto px-1">
            <router-link :to="{ name: 'Home'}">
                <div class="back-button flex content-center shadow-lg rounded border-solid
                            px-6 py-4 mt-8 flex mx-auto md:mx-0 w-24 ">
                    Back
                </div>
            </router-link>
            <div class="detail-wrapper flex items-center flex-col md:flex-row justify-between mt-16 text-center md:text-left ">
                {{ singleMovie.title }}
                <img width="500" height="700" :src="`https://image.tmdb.org/t/p/w500/${singleMovie.poster_path}`"
                     :alt="singleMovie.title">
                {{ singleMovie.tagline }}
                {{ singleMovie.overview }}

                <div v-for="genre in singleMovie.genres" :key="genre.index">
                    {{ genre.name }}
                </div>
                <a target="_blank" :href="`http://www.youtube.com/results?search_query=${singleMovie.title}+preview`">
                    Preview
                </a>
            </div>

        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import Navbar from "./NavBar";

    export default {
        name: 'DetailMovie',
        components: {Navbar},
        props: {

        },
        data() {
            return {
                singleMovie: {}
            }
        },
        methods: {
            getSingleCountry() {
                axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.name}?api_key=e08cb297a367a56d0964018be877415c&language=en-US/`)
                    .then(response => {
                        console.log(response.data)
                        this.singleMovie = response.data
                    }).catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            this.getSingleCountry()
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-flag  {
    animation: fly-in .3s ease;
}
.right-info {
    animation: fly-in .5s ease;
}

    @keyframes fly-in {
        0% {
            opacity: 0;
            transform: translateX(600px);
        }
        90% {
            opacity: 1;
            transform: translateX(-20px)
        }
        100% {
            transform: translateX(0)
        }
    }
</style>
