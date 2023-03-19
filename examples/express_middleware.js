/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/13 10:15
 * description  : express easyMonitor 中间件例子
 */

const easyMonitorMiddleware = require('../index').express_middleware
const appPort = 3000

const express = require('express')
const app = express()

app.use(easyMonitorMiddleware({
  reqSumId: 100, // 1分钟Http请求QPS统计 CODE
  reqMaxTimeId: 101, // Http请求最大响应时间 CODE
  reqTimeAvgId: 102, // Http请求平均响应时间 CODE
  errSumId: 103 // Http服务500错误请求统计 CODE
}))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const server = app.listen(appPort, function () {
  let host = server.address().address
  let port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
