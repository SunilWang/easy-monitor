/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/3/21 15:56
 * description  :
 */
const SumCache = require('./lib/cache/SumCache')
const MaxCache = require('./lib/cache/MaxCache')
const MinCache = require('./lib/cache/MinCache')
const AvgCache = require('./lib/cache/AvgCache')

const sumCache = new SumCache()
const maxCache = new MaxCache()
const minCache = new MinCache()
const avgCache = new AvgCache()

class easyMonitor {
  static sum (itemId, value) {
    sumCache.sum(itemId, value)
  }

  static min (itemId, value) {
    minCache.min(itemId, value)
  }

  static max (itemId, value) {
    maxCache.max(itemId, value)
  }

  static avg (itemId, numerator, denominator) {
    avgCache.avg(itemId, numerator, denominator)
  }
}

module.exports = easyMonitor
module.exports.__sumCache = sumCache
module.exports.__maxCache = maxCache
module.exports.__minCache = minCache
module.exports.__avgCache = avgCache

const ReportTask = require('./lib/ReportTask')
ReportTask.run()
