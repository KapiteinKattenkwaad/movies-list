<template>
  <div id="app"
       :class="this.$store.state.theme" >
    <Navbar />
    <router-view/>

  </div>
</template>

<script>
  import Navbar from "@/components/NavBar";
  export default {
    components: {Navbar}
  }
</script>

<style lang="scss">

  #app {
    min-height: 100vh;
  }

  .btn {
    text-transform: uppercase;
    padding: 12px 14px;
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    transition: all .3s ease;
    border-radius: 10px;
    border: none;
    max-width: 11rem;
    color: #111517;
    font-weight: 600;
    outline: none;
    &:hover {
      background: transparent;
      letter-spacing: 1px;
      color: white;
    }
    &--tv {
      background: var(--yellow);
      border: .5px solid var(--yellow);
    }
    &--favorites {
      background: var(--yellow);
      border: .5px solid var(--yellow);
      svg {
        fill: var(--red);
        margin-right: 12px;
      }
    }
    &--back {
      border: 1px solid var(--lightblue);
      background: var(--lightblue)
    }
    &--submit {
      border: 1px solid var(--green);
      background: var(--green);

    }
  }

</style>
