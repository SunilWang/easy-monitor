/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/10 14:02
 * description  :
 */
const dgram = require('dgram')
const _ = require('lodash')
const Logger = require('./Logger')
const LOCALIP = '127.0.0.1'
const AGENT_PORT = 35001
const UDP_HELPER_INSTANCE = Symbol.for('UDP_HELPER_INSTANCE')

class UDPHelper {
  constructor () {
    this.logger = new Logger()
    this.client = dgram.createSocket('udp4')

    this.client.on('error', (err) => {
      this.logger.error(`node-easy-monitor client error:`, err)
    })

    this.client.on('close', () => {
      this.logger.warn('node-easy-monitor client disconnected!')
    })
  }

  static getInstance () {
    if (UDPHelper[UDP_HELPER_INSTANCE]) return UDPHelper[UDP_HELPER_INSTANCE]
    UDPHelper[UDP_HELPER_INSTANCE] = new UDPHelper()
    return UDPHelper[UDP_HELPER_INSTANCE]
  }

  stop () {
    this.client.close()
  }

  sendData (message) {
    let sclf = this
    if (!Buffer.isBuffer(message)) message = Buffer.from(message)

    return new Promise((resolve, reject) => {
      sclf.client.send(message, 0, message.length, AGENT_PORT, LOCALIP, (err, bytes) => {
        if (err) {
          sclf.logger.error('node-easy-monitor client send data err:', err)
          return reject(err)
        }

        if (this.logger.debugEnabled) {
          let bufferArr = []
          let buffers = _.chunk(message, 4)
          for (let buffer of buffers) {
            bufferArr.push(Buffer.from(buffer).readUInt32BE())
          }

          this.logger.debug('client send data:', bufferArr)
        }

        return resolve(bytes)
      })
    })
  }
}

module.exports = UDPHelper
