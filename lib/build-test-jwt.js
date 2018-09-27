'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (data) => {
  const options = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }

  const token = jwt.sign({ data: data }, config.JWT_SECRET, options)

  return token
}
