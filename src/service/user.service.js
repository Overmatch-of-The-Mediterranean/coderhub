const connection = require('../app/database')

class UserService { 
    async create (user) { 
        // 得到用户名和密码
        const { username, password } = user
        
        // 编写sql语句
        const statement = 'INSERT INTO `user` (username, password) VALUES(?, ?);'

        // 执行sql语句
        const [result] = await connection.execute(statement,[username,password])

        return result
    }
    
    async findUserByName (username) { 

        const statement = 'SELECT * FROM `user` WHERE username = ?;'

        const [values] = await connection.execute(statement, [username])
        return values
     }
}
 
module.exports = new UserService()