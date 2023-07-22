const menuService = require("../service/menu.service")

class MenuController { 
    async create (ctx, next) {
        const menu = ctx.request.body
        const result = await menuService.create(menu)


        ctx.body = {
            code: 0,
            message: '菜单创建成功',
            data: result
        }
     }
    async list (ctx, next) {


        const result = await menuService.wholeMenu()

        ctx.body = {
            code: 0,
            message: '获取全部菜单',
            data:result
        }
     }
 }

module.exports = new MenuController()