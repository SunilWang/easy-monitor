/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/10 16:34
 * description  :
 */

class Cache {
  constructor (dataMap) {
    this.dataMap = dataMap || Object.create(null)
  }

  getCache () {
    // 因为Node.js 本身是单线程，不需要线程锁
    let cache = this.dataMap
    this.dataMap = Object.create(null)
    return cache
  }
}

module.exports = Cache
