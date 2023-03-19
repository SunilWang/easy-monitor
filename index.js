/**
 * author       : 王澍（SunilWang）
 * createTime   : 2018/3/21 16:08
 * description  :
 */

const easyMonitor = require('./easy-monitor')

module.exports = easyMonitor
module.exports.koaMiddleware = module.exports.koa_middleware = require('./koa_middleware')
module.exports.expressMiddleware = module.exports.express_middleware = require('./express_middleware')
