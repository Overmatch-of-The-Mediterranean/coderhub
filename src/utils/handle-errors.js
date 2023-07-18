const app = require('../app/index')
const {
    USERNAME_OR_PASSWORD_IS_REQUIRED,
    USERNAME_ALREADY_IS_EXISTS,
    PASSWORD_IS_UNCORRECT,
    USERNAME_IS_NOT_EXISTS,
    UNAUTHORIZATION,
    PERMISSION_IS_MOT_ALLOWED
} = require('../config/error-constants')


app.on('error', (error, ctx) => { 
    let code = 0
    let message = ''
    switch (error) { 
        case USERNAME_OR_PASSWORD_IS_REQUIRED:
            message = '用户名或密码不能为空'
            code = 1001
            break
        case USERNAME_ALREADY_IS_EXISTS:
            message = '用户名已被占用，请换个试试'
            code = 1002
            break
        case USERNAME_IS_NOT_EXISTS:
            message = '用户名不存在'
            code = 1003
            break
        case PASSWORD_IS_UNCORRECT:
            message = '密码错误'
            code = 1004
            break
        case UNAUTHORIZATION:
            message = '没有权限'
            code = 1005
            break
        case PERMISSION_IS_MOT_ALLOWED:
            message = '你没有权限操作此资源'
            code = 1006
            break
        default:
            break
    }
    
    ctx.body = {
        code,
        message
    }
})
