const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.showFrontpage,
    config: {
      auth: false,
      security: true,
      description: 'Show frontpage'
    }
  },
  {
    method: 'GET',
    path: '/start',
    handler: handlers.start,
    config: {
      auth: false,
      security: true,
      description: 'Setup start'
    }
  },
  {
    method: 'GET',
    path: '/organisasjonsnummer',
    handler: handlers.showOrganisasjonsnummerpage,
    config: {
      auth: false,
      security: true,
      description: 'Show organisasjonsnummerpage'
    }
  },
  {
    method: 'GET',
    path: '/kontakt',
    handler: handlers.showKontaktpage,
    config: {
      auth: false,
      security: true,
      description: 'Show kontaktpage'
    }
  },
  {
    method: 'GET',
    path: '/ikkefunnet',
    handler: handlers.showIkkefunnetpage,
    config: {
      auth: false,
      security: true,
      description: 'Show ikkefunnet'
    }
  },
  {
    method: 'GET',
    path: '/personvern',
    handler: handlers.showPersonvernpage,
    config: {
      auth: false,
      security: true,
      description: 'Show personvernpage'
    }
  },
  {
    method: 'GET',
    path: '/tilskuddsordningene',
    handler: handlers.showTilskuddpage,
    config: {
      auth: false,
      security: true,
      description: 'Show tilskuddpage'
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: handlers.doLogout,
    config: {
      auth: false,
      security: true,
      description: 'Logout'
    }
  }
]
