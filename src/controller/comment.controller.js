const commentService = require('../service/comment.service')

class CommentController { 
    async create (ctx, next) {
        const { content, momentId } = ctx.request.body

        const { id } = ctx.user
        const result = await commentService.create(content, momentId, id)

        ctx.body = {
            code: 0,
            messgae: '评论成功',
            data: result
        }
    }
    
    async reply (ctx, next) { 
        const { content, momentId, commentId } = ctx.request.body

        const { id } = ctx.user
        console.log(content, momentId, commentId);
        const result = await commentService.reply(content, momentId, commentId, id)

        ctx.body = {
            code: 0,
            messgae: '回复评论成功',
            data: result
        }
     }
}
 
module.exports = new CommentController()