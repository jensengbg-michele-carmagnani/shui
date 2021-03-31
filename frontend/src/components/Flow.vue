<template>
  <article id="flow">
    <section class="content">
      <p class="date">{{ flow.date }}</p>
      <p class="content-text">{{ flow.info }}</p>
      <h4 class="author">--{{ flow.author }}</h4>
      <h5 class="hashtag">{{ flow.hashtag }}</h5>
    </section>
    
  </article>
</template>

<script>
export default {
  name: "Flow",
  props: {
    flow: Object,
  },
};
</script>

<style></style>
