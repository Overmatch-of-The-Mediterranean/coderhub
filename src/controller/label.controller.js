const labelService = require('../service/label.service')

class LabelController { 
    async create (ctx, next) { 
        const { name } = ctx.request.body

        const result = await labelService.create(name)

        ctx.body = {
            code: 0,
            message: '标签创建成功',
            data: result
        }
    }
}
 

module.exports = new LabelController()