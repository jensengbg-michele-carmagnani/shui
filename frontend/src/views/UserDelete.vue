<template>
  <select  id="user-delete">
    <img class="goTo-login" @click="goToLogin" src="../assets/topS.png" alt="">
    <p>you no longer exists</p>
    <p>in Shui system</p>
  </select>
</template>

<script>
export default {
  name: "UserDelete",
  data() {
    return {
      
    }
  },
  methods: {
    goToLogin(){
      this.$router.push('/login')
    }
  },
};
</script>

<style></style>
