import sendRequest from './sendRequest'
import notification from './notification'
import bootstrap from './bootstrap-vue'
import moment from './moment'

import Vue from 'vue'
export default function (app) {
  const inject = (name, plugin) => {
    const key = `$${name}`
    app[key] = plugin
    app.store[key] = plugin
    Vue.use(() => {
      if (Object.prototype.hasOwnProperty.call(Vue, key)) {
        return
      }
      Object.defineProperty(Vue.prototype, key, {
        get () {
          return this.$root.$options[key]
        }
      })
    })
  }
  sendRequest(app, inject)
  notification()
  bootstrap()
  moment(app, inject)
}
