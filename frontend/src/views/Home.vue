<template>
  <section @click="goto" id="home">
    
    <article class="main">
       <img src="../assets/logo.png" alt="Shui">
       
       <h4>flow freely</h4>
    </article>
  </section>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',

 methods: {
   goto(){
     this.$router.push('/login')
   }
 },
 
}
</script>
