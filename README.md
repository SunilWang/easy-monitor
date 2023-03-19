# 当前项目，只是Demo！！！
# easy-monitor 简单监控 Node.js 客户端

1. 运行环境必须是Linux系统
2. 以分钟为单位做监控项的数据聚合，提供告警功能
3. 统计数据都是正整数，分钟级统计结果不超过4字节int


## 名词术语

1. 监控项：业务方自定义监控的业务指标。（如某函数的使用次数、某第三方接口的平均响应时间）
2. 视图：用户自定义的监控视角，一个视图可以关联多台服务器、多个监控项，视图所展示的数据是根据所关联的服务器汇报的数据进行聚合展示

## 聚合算法
监控项的数据统计方式分为4个算法：求和、求平均值、求最大值、求最小值，对应的客户端API如下：

- sum(int, int)：求和。API中第一个参数为监控项ID，第二个参数为监控项值。Monitor对每次调用的值进行累加统计，以分钟为单位展示求和结果。
- average(int, int, int)：求平均值。API中第一个参数为监控项ID，第二个参数为监控项值分子，第三个参数为监控项值分母。Monitor对每次调用的分子分母进行分别累加统计，以分钟为单位展示平均值结果。
- max(int, int)：求最大值。API中第一个参数为监控项ID，第二个参数为监控项值。Monitor对每次调用的值进行比较，保留最大值，以分钟为单位展示最大值结果。
- min(int, int)：求最小值。API中第一个参数为监控项ID，第二个参数为监控项值。Monitor对每次调用的值进行比较，保留最小值，以分钟为单位展示最小值结果。

## API

- 求  和：EasyMonitor.sum(id, value);
- 求平均：EasyMonitor.sum.avg(id, numerator, denominator);
- 求最大：EasyMonitor.max(id, value);
- 求最小：EasyMonitor.min(id, value);


## Examples

EasyMonitor 接入方式：

```javascript
const EasyMonitor = require('easy-monitor')

// 接入前代码
function getUsers () {
  console.log('执行业务逻辑...')
  return 'zhangsan'
}

// 接入方式
function getUser () {
  EasyMonitor.sum(1, 1) // 进入函数就对该监控项 +1
  let begin = Date.now()
  console.log('执行业务逻辑...')
  let cost = begin - Date.now()
  EasyMonitor.max(2, cost)
  EasyMonitor.avg(4, cost, 1) // 执行完成后把耗时数据交给api
  return 'zhangsan'
}
```

express EasyMonitor 中间件例子：

```javascript
const easyMonitorMiddleware = require('easy-monitor').express_middleware
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
```

koa EasyMonitor 中间件例子：

```javascript
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
```

## 作者

  王澍

Sunil Wang

[<ahwangshu@qq.com>](ahwangshu@qq.com)

---

# license

MIT
