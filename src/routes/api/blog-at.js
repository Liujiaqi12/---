

const router = require('koa-router')()
router.prefix('/api/atMe')

const { loginCheck } = require('../../middlewares/loginChecks')
const { getAtMeBlogList } = require('../../controller/blog-at')
const { getBlogListString } = require('../../untils/blog')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const { id: userId } = ctx.session.userInfo
    const result = await getAtMeBlogList(userId, pageIndex)
   
    result.data.blogListTpl = getBlogListString(result.data.blogList)
  
    ctx.body = result
})

module.exports = router