<template>
    <div class="home">
        <v-container>
            <Keyword></Keyword>
        </v-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import Keyword from '@/components/keyword/keyword.vue'

    export default {
        name: 'keyword',
        components: {
            // HelloWorld, 
            Keyword
        }
    }
</script>