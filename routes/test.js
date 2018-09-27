const handler = require('../handlers/test')

module.exports = [
  {
    method: 'GET',
    path: '/test',
    handler: handler.showTestPage,
    config: {
      auth: false,
      security: true,
      description: 'Show testpage'
    }
  },
  {
    method: 'POST',
    path: '/test',
    handler: handler.setupTestData,
    config: {
      auth: false,
      security: true,
      description: 'Setup testdata'
    }
  },
  {
    method: 'GET',
    path: '/test/ping',
    handler: handler.testPing,
    config: {
      auth: false,
      security: true,
      description: 'Show ping'
    }
  }
]
