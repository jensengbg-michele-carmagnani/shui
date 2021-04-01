<template>
  <article id="flow">
    <section class="content">
      <p class="date">{{ item.date }}</p>
      <p class="content-text">{{ item.info }}</p>
      <h4 class="author">--{{ item.author }}</h4>
      <h5 class="hashtag">{{ item.hashtags }}</h5>
    </section>
    
  </article>
</template>

<script>
export default {
  name: "Flow",
  props: {
    item: Object,
  },
};
</script>

<style></style>
