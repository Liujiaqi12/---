/**
 * @description json schema 
 * @author jinyuwanguwang、
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true     
})

/**
 * 
 * @param {Object} schema json schema
 * @param {Object} data 
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate