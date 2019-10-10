const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const logger = require('./logger')

module.exports = async document => {
  axios.defaults.headers.common.Authorization = `Bearer ${generateSystemJwt()}`
  const url = `${config.QUEUE_SERVICE}/logs`
  logger('info', ['save-application', 'applicantId', document.applicantId])
  try {
    const { data } = await axios.put(url, document)
    logger('info', ['save-application', 'applicantId', document.applicantId, 'id', data._id, 'success'])
    return true
  } catch (error) {
    logger('error', ['save-application', 'applicantId', document.applicantId, error])
    throw error
  }
}
