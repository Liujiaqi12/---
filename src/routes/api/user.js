

const router = require('koa-router')()
const { isExist, register, login, changerInfo, changePassword, logout } = require('../../controller/user')
const { userValidate } = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getFollowers } = require('../../controller/user-relation')
router.prefix('/api/user')


router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})


router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})


router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login({ctx, userName, password})
})


router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nikename, city, picture } = ctx.request.body
    ctx.body = await changerInfo(ctx, {nikename, city, picture})
})



router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})



router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})


router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const result = await getFollowers(userId)
    const { userList } = result.data
    list = userList.map(user => {
        return `${user.nikeName} - ${user.userName}`
    })
    ctx.body = list
})


module.exports = router