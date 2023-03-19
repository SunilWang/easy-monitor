/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/12 20:54
 * description  :
 */

class AvgData {
  constructor (numerator = 0, denominator = 0) {
    this.numerator = numerator
    this.denominator = denominator
  }

  put (numerator, denominator) {
    this.numerator += numerator
    this.denominator += denominator
  }
}

module.exports = AvgData
