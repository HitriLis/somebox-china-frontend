import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ru from 'vuetify/lib/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa'
  },
  lang: {
    locales: { ru },
    current: 'ru'
  },
  theme: {
    themes: {
      light: {
        primary: '#7F2FCB',
        secondary: '#32B830',
        accent: '#3F51B5'
      }
    }
  }
})
