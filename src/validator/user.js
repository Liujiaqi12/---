/**
 * @description userdatebase format check
 * @author jinyuwanguwang、
 */

const validate = require('./_validator')
// user datebase check
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', 
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        picture: {
            type: 'string',
            maxLength: 255
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}

/**
 * check userinput dataformat
 * @param {Object} data userdata
 */
function userValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = {
    userValidate
}