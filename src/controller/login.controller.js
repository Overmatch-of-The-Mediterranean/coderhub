const jwt = require('jsonwebtoken')
const { privateKey } = require('../config/secret')

class LoginController { 
    // 颁发数字签名
    sign (ctx, next) { 
        const { id, username } = ctx.user
        const token = jwt.sign({ id, username }, privateKey, {
            expiresIn: 24 * 60 * 60,
            algorithm:'RS256'
        })

        ctx.body = {
            code: 0,
            data: {id, username, token}
        }
     }
}
 
module.exports = new LoginController()