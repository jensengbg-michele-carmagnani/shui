<template>
  <section id="flows">
    <img @click="newFlow" class="lable-shui" src="../assets/topS.png" alt="Shui">
    <Flow v-for=" flow in flows" :key="flow.flowId" :flow="flow"/>
    <img @click="newFlow" class="add-flow" src="../assets/pencil.png" alt="Add flow">
  </section>
</template>

<script>
import Flow from "@/components/Flow.vue"
export default {
  name:"Flows",
  components:{
    Flow
  },
  beforeMount() {
     this.$store.dispatch('getFlows')
    },
  computed:{
    flows(){
      return this.$store.state.flows
    },
  },
    methods: {
      newFlow(){
        this.$router.push('/newflow')
      }
    },

}
</script>

<style>

</style>