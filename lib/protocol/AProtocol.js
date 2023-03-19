/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/10 16:46
 * description  :
 */

const ByteConverter = require('../util/ByteConverter')

class AProtocol {
  constructor (cacheData) {
    this.cacheData = cacheData || Object.create(null)
  }

  getType () {
    throw new Error('must implement the getType interface')
  }

  getBody () {
    throw new Error('must implement the getBody interface')
  }

  toBytes () {
    let type = this.getType()
    let body = this.getBody()
    let bodyLength = body.length
    return Buffer.concat([
      ByteConverter.intToBytesBigEndian(type),
      ByteConverter.intToBytesBigEndian(bodyLength),
      body
    ])
  }
}

module.exports = AProtocol
