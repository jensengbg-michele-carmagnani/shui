<template>
  <section id="flows">
    <section
      :class="{ active: isShow, hide: !isShow }"
      class="container-settings"
    >
      <article class="container-hastags">
        <h3 class="title">streams</h3>
        <article class="hashtags">
          <Settings
            v-for="(followed, index) in followeds"
            :key="index"
            :hashtags="followed"
          />
        </article>
      </article>

      <article class="emergency">
        <select   class="hashtag" type="text" name="hashtag" v-model="hashtag">
          <option
           @click="addHashtag"
            v-for="(allHashtag, index) in allHashtags"
            :key="index"
            :value="allHashtag"
            >{{ allHashtag }}</option
          >
        </select>
        <button @click="deleteUser" class="btn-emergency">Shit, theyre on me!!</button>
      </article>
    </section>
    <img
      @click="showStream"
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
  data() {
    return {
      isShow: false,
      hashtag: String,
    };
  },
  beforeCreate() {
    this.$store.dispatch("getFlows");
    this.$store.dispatch("followedHashtags");
  },
  computed: {
    flows() {
      return this.$store.state.flows;
    },
    followeds() {
      return this.$store.state.followed;
    },
    allHashtags() {
      return this.$store.getters.allHashtags;
    },
     
  },
  methods: {
    deleteUser(){
      this.$store.dispatch('deleteUser')
      this.$router.push('/userdelete')
    },
    async addHashtag() {
      await this.$store.dispatch("addHashtag", this.hashtag);
      await this.$store.dispatch("followedHashtags");
    },
    newFlow() {
      this.$router.push("/newflow");
    },
    showStream() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style></style>
