const config = require('../config')
const pkg = require('../package.json')
const buildTestdata = require('../lib/build-testdata')
const buildTestJwt = require('../lib/build-test-jwt')

module.exports.showTestPage = async (request, h) => {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  return h.view('test', viewOptions)
}

module.exports.setupTestData = async (request, h) => {
  const payload = request.payload
  const data = buildTestdata(payload)
  const jwt = buildTestJwt(data)
  const url = `/start?jwt=${jwt}`

  return h.redirect(url)
}

module.exports.testPing = async (request, h) => {
  return h({ result: 'pong' })
}
