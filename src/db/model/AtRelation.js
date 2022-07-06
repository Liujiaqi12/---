/**
 * @description 微博 @ 用户关系，数据模型
 * @author jinyuwanguwang、
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID' 
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, // 未读
        comment: '是否已读'
    }
},{freezeTableName:true})
// AtRelation.sync().then(()=>{
// 	console.log('成功');
// 	process.exit() // 成功之后退出，否则会一直在后台运行
// }) 
module.exports = AtRelation