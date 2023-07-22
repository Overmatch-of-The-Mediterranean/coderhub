const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, remove, update, list, detail, asign } = require('../controller/role.controller')

const roleRouter = new KoaRouter({ prefix: '/role' })

// 角色的增删改查
roleRouter.post('/', verifyAuth, create)
roleRouter.delete('/:roleId', verifyAuth, remove)
roleRouter.patch('/:roleId',verifyAuth,update)
roleRouter.get('/', verifyAuth, list)
roleRouter.post('/:roleId',verifyAuth,detail)

// 给角色分配菜单权限
roleRouter.post('/:roleId/menu',verifyAuth,asign)

module.exports = roleRouter