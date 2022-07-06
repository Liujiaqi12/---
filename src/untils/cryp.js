/**
 * @description crypto method
 * @author jinyuwanguwang、
 */

const crypto = require('crypto')

// key
const { CRYPTO_SECRECT_KEY } = require('../config/secrectkeys')


/**
 * md5
 * @param {string} content 
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}


function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRECT_KEY}`
    return _md5(str)
}

module.exports = {
    doCrypto
}