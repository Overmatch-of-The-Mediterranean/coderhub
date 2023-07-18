const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/file')

const uploadAvatar = multer({
        dest:`${UPLOAD_PATH}`
    })

const handleUploadAvatar = uploadAvatar.single('avatar')


module.exports = {
    handleUploadAvatar
}