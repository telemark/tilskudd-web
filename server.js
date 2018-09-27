const Hapi = require('hapi')
const routes = require('./routes')
const testRoutes = require('./routes/test')
const soknadRoutes = require('./routes/soknad')
const config = require('./config')
const validateApi = require('./lib/validate-api')
const logger = require('./lib/logger')

// Create a server with a host and port
const server = Hapi.server({
  port: 8000
})

// Add the routes
server.route(routes)
server.route(testRoutes)
server.route(soknadRoutes)

// Plugin options
const blankieOptions = {
  styleSrc: ['https://fonts.googleapis.com', 'https://code.getmdl.io', 'unsafe-inline', 'self'],
  fontSrc: 'https://fonts.gstatic.com self',
  scriptSrc: ['self', 'https://code.getmdl.io', 'https://piwik.service.t-fk.no'],
  imgSrc: ['self', 'data:', 'https://piwik.service.t-fk.no'],
  generateNonces: false
}

const yarOptions = {
  storeBlank: false,
  cookieOptions: {
    password: config.YAR_SECRET,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  }
}

const plugins = [
  { plugin: require('scooter') },
  { plugin: require('blankie'), options: blankieOptions },
  { plugin: require('hapi-auth-cookie') },
  { plugin: require('hapi-auth-jwt2') },
  { plugin: require('vision') },
  { plugin: require('inert') },
  { plugin: require('yar'), options: yarOptions }
]

// Start the server
async function start () {
  await server.register(plugins)

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    options: {
      auth: false
    }
  })

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    layout: true,
    layoutPath: 'templates/layouts',
    helpersPath: 'templates/helpers',
    partialsPath: 'templates/partials'
  })

  server.auth.strategy('session', 'cookie', {
    password: config.COOKIE_SECRET,
    cookie: 'tilskudd-session',
    redirectTo: config.AUTH_LOGIN_URL,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  })

  server.auth.default('session')

  server.auth.strategy('jwt', 'jwt', {
    key: config.JWT_SECRET,
    validate: validateApi,
    verifyOptions: { algorithms: [ 'HS256' ] }
  })

  await server.start()
  logger('info', ['server', 'Server running', server.info.uri])
}

start().catch(error => {
  logger('error', ['server', error])
})
