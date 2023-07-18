const KoaRouter = require('@koa/router')
const { create, showAvatarImage } = require('../controller/user.controller')
const { verifyUser, handlePassWord } = require('../middleware/user.middleware')

const userRouter = new KoaRouter({ prefix: '/user' })


userRouter.post('/',verifyUser, handlePassWord ,create)


userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter