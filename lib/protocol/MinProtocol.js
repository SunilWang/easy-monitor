/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 20:50
 * description  :
 */
const _ = require('lodash')
const AProtocol = require('../protocol/AProtocol')
const ProtocolType = require('../lib/ProtocolType')
const ByteConverter = require('../util/ByteConverter')
const MapSplitor = require('../util/MapSplitor')

class MinProtocol extends AProtocol {
  getType () {
    return ProtocolType.Min
  }

  getBody () {
    let cacheData = this.cacheData
    let buffArr = []

    _.forEach(cacheData, (value, itemId) => {
      buffArr.push(ByteConverter.intToBytesBigEndian(itemId))
      buffArr.push(ByteConverter.intToBytesBigEndian(value))
    })

    return Buffer.concat(buffArr)
  }

  static splitProtocol (cache) {
    let cacheList = MapSplitor.splitMap(cache, 8000)
    let protocols = []

    for (let mapCache of cacheList) {
      protocols.push(new MinProtocol(mapCache))
    }

    return protocols
  }
}

module.exports = MinProtocol
