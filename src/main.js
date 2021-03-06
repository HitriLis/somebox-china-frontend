import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import initPlugins from './plugins'
import './assets/styles/default.styl'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Vuetify from './plugins/vuetify'
Vue.config.productionTip = false

const app = {
  router,
  store,
  vuetify: Vuetify,
  render: h => h(App)
}
initPlugins(app)
new Vue(app).$mount('#app')
