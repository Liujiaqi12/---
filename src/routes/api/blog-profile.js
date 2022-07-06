

const router = require('koa-router')()
router.prefix('/api/profile')

const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow, unfollow } = require('../../controller/user-relation')

const { getBlogListString } = require('../../untils/blog')


router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    console.log(pageIndex)
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)
   
    result.data.blogListTpl = getBlogListString(result.data.blogList)
    
    ctx.body = result
})


router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    
    ctx.body = follow(myUserId, curUserId)
})
router.post('/unfollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    
    ctx.body = unfollow(myUserId, curUserId)
})


module.exports = router