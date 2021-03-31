<template>
  <section id="sign-up">
    <article class="main">
      <img src="../assets/logo.png" alt="Shui" />

      <h4>flow freely</h4>
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

    <button @click="create" class="btn-letmein">Sign up</button>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    create() {
      this.$store.dispatch("signup", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
