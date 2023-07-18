const { PERMISSION_IS_MOT_ALLOWED } = require('../config/error-constants')
const permissionService = require('../service/permission.service')

// const verifyMomentPermission = async (ctx, next) => { 

//     // 获取动态id
//     const { momentId } = ctx.params

//     // 获取用户id
//     const { id } = ctx.user

//     const isPermission = await permissionService.checkMoment(momentId, id)
//     if (!isPermission) { 
//         return ctx.app.emit('error', PERMISSION_IS_MOT_ALLOWED, ctx)
//      }

//     await next()

// }

const verifyPermission = async (ctx, next) => { 

    // 获取要操作资源的名字
    const keyName = Object.keys(ctx.params)[0]
    const resourceId = ctx.params[keyName]
    const resourceName = keyName.replace('Id','')
   

    // 获取用户id
    const { id } = ctx.user

    const isPermission = await permissionService.checkPermission(resourceName,resourceId, id)
    if (!isPermission) { 
        return ctx.app.emit('error', PERMISSION_IS_MOT_ALLOWED, ctx)
     }

    await next()

}

module.exports = {
    // verifyMomentPermission,
    verifyPermission
}