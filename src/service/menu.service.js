const connection = require("../app/database")

class MenuService { 
    async create (menu) { 
        try {
            const statement = 'INSERT INTO menu SET ?;'
            const [result] = await connection.query(statement, [menu])
            
            return result
        } catch (error) {
            console.log(error);
        }
    }
    
    // 获取全部菜单
    async wholeMenu () { 
        const statement = `SELECT
        ml.id id ,ml.name name, ml.type type, ml.icon icon, ml.url url, ml.sort sort, ml.createAt createAt, ml.updateAt updateAt,
        (
            SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT('id',m2.id,'name',m2.name, 'type',m2.type, 'parentId',m2.parentId , 'url',m2.url, 'sort',m2.sort,'createAt', ml.createAt, 'updateAt' ,ml.updateAt,
                        'children',(
                            SELECT
                                JSON_ARRAYAGG(
                                    JSON_OBJECT('id',m3.id,'name',m3.name, 'type',m3.type, 'parentId',m3.parentId , 'url',m3.url, 'sort',m3.sort,'createAt', m3.createAt, 'updateAt' ,m3.updateAt)
                                )
                            FROM menu m3 WHERE m3.parentId = m2.id
                        )
                    )
                ) 
            FROM menu m2 WHERE m2.parentId = ml.id
        ) children
        FROM menu ml
        WHERE ml.type = 1;`
        const [result] = await connection.query(statement)

        return result
    }
    
 }


module.exports = new MenuService()