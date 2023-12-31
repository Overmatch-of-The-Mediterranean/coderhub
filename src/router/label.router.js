const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create } = require('../controller/label.controller')

const labelRouter = new KoaRouter({ prefix: '/label' })

// 创建标签
labelRouter.post('/',verifyAuth, create)


module.exports = labelRouter