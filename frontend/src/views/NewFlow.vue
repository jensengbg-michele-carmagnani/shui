<template>
  <section id="new-flow">
    <textarea
      v-bind="info"
      class="text"
      type="text"
      placeholder="Share your message"
    />

    <input
      v-bind="hashtags"
      type="text"
      class="hashtag-input"
      placeholder="#hastags"
    />
    <button @click="newFlow" class="publish">Publish</button>
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
    newFlow() {
      this.$store.dispatch("newFlow", {
        info: this.info,
        hashtags: this.hashtags,
      });
    },
  },
};
</script>

<style></style>
