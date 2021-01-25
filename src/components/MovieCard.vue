<template>
    <div class="country-card w-56 ">
        <img
                class="h-32 w-56 rounded "
                width="220px" height="160px"
                :src=country.flag :alt=country.name>
        <div class="country-card-wrapper p-4 px-6">
            <b class="font-extrabold text-xl mt-3 mb-10 pb-16">
                {{ country.name }}
            </b>
            <div class="country-card-detail">
                <p>
                    <b>
                        Population:
                    </b>
                    {{ country.population }}
                </p>
                <p>
                    <b>
                        Region:
                    </b>
                    {{ country.region }}
                </p>
                <p>
                    <b>
                        Capital:
                    </b>
                    {{ country.capital }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DetailCountry',
        props: {
            country: Object,

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
