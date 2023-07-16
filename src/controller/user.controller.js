const userService = require('../service/user.service')

class UserController { 
    async create (ctx, next) { 
        // 获取用户传递过来的信息
        const user = ctx.request.body
        

        // 将user存储到数据库中
        const result = await userService.create(user)
        ctx.body = '用户创建成功~'
     }
}

module.exports = new UserController()