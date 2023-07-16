const app = require('./app/index')
require('./utils/handle-errors')

const { SERVE_PORT } = require('./config/server') 





app.listen(SERVE_PORT, () => { 
    console.log('coderhub服务启动成功');
 })