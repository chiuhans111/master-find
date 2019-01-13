<template>

    <v-container>
        <v-layout row>

            <v-flex lg12 xl6>

                <v-list two-line>

                    <v-subheader class="text--primary">
                        一般設定
                    </v-subheader>


                    <v-list-tile>
                        <v-list-tile-avatar>
                            <v-icon>folder</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title> XML 資料夾路徑</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary">
                                "{{settings.xmlPath}}"
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title>
                                將會在這個資料夾搜尋 XML 文件
                                (共找到 {{xmlFileCount}} 個文件)
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn flat color="success"
                                @click="settings.xmlPath=openDirectory(settings.xmlPath)">
                                開啟資料夾
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-subheader class="text--primary">
                        系統設定
                    </v-subheader>

                    <v-list-tile>
                        <v-list-tile-avatar>
                            <v-icon>folder</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>多執行緒數量</v-list-tile-title>
                            <v-list-tile-sub-title>
                                建議設定 2
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-text-field v-model="settings.numWorkers"></v-text-field>
                        <v-spacer></v-spacer>

                    </v-list-tile>

                </v-list>
            </v-flex>

        </v-layout>

    </v-container>

</template>

<script>

    import settings from '@/main/settings.js'
    import { GetFiles } from '@/main/search-engine'
    import { remote } from 'electron'

    const dialog = remote.dialog


    console.log(settings)
    export default {
        data() {
            return {
                settings: settings.data
            }
        },
        methods: {
            save() {

            },
            openDirectory(defaultPath) {
                let result = dialog.showOpenDialog({ properties: ['openDirectory'], defaultPath })
                if (result != null) return result[0]
                return defaultPath
            }
        },
        watch: {
            "settings.xmlPath": function () {
                settings.settings.set('xmlPath', this.settings.xmlPath)
            },
            "settings.numWorkers": function () {
                settings.settings.set('numWorkers', this.settings.numWorkers)
            }
        },

        computed: {
            xmlFileCount() {
                return GetFiles(this.settings.xmlPath).length
            }
        }
    }
</script>