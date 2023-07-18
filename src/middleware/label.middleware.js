const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => { 

    // 获取传递的标签
    const { labels } = ctx.request.body

    // 判断label表中是否已经存在某些标签
    // 1.若存在,则不进行添加操作
    // 2.若不存在, 则进行添加操作

    const newLabels = []
    for (let name of labels) { 
        const isExist = await labelService.queryLabel(name)
        const labelObj = { name }
        if (!isExist) {
            const result = await labelService.create(name)
            labelObj.id = result.insertId
        } else { 
            labelObj.id = isExist.id
        }
        newLabels.push(labelObj)
    }
    console.log(newLabels);

    // 为下个中间件提供labels数据
    ctx.labels = newLabels
    
    await next()
}



module.exports = {
    verifyLabelExists
}