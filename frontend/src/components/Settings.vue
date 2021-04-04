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
      await this.$store.dispatch("deleteHashtag", this.hashtags);
      // this.$store.dispatch("followedHashtags");
    },
  },
  computed: {},
};
</script>

<style></style>
