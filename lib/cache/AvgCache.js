/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 20:56
 * description  :
 */

const Cache = require('./Cache')
const AvgData = require('./AvgData')
const _ = require('lodash')

class AvgCache extends Cache {
  avg (itemId, numerator, denominator) {
    itemId = (_.isNumber(itemId) && !_.isNaN(itemId)) ? itemId : 0
    numerator = (_.isNumber(numerator) && !_.isNaN(numerator)) ? numerator : 0
    denominator = (_.isNumber(denominator) && !_.isNaN(denominator)) ? denominator : 0

    let valueCache = this.dataMap[itemId]
    if (!valueCache) {
      this.dataMap[itemId] = new AvgData(numerator, denominator)
    } else {
      this.dataMap[itemId] = new AvgData(numerator + valueCache.numerator, denominator + valueCache.denominator)
    }
  }
}

module.exports = AvgCache
