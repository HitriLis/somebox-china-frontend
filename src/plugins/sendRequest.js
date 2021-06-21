/* eslint-disable no-debugger, no-console */
// import { TOKEN_COOKIE } from "../../utils/constants";
import axios from 'axios'
import Vue from 'vue'
export default (app, inject) => {
  inject('sendRequest', ({ url, params, data, method, contentType, ...options }) => {
    method = method || 'POST'
    const baseURL = process.env.NODE_ENV === 'production' ? 'http://10.44.10.91:8000' : 'http://10.44.10.91:8000'
    let headers = {}
    //   const token = app.$cookies.get(TOKEN_COOKIE);
    //   if (token) {
    //     headers.Authorization = "JWT " + token;
    //   }
    if (options.headers) {
      headers = { ...headers, ...options.headers }
    }
    return axios({
      method,
      url,
      params,
      data,
      headers,
      baseURL,
      contentType,
      ...options
    }).catch(error => {
      if (error && error.response && error.response.status === 500) {
        Vue.notify({
          type: 'error',
          text: `${error.response.status} ${error.response.statusText}`
        })
      } else if (error && error.response && error.response.status === 404) {
        app.router.push({ name: '404' })
      }
      if (
        (error && error.response && error.response.status === 403) ||
        (error && error.response && error.response.status === 401)
      ) {
        if (app.router.app.$route.name !== 'login' && url !== 'login') {
          app.router.push({ name: 'login' })
          app.store.commit('LOGOUT')
        }
      }
      throw new Error(error)
    })
  })
}
