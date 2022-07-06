

const router = require('koa-router')()
router.prefix('/api/square')
 
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')

const { getBlogListString } = require('../../untils/blog')
 

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getSquareBlogList(pageIndex)

    result.data.blogListTpl = getBlogListString(result.data.blogList)
    
    ctx.body = result
})
 
 
 
module.exports = router