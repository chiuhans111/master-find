<template>
    <div class="settings">
        <v-container>
            <h1>設定</h1>
            <Settings></Settings>
        </v-container>
    </div>
</template>

<script>

    import Settings from '@/components/Settings.vue'

    export default {
        name: "settings",
        data() {
            return {

            }
        },
        components: {
            Settings
        }
    }
</script>