

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { isExist} = require('../../controller/user')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount, getAtMeBlogList } = require('../../controller/blog-at')
const { markAsRead } = require('../../controller/blog-at')


router.get('/', loginRedirect, async (ctx, next) => {
    
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    
    const fansResult = await getFans(userInfo.id)
    const { count: fansCount, userList: fansUserList } = fansResult.data 

    
    const followersResult = await getFollowers(userInfo.id)
    const { count: followersCount, userList: followersUserList } = followersResult.data

    
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    await ctx.render('index', {
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        },
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansUserList
            },
            followersData: {
                count: followersCount,
                list: followersUserList
            },
            atCount
        }
    })
})


router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        
        curUserInfo = myUserInfo
    } else {
       
        const existResult = await isExist(curUserName)
        if (existResult.error !== 0) {
          
            return
        }
        
        curUserInfo = existResult.data
    }
  
    const res = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = res.data

    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, userList: fansUserList } = fansResult.data

   
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, userList: followersUserList } = followersResult.data

    
    const amIFollowed = fansUserList.some(item => {
        return item.userName === myUserName
    })

   
    const atCountResult = await getAtMeCount(curUserInfo.id)
    const { count: atCount } = atCountResult.data

    await ctx.render('profile', {
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fansUserList
            },
            amIFollowed,
            followersData: {
                count: followersCount,
                list: followersUserList
            },
            atCount
        }
    })
})


router.get('/square', loginRedirect, async (ctx, next) => {
  
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})


router.get('/at-me', loginRedirect, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
   
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data
   
    const result= await getAtMeBlogList(userId)
    const { blogList, count, isEmpty, pageIndex, pageSize } = result.data
   
    await ctx.render('atMe', {
        atCount,
        blogData: {
            blogList,
            count,
            isEmpty,
            pageIndex,
            pageSize
        }
    })

    
    if (atCount > 0) {
        await markAsRead(userId)
    }
})

module.exports = router