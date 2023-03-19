/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/10 16:47
 * description  :
 */

let _ = require('lodash')

class MapSplitor {
  static splitMap (map, maxSize = 8000) {
    let list = []

    if (_.size(map) === 0) {
      return list
    }

    if (_.size(map) < maxSize) {
      list.push(map)
    } else {
      let currentSize = 0
      let tmp = Object.create(null)

      _.forEach(map, (v, k) => {
        tmp[k] = v
        currentSize++
        if (currentSize >= maxSize) {
          list.push(tmp)
          tmp = Object.create(null)
          currentSize = 0
        }
      })

      list.push(tmp)
    }

    return list
  }
}

module.exports = MapSplitor
