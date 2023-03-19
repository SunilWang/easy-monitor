/* eslint-disable no-unused-vars */
/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/4/13 10:18
 * description  : easyMonitor 接入方式
 */

const easyMonitor = require('../index')

// 接入前代码
function getUsers () {
  console.log('执行业务逻辑...')
  return 'zhangsan'
}

// 接入方式
function getUser () {
  easyMonitor.sum(1, 1) // 进入函数就对该监控项 +1
  let begin = Date.now()
  console.log('执行业务逻辑...')
  let cost = begin - Date.now()
  easyMonitor.max(2, cost)
  easyMonitor.avg(4, cost, 1) // 执行完成后把耗时数据交给api
  return 'zhangsan'
}
