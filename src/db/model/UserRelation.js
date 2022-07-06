/**
 * @description 用户关注关系
 * @author jinyuwanguwang、
 */

const seq = require('../seq')

const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户id'
    }
},{freezeTableName:true})

// UserRelation.sync().then(()=>{
// 	console.log('成功');
// 	process.exit() // 成功之后退出，否则会一直在后台运行
// }) 
module.exports = UserRelation