<template>
  <div class="all-countries max-w-5xl pb-12 px-4 mt-12 mx-auto"
  >

    <div class="all-countries__btns">
      <button class="btn btn--tv" @click="changeTvShowOrMovie">
        <span v-if="$store.state.tvOrMovie === 'tv' ">
          MOVIES
        </span>
        <span v-if="$store.state.tvOrMovie === 'movie' ">
          TV SHOWS
        </span>
      </button>

      <router-link :to="{ name: 'FavoriteMovies'}">
        <div class="btn btn--favorites ">
          <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
               id="heart-like">
            <path
                d="M474.644 74.27C449.391 45.616 414.358 29.836 376 29.836c-53.948 0-88.103 32.22-107.255 59.25-4.969 7.014-9.196 14.047-12.745 20.665-3.549-6.618-7.775-13.651-12.745-20.665-19.152-27.03-53.307-59.25-107.255-59.25-38.358 0-73.391 15.781-98.645 44.435C13.267 101.605 0 138.213 0 177.351c0 42.603 16.633 82.228 52.345 124.7 31.917 37.96 77.834 77.088 131.005 122.397 19.813 16.884 40.302 34.344 62.115 53.429l.655.574c2.828 2.476 6.354 3.713 9.88 3.713s7.052-1.238 9.88-3.713l.655-.574c21.813-19.085 42.302-36.544 62.118-53.431 53.168-45.306 99.085-84.434 131.002-122.395C495.367 259.578 512 219.954 512 177.351c0-39.138-13.267-75.746-37.356-103.081zM309.193 401.614c-17.08 14.554-34.658 29.533-53.193 45.646-18.534-16.111-36.113-31.091-53.196-45.648C98.745 312.939 30 254.358 30 177.351c0-31.83 10.605-61.394 29.862-83.245C79.34 72.007 106.379 59.836 136 59.836c41.129 0 67.716 25.338 82.776 46.594 13.509 19.064 20.558 38.282 22.962 45.659a15 15 0 0028.524 0c2.404-7.377 9.453-26.595 22.962-45.66 15.06-21.255 41.647-46.593 82.776-46.593 29.621 0 56.66 12.171 76.137 34.27C471.395 115.957 482 145.521 482 177.351c0 77.007-68.745 135.588-172.807 224.263z"/>
          </svg>
          Favorites
        </div>
      </router-link>
    </div>

    <div class="region mt-4  md:mt-0 relative">
      <p>
        Filter:
      </p>
      <select class="border select border-solid cursor-pointer relative"
              @change="getSortedList"
              v-model="sorting"
              name="sorting" id="region">
        <option class="z-10" v-for="(value, sorting) in this.$store.state.sortedBy" :key="sorting.index"
                :value="sorting">
          {{ value }}
        </option>
      </select>
    </div>

    <button @click="getAction">
      action
    </button>
    <div class="movies__search">
      <form class="form--search" @submit.prevent="">
        <input type="text" v-model="searchMovies" placeholder="Search">
        <button class="btn btn--search" @click="handleSearch">
          Search
        </button>
      </form>
    </div>

    <div v-if=" $store.state.isLoading " class="loading-animation">
      <div class="loading"></div>
    </div>
    <div v-else class="countries-list flex flex-wrap justify-center md:justify-between">
      <p class="movie__card" v-for="(movie, index) in allMovies" :key="index">

        <span v-if="movie.poster_path">
        <transition name="fade">
          <MovieCard
              class="movie-card"
              :movie=movie>
          </MovieCard>
        </transition>
      </span>

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

.form{
  &--search {
    display: flex;

    align-items: center;
    input {
      display: inline-block;
      border-radius: 4px;
      padding: 6px 12px;
      border-bottom: 3px solid transparent;
      background: rgba(255,255,255,.9);
      outline: none;
      @media (min-width: 992px) {
        margin-right: 2rem;
      }
      &::placeholder {
        text-transform: uppercase;
        font-size: 12px;
        color: #111517;
      }
      &:focus {
        border-bottom: 2px solid var(--green);
      }
    }
  }
}

.movie-card {
  opacity: 0;
  transform: scale(.5);
}

.loading-animation {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-transform: uppercase;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -60px 0 0 -60px;
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 10px solid #19bee1;
}

.loading:after {
  content: '';
  width: 140%;
  height: 140%;
  position: absolute;
  border-radius: 100%;
  top: -20%;
  left: -20%;
  opacity: 0.7;
  box-shadow: rgba(255, 255, 255, 0.6) -4px -5px 3px -3px;
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.all-countries {
  &__btns {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    button {
      margin: 1rem 0 1rem 0;
    }

    @media (min-width: 992px) {
      justify-content: space-between;
      flex-direction: row;
    }

  }
}

.pagination {
  display: flex;

  margin: 3rem auto;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 2rem;
    color: #444444;
    border-radius: 10px;

    padding: 6px;
    background: white;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    outline: none;
    transition: all .3s ease;

    &:hover {
      letter-spacing: .7px;
    }
  }

  p {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
  }
}

.movie {
  &__card {
    max-width: 200px;
    min-height: 28rem;
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
    background: var(--lightblue);
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

.region {
  @media (max-width: 992px) {
    text-align: center;
  }

  select {
    border: none;
    background: var(--lightblue);
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
import gsap from "gsap";

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
      actionMovies: {},
      searchMovies: [],
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
    allMovies() {
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
    setTimeout(() => {
      gsap.to(".movie-card", {
        duration: .3,
        scale: 1,
        opacity: 1,
        stagger: 0.25
      });
    }, 1500)

    axios
        .get('https://api.themoviedb.org/3/movie/615677/similar?api_key=e08cb297a367a56d0964018be877415c&language=en-US&page=1')
        .then(response => {
          console.log('similar', response.data)
        })
        .then(() => {

        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {

        })
  },
  methods: {
    getAction() {
     return this.allMovies.map((movie) => {
       movie.genre_ids.filter((genre) => {
         if (genre === 14)
           this.actionMovies = movie
       })
      })
    },
    getNextPage() {
      window.scrollTo(0, 0);
      this.$store.commit("SET_NEXT_PAGE");
      this.$store.dispatch("fetchMovies");
    },
    getPreviousPage() {
      window.scrollTo(0, 0);
      this.$store.commit("SET_PREVIOUS_PAGE");
      this.$store.dispatch("fetchMovies");
    },
    getSortedList() {
      this.$store.commit("SET_SORTING", this.sorting);
      this.$store.dispatch("fetchMovies");
    },
    changeTvShowOrMovie() {
      console.log(this.$store.state.tvOrMovie)
      this.$store.commit("SET_TV_OR_MOVIE");
      this.$store.dispatch("fetchMovies");
    },
    handleSearch() {
        axios
            .get(`
https://api.themoviedb.org/3/search/movie?api_key=e08cb297a367a56d0964018be877415c&language=en-BE&page=1&include_adult=false&query=${this.searchMovies}`)
            .then(response => {
              console.log('search', response.data)
              this.$store.commit("SET_SEARCH_FILTER", response.data.results);
            })
            .catch(function (error) {
              console.log(error)
            })

    }

  },
}
</script>
