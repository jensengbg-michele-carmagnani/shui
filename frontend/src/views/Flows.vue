<template>
  <section id="flows">
    <section class="container-settings">
      <h2 class="streams">streams you follow</h2>
      <article class="container-hastags">
        <Settings
          v-for="(followed, index) in followeds"
          :key="index"
          :hashtags="followed"
        />
      </article>
    </section>
    <img
      @click="followedHashtags"
      class="lable-shui"
      src="../assets/topS.png"
      alt="Shui"
    />
    <Flow v-for="flow in flows" :key="flow.flowId" :item="flow" />
    <img
      @click="newFlow"
      class="add-flow"
      src="../assets/pencil.png"
      alt="Add flow"
    />
  </section>
</template>

<script>
import Settings from "@/components/Settings.vue";
import Flow from "@/components/Flow.vue";
export default {
  name: "Flows",
  components: {
    Flow,
    Settings,
  },
  beforeMount() {
    this.$store.dispatch("getFlows");
  },
  computed: {
    flows() {
      return this.$store.state.flows;
    },
    followeds() {
      return this.$store.state.followed;
    },
  },
  methods: {
    newFlow() {
      this.$router.push("/newflow");
    },
    followedHashtags() {
      this.$store.dispatch("followedHashtags");
    },
  },
};
</script>

<style></style>
