'use strict'

const config = require('../config')
const pkg = require('../package.json')
const buildTestdata = require('../lib/build-testdata')
const buildTestJwt = require('../lib/build-test-jwt')

module.exports.showTestPage = (request, reply) => {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('test', viewOptions)
}

module.exports.setupTestData = (request, reply) => {
  const payload = request.payload
  const data = buildTestdata(payload)
  const jwt = buildTestJwt(data)
  const url = `/start?jwt=${jwt}`

  reply.redirect(url)
}

module.exports.testPing = (request, reply) => {
  request.seneca.act('role: test, cmd: ping', (error, msg) => {
    reply(error || msg)
  })
}
