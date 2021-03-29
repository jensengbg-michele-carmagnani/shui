<template>
   <section id="login">
  

    <article class="logo">
      <img src="@/assets/logo.png" alt="" />
      <h2>KEEP YOUR</h2>
      <h2>PASSWORD SAFE</h2>
    </article>

    <article class="input-field">
      <label for="username" class="lb-username">username</label>
      <input
        type="text"
        name="username"
        class="input-username"
        v-model="username"
      />
      <label for="password" class="lb-password">password</label>
      <input
        type="password"
        name="password"
        class="input-password"
        v-model="password"
      />
    </article>

    <button @click="letMeIn" class="btn-letmein">ogin</button>
    </section>
</template>

<script>
export default {
  name:"Login",
  data() {
    return {
      
    }
  },
}
</script>

<style>

</style>
