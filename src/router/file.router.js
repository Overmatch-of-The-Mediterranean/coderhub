const KoaRouter = require('@koa/router')


const { verifyAuth } = require('../middleware/login.middleware')
const { handleUploadAvatar } = require('../middleware/file.middleware')
const { create } = require('../controller/file.controller')



const fileRouter = new KoaRouter({ prefix: '/upload' })



fileRouter.post('/avatar', verifyAuth, handleUploadAvatar,create)

module.exports = fileRouter