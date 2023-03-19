/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/10 14:18
 * description  :
 */
const debug = require('debug')('node-easy-monitor')

class Logger {
  info (...message) {
    this.log(...message)
  }

  log (...message) {
    console.log(...message)
  }

  warn (...message) {
    console.warn(...message)
  }

  error (...message) {
    console.error(...message)
  }

  debug (...message) {
    debug(...message)
  }

  get debugEnabled () {
    return debug.enabled
  }
}

module.exports = Logger
