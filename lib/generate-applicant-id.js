'use strict'

const config = require('../config')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)

module.exports = data => {
  return encryptor.hmac(`${data.FODT}${data.PERS}`, 'hex')
}
