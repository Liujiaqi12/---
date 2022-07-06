

const {
	User
} = require('../db/model/index')
const {
	formatUser
} = require('./_format')
const {
	addFollower
} = require('./user-relation')

async function getUserInfo(userName, password) {
	
	const whereOpt = {
		userName
	}
	if (password) {
		Object.assign(whereOpt, {
			password
		})
	}
	
	const result = await User.findOne({
		attributes: ['id', 'userName', 'nikename', 'picture', 'city'],
		where: whereOpt
	})
	if (result === null) {
		
		return result
	}
	
	const formatRes = formatUser(result.dataValues)
	return formatRes
}



async function createUser({
	userName,
	password,
	gender = 3,
	nikename
}) {
	const result = await User.create({
		userName,
		password,
		nikename: nikename ? nikename : userName,
		gender
	})
	const data = result.dataValues
	console.log(result)
	
	addFollower(data.id, data.id)

	return data
}


async function updateUser({
	newPassword,
	newCity,
	newPicture,
	newNikename
}, {
	userName,
	password
}) {
	
	const updateData = {}
	if (newPassword) {
		updateData.password = newPassword
	}
	if (newCity) {
		updateData.city = newCity
	}
	if (newPicture) {
		updateData.picture = newPicture
	}
	if (newNikename) {
		updateData.nikename = newNikename
	}
	
	const whereData = {
		userName
	}
	if (password) {
		whereData.password = password
	}

	const result = await User.update(updateData, {
		where: whereData
	})
	
	return result[0] > 0
}


module.exports = {
	getUserInfo,
	createUser,
	updateUser
}
