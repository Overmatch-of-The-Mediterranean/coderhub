const jwt = require('jsonwebtoken')
const { USERNAME_OR_PASSWORD_IS_REQUIRED, USERNAME_ALREADY_IS_EXISTS, PASSWORD_IS_UNCORRECT, USERNAME_IS_NOT_EXISTS, UNAUTHORIZATION } = require("../config/error-constants")
const { findUserByName } = require("../service/user.service")
const md5PassWord = require("../utils/md5-password")
const { publicKey } = require('../config/secret')

const verifyLogin = async (ctx, next) => { 

    // 用户名或密码是否为空
    const { username, password } = ctx.request.body

    if (!username || !password) { 
        return ctx.app.emit('error',USERNAME_OR_PASSWORD_IS_REQUIRED,ctx)
    }

    // 查询数据库中用户名是否存在
   
    const users = await findUserByName(username)

    const user = users[0]
    if (!user) { 
        return ctx.app.emit('error',USERNAME_IS_NOT_EXISTS, ctx)
    }

    // 密码是否与数据库中的一致
    if (user.password !== md5PassWord(password)) {
        return ctx.app.emit('error', PASSWORD_IS_UNCORRECT, ctx)
    }

    // 将查询到的用户，传递给sign
    ctx.user = user


    await next()
}
 
const verifyAuth = async (ctx, next) => { 
    // 获取token
    const authorization = ctx.headers.authorization
    if (!authorization) { 
        return ctx.app.emit('error',UNAUTHORIZATION, ctx)
     }
    const token = authorization.replace('Bearer ', '')
    try {
        const result =  jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        })
        
        ctx.user = result

        await next()
        
    } catch (error) {
        console.log(error);
        ctx.app.emit('error',UNAUTHORIZATION, ctx)
    }
    
 }
module.exports = {
    verifyLogin,
    verifyAuth
}