/**
 * @description 用户数据模型
 * @author jinyuwanguwang、
 */

const seq = require('../seq')

const {
	STRING,
	TEXT,
	INTEGER
} = require('../types')
// blogs
const Blog = seq.define('blog', {
	userId: {
		type: INTEGER,
		allowNull: false,
		comment: '用户id'
	},
	content: {
		type: TEXT,
		allowNull: false,
		comment: '微博内容'
	},
	image: {
		type: STRING,
		allowNull: true,
		comment: '微博图片'
	}
}, {
	freezeTableName: true
})
// Blog.sync().then(() => {
// 	console.log('成功');
// 	process.exit() // 成功之后退出，否则会一直在后台运行
// })
module.exports = Blog
