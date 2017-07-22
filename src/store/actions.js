import * as types from './mutation-types'
import {saveToLocal} from '../common/js/store'

export const setLoginInfo = function({commit}, loginInfo) {
  saveToLocal('loginId', 'loginInfo', loginInfo)
  commit(types.SET_LONGININFO, loginInfo)
}

export const setLoginStatus = function({commit}, loginStatus) {
  saveToLocal('loginId', 'loginStatus', loginStatus)
  commit(types.SET_LOGINSTATUS, loginStatus)
}