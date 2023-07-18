const connection = require("../app/database")

class PermissionService { 
    // async checkMoment (momentId, id) { 
    //     const statement = 'SELECT * FROM `moment` WHERE id = ? AND user_id = ?;'
    //     const result = await connection.execute(statement, [String(momentId), String(id)])
    //     return !!result[0].length
    // }
    
    async checkPermission (resourceName,resourceId, userId) { 
        const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
        const result = await connection.execute(statement, [String(resourceId), String(userId)])
        return !!result[0].length
     }
}
 
module.exports = new PermissionService()