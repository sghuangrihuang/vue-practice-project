import * as types from './mutation-types'

const mutations = {
  [types.SET_LONGININFO](state, loginInfo) {
    state.loginInfo = loginInfo
  },
  [types.SET_LOGINSTATUS](state, loginStatus) {
    state.loginStatus = loginStatus
  }
}

export default mutations
