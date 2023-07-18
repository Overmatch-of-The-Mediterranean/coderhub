const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVE_HOST,SERVE_PORT } = require('../config/server')

class FileController { 
    async create (ctx, next) { 
        // 获取头像信息
        const { filename, mimetype, size } = ctx.request.file
        const { id } = ctx.user

        //  存储头像到avatar表中
        const result = await fileService.create(filename, mimetype, size, id)
        
        // 更新user表中的头像地址
        const avatarUrl = `${SERVE_HOST}:${SERVE_PORT}/user/avatar/${id}`
        const result2 = await userService.uploadAvatarUrl(avatarUrl, id)
        
        ctx.body = {
            code: 0,
            message: '上传头像成功',
            data:result
        }

     }
}


module.exports = new FileController()