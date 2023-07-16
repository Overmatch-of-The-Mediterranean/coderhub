const crypto = require('crypto')

const md5PassWord = (password) => { 
    const md5 = crypto.createHash('md5')
    const md5Pwd = md5.update(password).digest('hex')
    return md5Pwd
}
 
module.exports = md5PassWord


