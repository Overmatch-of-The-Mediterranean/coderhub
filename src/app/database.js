const mysql = require('mysql2')


const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '****',
    database:'coderhub'
})



// 连接数据库是否成功
connectionPool.getConnection((err,connection) => {
    if (err) { 
        console.log('数据库连接失败',err);
    }

    // 尝试存储数据
    connection.connect((err) => {  
        if (err) {
            console.log('数据库交互失败', err);
        } else { 
            console.log('数据库交互成功，可以进行操作~');
        }
    })
})

// 获取连接池中的连接对象
const connection = connectionPool.promise()

module.exports = connection
