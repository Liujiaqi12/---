/**
 * @description jest server
 * @author jinyuwanguwang、
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)