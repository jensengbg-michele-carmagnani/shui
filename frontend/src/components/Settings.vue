<template>
  <section id="settings">
    
    <p class="hashtag">{{ hashtags }}</p>
    <img class="trash" src="../assets/trash.svg" alt="" />

   
  </section>
</template>

<script>
export default {
  name: "Settings",
  props: {
    hashtags: Object,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style></style>
