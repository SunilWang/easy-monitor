/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 20:59
 * description  :
 */

const _ = require('lodash')
const AProtocol = require('../protocol/AProtocol')
const ProtocolType = require('../lib/ProtocolType')
const ByteConverter = require('../util/ByteConverter')
const MapSplitor = require('../util/MapSplitor')

class AvgProtocol extends AProtocol {
  getType () {
    return ProtocolType.Avg
  }

  getBody () {
    let cacheData = this.cacheData
    let buffArr = []

    _.forEach(cacheData, (avgData, itemId) => {
      buffArr.push(ByteConverter.intToBytesBigEndian(itemId))
      buffArr.push(ByteConverter.intToBytesBigEndian(avgData.numerator))
      buffArr.push(ByteConverter.intToBytesBigEndian(avgData.denominator))
    })

    return Buffer.concat(buffArr)
  }

  static splitProtocol (cache) {
    let cacheList = MapSplitor.splitMap(cache, 5000)
    let protocols = []

    for (let mapCache of cacheList) {
      protocols.push(new AvgProtocol(mapCache))
    }

    return protocols
  }
}

module.exports = AvgProtocol
