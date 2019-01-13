<style>
  .searchResult-keyword {
    color: red;
    border-bottom: 2px solid red;
  }
</style>

<template>
  <v-container fluid grid-list-md>
    <p> 已經載入 {{xml_opened.loaded}}/{{xml_opened.all}}
      份文件，共找到 {{result.xml_search_status}} 個結果</p>

    <v-pagination v-model="page" :length="pageCount"></v-pagination>

    <v-layout wrap>

      <v-flex shrink v-for="(obj,index) in partResult" :key="index">
        <v-divider></v-divider>
        <v-layout row>

          <v-flex grow>

            <h2>
              {{obj.title}}
            </h2>
            <p>
              {{obj.basename}}
              找到
              {{obj.result.length}}
              個搜尋結果
            </p>
          </v-flex>
          <v-flex shink>
            <v-chip color="accent" small v-for="item in obj.common">
              {{item}}
            </v-chip>
          </v-flex>

        </v-layout>
        <v-layout wrap>

          <v-flex style="max-width: 768px" v-for="item in obj.result">
            <v-card>
              <v-card-title>

                <template>

                  <v-flex xs12 :md6="item.trans.length>0">

                    <template v-for="str in item.formatContent">
                      <span v-if="str.text">
                        {{str.text}}
                      </span>
                      <span class="searchResult-keyword"
                        v-if="str.keyword">
                        {{str.keyword}}
                      </span>
                    </template>


                  </v-flex>
                  <v-flex xs12 md6 v-if="item.trans.length>0">
                    {{item.trans}}
                  </v-flex>
                </template>


                <v-spacer></v-spacer>
                <small v-for="tag in item.path">
                  {{tag}}|
                </small>
              </v-card-title>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>

    <v-pagination v-model="page" :length="pageCount"></v-pagination>

  </v-container>
</template>
<script>

  import { Search, exports } from "@/main/search-engine";
  //import settings from "@/main/settings.js";

  export default {
    data() {
      return {
        //settings: settings.setting,

        animate: {
          dotCount: 0
        },
        page: 1,
        result_per_page: 10,
        result: exports
      };
    },
    watch: {
      target(value) {
        let me = this;
        Search(new RegExp(value));
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
        return {
          loaded, all, remain
        }
      },
      partResult() {
        let start = (this.page - 1) * this.result_per_page
        return this.result.xml_search_result.slice(start, start + this.result_per_page)
      },
      pageCount() {
        return Math.ceil(this.result.xml_search_result.length / this.result_per_page)
      }
    },

    props: ["target"]
  };
</script>