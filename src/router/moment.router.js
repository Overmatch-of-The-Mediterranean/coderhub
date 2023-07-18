const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, detail, update, remove, addLabel } = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// 增
momentRouter.post('/', verifyAuth, create)

// 查
momentRouter.get('/', list)
momentRouter.get('/:momentId',detail)

// 删除
momentRouter.delete('/:momentId', verifyAuth,verifyPermission,remove)


// 修改
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)


// 为动态添加标签
// 1.验证是否有token
// 2.验证是否有操作该动态的权限
// 3.验证添加label的name是否已经存在于label表中
//      *若存在,则使用表中的
//      *若不存在,则添加到表中
// 4.为动态添加标签,即向moment_label中添加关系数据
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission,verifyLabelExists, addLabel)

module.exports = momentRouter