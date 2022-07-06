

const { Blog, User, UserRelation } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
const { PAGE_SIZE } = require('../config/constants')

/**
 * creatblog
 * @param {Object} param0  {userId, content, image}
 */
async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 
 * @param {Object} param0  { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser(
    { userName, pageIndex = 0, pageSize = 10 }
) {
    
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nikeName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    

    
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}


async function getFollowerBlogList ({userId, pageIndex=0, pageSize = PAGE_SIZE}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nikeName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: { userId }
            }
        ]
    })
   
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(item => {
        item.user = formatUser(item.user.dataValues)
        return item
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowerBlogList
}