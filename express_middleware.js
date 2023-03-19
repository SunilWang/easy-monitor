/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/13 09:31
 * description  : express easyMonitor 中间件
 */

let easyMonitor = require('./easy-monitor')

module.exports = function (ops = {}) {
  return (req, res, next) => {
    let reqSumId = ops.reqSumId || 0
    let errSumId = ops.errSumId || 0
    let errCountSumId = ops.errCountSumId || 5823
    let reqMaxTimeId = ops.reqMaxTimeId || 0
    let reqTimeAvgId = ops.reqTimeAvgId || 0

    // 1分钟Http请求QPS统计
    easyMonitor.sum(reqSumId, 1)
    let reqStartTime = Date.now()

    res.on('finish', () => {
      let responseTime = Math.ceil(Date.now() - reqStartTime)
      let status = res.statusCode
      // Http请求最大响应时间
      easyMonitor.max(reqMaxTimeId, responseTime)
      // Http请求平均响应时间
      easyMonitor.avg(reqTimeAvgId, responseTime, 1)
      // Http服务500错误请求统计
      if (status >= 500) {
        easyMonitor.sum(errSumId, 1)
        easyMonitor.sum(errCountSumId, 1)
      }
    })

    return next()
  }
}
