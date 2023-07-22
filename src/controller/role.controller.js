
const roleService = require("../service/role.service")

class RoleController { 
    async create (ctx,next) {
        const role = ctx.request.body
        const result = await roleService.create(role)

        ctx.body = {
            code: 0,
            message: '角色创建成功',
            data:result
        }
     }
    async remove () { }
    async update () { }
    async list (ctx,next) { 
        const { offSize=0, size=10 } = ctx.query
        const result = await roleService.list(Number(offSize), Number(size))

        // 对每个用户的菜单权限进行处理
        for (const role of result) {
            role.menu = await roleService.getRoleMenu(role.id)
         }

        ctx.body = {
            code: 0,
            message: '获取角色列表成功',
            data:result
        }
     }
    async detail () { }

    async asign (ctx, next) {
        const { roleId } = ctx.params
        const { menuIds } = ctx.request.body

        const result = await roleService.asignMenu(roleId, menuIds)
        
        ctx.body = {
            code: 0,
            message: '角色分配菜单成功',
            data: result
        }
    }
 }

module.exports = new RoleController()