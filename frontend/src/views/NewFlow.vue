<template>
  <section id="new-flow">
    <textarea
      v-model="info"
      class="text"
      type="text"
      placeholder="Share your message"
    />

    <input
      v-model="hashtags"
      type="text"
      class="hashtag-input"
      placeholder="#hastags"
    />
    <button @click="createFlow" class="publish">Publish</button>
  </section>
</template>

<script>
export default {
  name: "NewFlow",
  data() {
    return {
      info: "",
      hashtags: "",
    };
  },
  methods: {
    async createFlow() {
      await this.$store.dispatch("createFlow", {
        info: this.info,
        hashtags: this.hashtags,
      });
    },
  },
};
</script>

<style></style>
