const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { UPLOAD_PATH } = require('../config/file')

class UserController { 
    async create (ctx, next) { 
        // 获取用户传递过来的信息
        const user = ctx.request.body
        

        // 将user存储到数据库中
        const result = await userService.create(user)
        ctx.body = '用户创建成功~'
    }
    
    async showAvatarImage (ctx, next) { 
        ctx.body = '获取用户头像成功'

        const { userId } = ctx.params

        const avatarInfo = await fileService.queryAvatarWithUserId(userId)

        // console.log(avatarInfo);

        const { filename, mimetype } = avatarInfo

        ctx.type = mimetype

        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)

     }
}

module.exports = new UserController()