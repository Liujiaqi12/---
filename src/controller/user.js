

const { getUserInfo, createUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { doCrypto } = require('../untils/cryp')
const { 
    userMsgNotExist, userMsgExist, registerFail, loginFailInfo, changeInfoFailInfo,
    changePasswordFailInfo
} = require('../model/ErrorInfo')

async function isExist(userName) {
   
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
   
        return new SuccessModel(userInfo)
    } else {
       
        return new ErrorModel(userMsgNotExist)
    }
}


async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(userMsgExist)
    }
   
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
		console.log(userName, password, gender)
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFail)
    }

}


async function login({ ctx, userName, password }) {
    
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
      
        return new ErrorModel(loginFailInfo)
    }

    
    ctx.session.userInfo = userInfo
   
    return new SuccessModel()
}

/**
 * 修改基本信息
 * @param {Object} ctx ctx
 * @param {string} nikename 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changerInfo(ctx, {nikename, city, picture}) {
    const { userName } = ctx.session.userInfo
    // serivce修改
    const result = await updateUser(
        {
            newCity: city,
            newNikename: nikename,
            newPicture: picture
        },
        {
            userName
        }
    )
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nikename,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 更改用户密码
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName ,password, newPassword) {
    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    if (result) {
        // 执行成果
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    changerInfo,
    changePassword,
    logout
}