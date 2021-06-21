
const state = {
  total: 0
}
const getters = {}
const actions = {
  async getListOreder ({ commit }, { page, limit = 10 }) {
    const offset = page ? limit * (page - 1) : undefined
    return await this.$sendRequest({
      url: 'api/v1/order/',
      method: 'GET',
      params: {
        limit,
        offset
      }
    }).then(({ data }) => {
      commit('SET_ORDERS_LIST', data)
      return data.results
    })
  },
  async deleteProduct (contex, { id, product }) {
    return await this.$sendRequest({
      url: `api/v1/order/${id}/delete_product/`,
      method: 'POST',
      data: {
        product_id: product
      }
    }).then(({ data }) => {
      return data
    })
  },
  async addProduct (contex, { id, data }) {
    return await this.$sendRequest({
      url: `api/v1/order/${id}/add_product/`,
      method: 'POST',
      data
    }).then(({ data }) => {
      return data
    })
  },
  async getOreder (contex, id) {
    return await this.$sendRequest({
      url: `api/v1/order/${id}/`,
      method: 'GET'
    }).then(({ data }) => {
      return data
    })
  },
  async addOreder (context, data) {
    return await this.$sendRequest({
      url: 'api/v1/order/',
      method: 'POST',
      data
    }).then(({ data }) => {
      return data
    })
  },
  async deleteOrder (context, id) {
    return await this.$sendRequest({
      url: `api/v1/order/${id}/`,
      method: 'DELETE'
    })
  },
  async saveOreder (context, { data, id }) {
    return await this.$sendRequest({
      url: `api/v1/order/${id}/`,
      method: 'PUT',
      data
    }).then(({ data }) => {
      return data
    })
  }
}
const mutations = {
  SET_ORDERS_LIST (state, payload) {
    state.total = payload.count
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
