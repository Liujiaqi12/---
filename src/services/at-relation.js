


const { AtRelation, User, Blog } = require('../db/model')
const { formatBlog, formatUser } = require('./_format')

/**

 * @param {number} blogId 
 * @param {number} userId 
 */
async function createAtRelation (blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

/**

 * @param {number} userId 
 */
async function getAtRelationCount (userId) {
    const res = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return res.count
}

/**
 
 * @param {*} param0 
 */
async function getAtUserBlogList ({ userId, pageIndex, pageSize}) {
    const res = await Blog.findAndCountAll({
        offset: pageIndex * pageSize,
        limit: pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                where: { userId },
                attribute: ['userId', 'blogId']
            },
            {
                model: User,
                attribute: ['userName', 'nikeName', 'picture']
            }
        ]
    })
   
    let blogList = res.rows.map(item => item.dataValues)
    blogList = formatBlog(blogList)
    
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return {
        count: res.count,
        blogList
    }
}

/**

 * @param {Object} param0 
 * @param {Object} param1 
 */
async function updateAtRelation ({ newIsRead }, { userId, isRead }) {
   
    const updateData = {}
    if (newIsRead) updateData.isRead = newIsRead
    
    const whereData = {}
    if (userId) whereData.userId = userId
    if (isRead) whereData.isRead = isRead
   
    const res = await AtRelation.update(updateData, {
        where: whereData
    })
    return res[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}