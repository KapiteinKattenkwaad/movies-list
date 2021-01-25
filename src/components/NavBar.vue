<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav class=" shadow-lg font-semibold "
         :class="this.$store.state.theme">
        <div class="max-w-5xl mx-auto flex justify-between content-center px-4 py-3 ">
            <p>
               Movies List
            </p>
            <small>
                Add your favorite movies to your list.
            </small>
            <div>
                <button @click="toggleTheme">
                    <div v-if="this.$store.state.theme === 'theme-dark'">
                        Light mode
                    </div>
                    <div v-else>
                        Dark mode
                    </div>
                </button>
            </div>
        </div>

    </nav>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'Navbar',
        props: {},
        computed: {
            ...mapGetters({theme: "getTheme"}),
        },
        methods: {
            toggleTheme() {
                this.$store.dispatch("toggleTheme");
            },
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    button {
        outline: none;
        border: transparent;
    }

    @media screen and (max-width: 690px) {
        small {
            display: none;
        }
    }

</style>
