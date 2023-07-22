const connection = require("../app/database")
const menuService = require("./menu.service")

class RoleService { 
    async create (role) { 
        const statement = `INSERT INTO role SET ?;`
        const [result] = await connection.query(statement, [role])
        
        return result
    }
    
    // 获取角色列表
    async list (offSize,size) { 
        const statement = 'SELECT * FROM role LIMIT ?, ?;'

        const [result] = await connection.query(statement, [offSize, size])
        
        return result
    }
    
    // 为角色分配菜单权限
    async asignMenu (roleId,menuIds) { 
        const deleteStatement = `DELETE FROM role_menu rm WHERE rm.roleId = ?;`
        await connection.query(deleteStatement,[roleId])
        const statement = `INSERT INTO role_menu (roleId,menuId) VALUES(?, ?);`
        for (const menuId of menuIds) { 
             await connection.query(statement,[roleId,menuId])
        }
    
    }
    // 获取每个角色所拥有的菜单权限
      async getRoleMenu (roleId) { 
        const statement = `SELECT JSON_ARRAYAGG(rm.menuId) menuIds FROM role_menu rm WHERE rm.roleId = ? GROUP BY rm.roleId;`
        const [result] = await connection.query(statement, [roleId])
        const menuIds = result[0].menuIds

        // 这里要每次重新获取wholeMenu，不能从外面传递，因为下面的递归会改变wholeMenu
        const wholeMenu = await menuService.wholeMenu()
          
        const filterMenus = (menus) => {
            const newMenus = []
            for (const item of menus) { 
                if (item.children) {
                    item.children = filterMenus(item.children)
                } 
                if (menuIds.includes(item.id)) { 
                    newMenus.push(item)
                }
            }
            return newMenus
        }
        const finalMenu = filterMenus(wholeMenu)

        return finalMenu
     }
 }


module.exports = new RoleService()