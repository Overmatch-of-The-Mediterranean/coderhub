const momentService = require('../service/moment.service')
const labelService = require('../service/label.service')

class MomentController { 
    async create (ctx, next) { 
        // 获取动态内容
        const { content } = ctx.request.body

        // 获取用户id
        const { id } = ctx.user

        const result = await momentService.create(content,id)


        ctx.body = {
            code: 0,
            message:'用户新增动态成功',
            result
        }
     }
     
    async list (ctx, next) { 

        const { offsize, size } = ctx.query

        const result = await momentService.queryList(offsize, size)


        ctx.body = {
            code: 0,
            message:'查询用户列表成功',
            result
        }
    }
    
    async detail (ctx, next) { 

        const { momentId } = ctx.params

        const result = await momentService.queryById(momentId)

        ctx.body = {
            code: 0,
            message:'查询单条动态成功',
            data:result
        }
    }
    
    async remove (ctx, next) { 
        
        const { momentId } = ctx.params

        const result = await momentService.remove(momentId)

        ctx.body = {
            code: 0,
            message: '删除动态成功',
            data:result
        }
        

     }


    async update (ctx, next) { 
        const { content } = ctx.request.body
        const { momentId } = ctx.params

        const result = await momentService.update(content, momentId)

        ctx.body = {
            code: 0,
            message: '成功修改一条',
            data:result
        }
    }
    
    // 为动态添加标签,即,向moment_label表中添加关系数据
    async addLabel (ctx, next) { 
        const { labels } = ctx
        const { momentId } = ctx.params

        // 首先检查moment_label表中是否存在此关系
        // 1.若存在,则不操作
        // 2.若不存在, 则操作
        try {
            for (let label of labels) { 
                const isExist = await labelService.hasLabel(label.id, momentId)
            
                if (!isExist) {
                    const result = await labelService.addLabel(label.id, momentId)
                }
            }

            ctx.body = {
                code: 0,
                message:'动态添加标签成功'
            }

        } catch (error) {
            console.log('动态添加失败',error);
            ctx.body = {
                code: 0,
                message:'动态添加失败'
            }
        }
        
     }
 }


module.exports = new MomentController()