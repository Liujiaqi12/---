/**
 * @description datetime
 * @author jinyuwanguwang、
 */

const { format } = require('date-fns')

/**

  * @param {string} str dtstr
  */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}
 
module.exports = {
    timeFormat
}
 