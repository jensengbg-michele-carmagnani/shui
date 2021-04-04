<template>
  <div id="app">
    <img
      @click="goToFlows"
      class="lable-shui"
      src="./assets/topS.png"
      alt="Shui"
    />
    <router-view />
  </div>
</template>
<script>
export default {
 

    methods: {
      goToFlows() {
        this.$router.push("/flows");
      },
    },
  beforeMount() {
    this.$store.dispatch("checkStatus");
  },
};
</script>

}

<style lang="scss">
@import "./scss/main";
</style>
