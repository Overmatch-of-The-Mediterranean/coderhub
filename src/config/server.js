const dotenv = require('dotenv')

// 不写参数默认导入根目录下的.env文件
dotenv.config()

console.log(process.env.SERVE_PORT,process.env.SERVE_HOST);

module.exports = {
    SERVE_HOST,
    SERVE_PORT
} = process.env