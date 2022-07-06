

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../config/constants')
const { timeFormat } = require('../untils/dt')
 

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}
 

function formatUser(list) {
    if (list == null) {
        return list
    }
 
    if (list instanceof Array) {
       
        return list.map(_formatUserPicture)
    }
 
  
    return _formatUserPicture(list)
}
 

function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}
 

function _formatContent(obj) {
    obj.contentFormat = obj.content
 
   
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nikeName, userName) => {
            return `<a href="/profile/${userName}">@${nikeName}</a>`
        }
    )
 
    return obj
}
 

function formatBlog(list) {
    if (list == null) {
        return list
    }
 
    if (list instanceof Array) {
     
        return list.map(_formatDBTime).map(_formatContent)
    }
   
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}
 
module.exports = {
    formatUser,
    formatBlog
}
 