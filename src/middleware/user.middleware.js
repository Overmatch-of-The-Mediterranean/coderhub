const { USERNAME_OR_PASSWORD_IS_REQUIRED, USERNAME_ALREADY_IS_EXISTS } = require('../config/error-constants')
const userService = require('../service/user.service')
const md5PassWord = require('../utils/md5-password')

const verifyUser = async (ctx, next) => { 
    const { username, password } = ctx.request.body
    // 判断用户信息是否可以存储到数据库中
    // 1.用户名或密码不能为空

    if (!username || !password) { 
        return ctx.app.emit('error',USERNAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }
   
    
    // 用户名不能重复
    const isExist = await userService.findUserByName(username)
    if (isExist.length) { 
        return ctx.app.emit('error',USERNAME_ALREADY_IS_EXISTS, ctx)
    }
    
    await next()
}
 
// 对密码进行md5加密
const handlePassWord = async (ctx, next) => { 
    const { password } = ctx.request.body
    
    ctx.request.body.password = md5PassWord(password)

    await next()
}
 
module.exports = {
    verifyUser,
    handlePassWord
}