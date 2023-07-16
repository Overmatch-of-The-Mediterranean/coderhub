const KoaRouter = require('@koa/router')
const UserController = require('../controller/user.controller')
const { verifyUser, handlePassWord } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/user' })


userRouter.post('/',verifyUser, handlePassWord ,UserController.create)

module.exports = userRouter