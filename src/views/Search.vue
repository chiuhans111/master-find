<template>
  <div class="home">
    <v-container>
      <Search></Search>
    </v-container>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import Search from '@/components/Search/Search.vue'

  export default {
    name: 'search',
    components: {
      // HelloWorld, 
      Search
    }
  }
</script>