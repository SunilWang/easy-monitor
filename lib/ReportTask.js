/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 18:39
 * description  :
 */

let UDPHelper = require('./util/UDPHelper')
let easyMonitor = require('../easy-monitor')
let SumProtocol = require('./protocol/SumProtocol')
let MaxProtocol = require('./protocol/MaxProtocol')
let MinProtocol = require('./protocol/MinProtocol')
let AvgProtocol = require('./protocol/AvgProtocol')

class ReportTask {
  static async run () {
    setInterval(() => {
      ReportTask.runTask()
    }, 10)
  }

  static async runTask () {
    let udpHelper = UDPHelper.getInstance()
    let sumCache = easyMonitor.__sumCache.getCache()
    let maxCache = easyMonitor.__maxCache.getCache()
    let minCache = easyMonitor.__minCache.getCache()
    let avgCache = easyMonitor.__avgCache.getCache()
    let sumProtocols = SumProtocol.splitProtocol(sumCache)
    let maxProtocols = MaxProtocol.splitProtocol(maxCache)
    let minProtocols = MinProtocol.splitProtocol(minCache)
    let avgProtocols = AvgProtocol.splitProtocol(avgCache)

    for (let sumProtocol of sumProtocols) {
      udpHelper.sendData(sumProtocol.toBytes())
        .catch(function (err) {
          this.logger.error('node-easy-monitor client send sumProtocol data err:', err)
        })
    }

    for (let maxProtocol of maxProtocols) {
      udpHelper.sendData(maxProtocol.toBytes())
        .catch(function (err) {
          this.logger.error('node-easy-monitor client send maxProtocols data err:', err)
        })
    }

    for (let minProtocol of minProtocols) {
      udpHelper.sendData(minProtocol.toBytes())
        .catch(function (err) {
          this.logger.error('node-easy-monitor client send minProtocols data err:', err)
        })
    }

    for (let avgProtocol of avgProtocols) {
      udpHelper.sendData(avgProtocol.toBytes())
        .catch(function (err) {
          this.logger.error('node-easy-monitor client send avgProtocols data err:', err)
        })
    }
  }
}

module.exports = ReportTask
