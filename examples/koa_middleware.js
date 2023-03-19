/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/13 10:05
 * description  : koa easyMonitor 中间件例子
 */
const Koa = require('koa')
const easyMonitorMiddleware = require('../index').koa_middleware
const app = new Koa()
const appPort = 3000

app.use(easyMonitorMiddleware({
  reqSumId: 100, // 1分钟Http请求QPS统计 CODE
  reqMaxTimeId: 101, // Http请求最大响应时间 CODE
  reqTimeAvgId: 102, // Http请求平均响应时间 CODE
  errSumId: 103 // Http服务500错误请求统计 CODE
}))

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
console.log(`Koa server listening on port ${appPort}`)
