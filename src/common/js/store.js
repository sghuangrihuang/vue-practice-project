/*
* @Author: sghuangrihuang
* @Date:   2017-05-22 09:11:30
* @Last Modified by:   sghuangrihuang
* @Last Modified time: 2017-05-24 16:46:38
*/

export function saveToLocal(id, key, value) {
  let obj = window.localStorage.__riProject__
  if (!obj) {
    obj = {}
    obj[id] = {}
    obj[id][key] = value
  } else {
    obj = JSON.parse(obj)
    if (!obj[id]) {
      obj[id] = {}
    }
  }
  obj[id][key] = value
  window.localStorage.__riProject__ = JSON.stringify(obj)
}
export function loadFromLocal(id, key, def = '') {
  let obj = window.localStorage.__riProject__
  if (!obj) {
    return def
  }
  obj = JSON.parse(obj)[id]
  if (!obj) {
    return def
  }
  let ret = obj[key]
  return ret || def
}