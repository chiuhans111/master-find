<template>
    <div>
        <p> 已經載入 {{xml_opened.loaded}}/{{xml_opened.all}}</p>
        <v-layout row wrap>
            keywords
            <v-flex v-for="book in result.xml_keyword_result">
                <h1>
                    {{book.name}}
                </h1>
                {{book.result}}
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

    
    import { GetKeyword, exports } from "@/main/search-engine";

    export default {
        data() {
            return {
                result: exports
            }
        },
        computed: {
            xml_opened() {
                let all = 0
                let loaded = 0
                let remain = []
                for (let i in this.result.xml_records) {
                    all += 1
                    if (this.result.xml_records[i].loaded) loaded += 1
                    else remain.push(i)
                }
                if (all == loaded && all > 0) GetKeyword()
                return {
                    loaded, all, remain
                }
            },
        },
    }
</script>