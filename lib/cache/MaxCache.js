/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 20:48
 * description  :
 */
const Cache = require('./Cache')
const _ = require('lodash')

class MaxCache extends Cache {
  max (itemId, value) {
    itemId = (_.isNumber(itemId) && !_.isNaN(itemId)) ? itemId : 0
    value = (_.isNumber(value) && !_.isNaN(value)) ? value : 0

    let valueCache = this.dataMap[itemId]
    if (!valueCache) {
      this.dataMap[itemId] = value
    } else {
      if (value > valueCache) {
        this.dataMap[itemId] = valueCache
      }
    }
  }
}

module.exports = MaxCache
