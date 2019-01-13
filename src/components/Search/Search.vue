<template>
    <div>
        <v-layout row wrap>
            <v-flex sm12 md6>
                <v-text-field :label="hint" solo
                    append-icon="search" @change="change"
                    @keyup.enter="search" v-model="value">

                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <SearchHint :target="value"></SearchHint>
        </v-layout>
        <v-layout>
            <SearchResult :target="value_search"></SearchResult>
        </v-layout>
    </div>
</template>
<script>

    import SearchHint from './SearchHint.vue'
    import SearchResult from './SearchResult.vue'

    var hints = [
        "賈伯斯",
        "行動應用",
        "大數據",
        "管理學"
    ]

    export default {
        data() {
            return {
                value: "",
                value_search: "",
                hint: "查看看... 「" + hints[Math.floor(Math.random() * hints.length)] + "」如何 ?"
            }
        },
        methods: {
            change() {
                this.$emit('change', this.value)
            },
            search() {
                this.value_search = this.value
            }
        },
        components: {
            SearchHint, SearchResult
        }
    }
</script>