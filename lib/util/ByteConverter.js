/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 17:16
 * description  :
 */

class ByteConverter {
  static intToBytesBigEndian (n) {
    let buf = Buffer.alloc(4)

    for (let i = 0; i < buf.length; i++) {
      buf[buf.length - i - 1] = (n >> (8 * i))
    }

    return buf
  }
}

module.exports = ByteConverter
