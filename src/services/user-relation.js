

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')


async function getUserByFollower (followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'nikeName', 'userName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId
                    }
                }
            }
        ]
    })
    
   
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

/**

 * @param {*} userId 
 */
async function getFollowersByUser (userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'nikeName', 'userName', 'picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })

   
    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(item => {
        let user = item.user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count, 
        userList
    }
}

/**

 * @param {*} userId
 * @param {*} followerId 
 */
async function addFollower (userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues
}

async function deleteFollower (userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

module.exports = {
    getUserByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
}