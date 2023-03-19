/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/10 16:30
 * description  :
 */

const Cache = require('./Cache')
const _ = require('lodash')

class SumCache extends Cache {
  sum (itemId, value) {
    itemId = (_.isNumber(itemId) && !_.isNaN(itemId)) ? itemId : 0
    value = (_.isNumber(value) && !_.isNaN(value)) ? value : 0

    let valueCache = this.dataMap[itemId]
    if (!valueCache) {
      this.dataMap[itemId] = value
    } else {
      this.dataMap[itemId] = value + valueCache
    }
  }
}

module.exports = SumCache
