<template>
  <div id="app">
    <v-app>

      <v-toolbar flat>

        <v-toolbar-title>Master Find，輕鬆找大師
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>

          <v-btn flat icon to="/">
            <v-icon>home</v-icon>
          </v-btn>

          <v-btn flat icon to="/Search">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn flat icon to="/keyword">
            <v-icon>vpn_key</v-icon>
          </v-btn>

          <v-btn flat icon to="/about">
            <v-icon>info</v-icon>
          </v-btn>

          <v-btn flat icon to="/settings">
            <v-icon>settings</v-icon>
          </v-btn>

        </v-toolbar-items>
      </v-toolbar>
      <router-view />
    </v-app>
  </div>
</template>
<style>
  * {
    font-family: "微軟正黑體"
  }
</style>