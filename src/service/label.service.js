const connection = require("../app/database")

class LabelService { 

    // 创建标签
    async create (name) {
        
        const statement = 'INSERT INTO label (name) VALUES(?);'
        const [result] = await connection.execute(statement, [name])

        return result
        
    }

    // 添加标签前,判断label表中是否已经存在
    async queryLabel (name){ 
        
        const statement = 'SELECT * FROM label WHERE name = ?;'
        const [result] = await connection.execute(statement, [name])

        return result[0]
    }
    
    // 添加关系数据前,检查是否已经存在此关系
    async hasLabel (labelId, momentId) { 
        const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
        const [result] = await connection.execute(statement, [ momentId,labelId])
        
        return !!result.length
    }
    
    // 向moment_label表中添加关系数据
    async addLabel (labelId, momentId) { 
        const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES(?,?);'
        const [result] = await connection.execute(statement, [momentId,labelId])
        
        return result
     }
}
 
module.exports = new LabelService()