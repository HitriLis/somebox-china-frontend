import { REFRESH_TOKEN_COOKIE, TOKEN_COOKIE } from '@/utils/constants'
export const VERIFY_AUTH = 'verifyAuth'
export const REGISTER = 'register'
export const UPDATE_PASSWORD = 'updateUser'
const state = {
  errors: null
}
const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated () {
    return this.$cookies.get(TOKEN_COOKIE)
  }
}
const actions = {
  login (context, { email, password }) {
    return this.$sendRequest({
      url: 'obtain_token/',
      method: 'POST',
      data: {
        email,
        password
      }
    }).then(({ data }) => {
      this.$cookies.set(TOKEN_COOKIE, data.access)
      this.$cookies.set(REFRESH_TOKEN_COOKIE, data.refresh)
    })
  },
  logout (context) {
    context.commit('LOGOUT')
  },
  async [VERIFY_AUTH] (context) {
    if (this.$cookies.get(TOKEN_COOKIE)) {
      console.log('good')
    } else {
      context.commit('LOGOUT')
    }
  }
}

const mutations = {
  LOGOUT (state) {
    state.user = {}
    state.errors = {}
    this.$cookies.remove(TOKEN_COOKIE)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
