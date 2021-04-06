<template>
  <section id="settings">
    <p class="hashtag">{{ hashtags }}</p>
    <img
      @click="deleteHashtag"
      class="trash"
      src="../assets/trash.svg"
      alt=""
    />
  </section>
</template>

<script>
export default {
  name: "Settings",
  props: {
    hashtags: String,
  },
  data() {
    return {};
  },
  methods: {
    async deleteHashtag() {
      await this.$store.dispatch("deleteHashtag", { hashtag: this.hashtags });
      await this.$store.dispatch("followedHashtags");
      await this.$store.dispatch("getFlows");
    },
  },
  computed: {},
};
</script>

<style></style>
