import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme:{
    primary: colors.red.darken1,
    secondary: colors.red.lighten4,
    accent: colors.amber.darken1
  }
})
