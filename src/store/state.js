import {loadFromLocal} from '../common/js/store'

const state = {
  loginInfo: loadFromLocal('loginId', 'loginInfo'),
  loginStatus: loadFromLocal('loginId', 'loginStatus')
}

export default state