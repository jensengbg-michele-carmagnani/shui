<template>
  <div id="app">
    <img class="lable-shui" src="./assets/topS.png" alt="Shui">
    <router-view/>
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.$store.dispatch('checkStatus')
  },
}
</script>

}

<style lang="scss">

  @import "./scss/main";
  

</style>
