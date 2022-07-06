

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const { blogValidate } = require('../../validator/blog')

const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListString } = require('../../untils/blog')

router.prefix('/api/blog')


router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({content, userId, image})
})

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getSquareBlogList(pageIndex)
   
    result.data.blogListTpl = getBlogListString(result.data.blogList)
  
    ctx.body = result
})



module.exports = router