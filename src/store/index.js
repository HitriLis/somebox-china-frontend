import Vue from 'vue'
import Vuex from 'vuex'
import order from './order.module'
import delivery from './delivery.module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customer: [],
    provider: []
  },
  mutations: {
  },
  actions: {
    async getProducts (context, search) {
      return await this.$sendRequest({
        url: 'api/v1/products/',
        method: 'GET',
        params: {
          search,
          limit: 10
        }
      }).then(({ data }) => {
        return data.results
      })
    },
    async getProvider (context, search) {
      return await this.$sendRequest({
        url: 'api/v1/provider/',
        method: 'GET',
        params: {
          search,
          limit: 10
        }
      }).then(({ data }) => {
        return data.results
      })
    },
    async getCustomer (context, search) {
      return await this.$sendRequest({
        url: 'api/v1/customers/',
        method: 'GET',
        params: {
          search,
          limit: 10
        }
      }).then(({ data }) => {
        return data.results
      })
    }
  },
  modules: {
    order,
    delivery
  }
})
