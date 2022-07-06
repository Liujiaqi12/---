/**
 * @description user datebase check
 * @author jinyuwanguwang、
 */

const validate = require('./_validator')
// user datebase check
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}
 
/**
  * check input datebase 
  * @param {Object} data blog datebase
  */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}
 
module.exports = {
    blogValidate
}