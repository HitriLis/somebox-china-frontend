const state = {
  delivery: 0
}
const getters = {}
const actions = {
  async deleteDelivery (context, id) {
    return await this.$sendRequest({
      url: `api/v1/departure/${id}`,
      method: 'DELETE'
    })
  },
  async listDelivery () {
    return await this.$sendRequest({
      url: 'api/v1/departure/',
      method: 'GET'
    }).then(({ data }) => {
      return data.results
    })
  },
  async createDeparture (context, data) {
    return await this.$sendRequest({
      url: 'api/v1/departure/',
      method: 'POST',
      data
    }).then(({ data }) => {
      return data
    })
  }
}
const mutations = {
  SET_DELIVERY (state, payload) {
    state.delivery = payload
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
