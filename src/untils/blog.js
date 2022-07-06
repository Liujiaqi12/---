/**
 * @description blogdatabase
 * @author jinyuwanguwang、
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// read blog—list.ejs 
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 
 * @param {Array} blogList bloglist
 * @param {Boolean} canReply reply 
 * @returns 
 */
function getBlogListString(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListString
}