[![Build Status](https://travis-ci.org/telemark/tilskudd-web.svg?branch=master)](https://travis-ci.org/telemark/tilskudd-web)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# tilskudd-web

Web frontend for tilskudd.

## Deployment - ZEIT/Now

Setup [production.env](production.env)

```
NODE_ENV=production
WEB_SERVER_PORT=8000
COOKIE_SECRET=@tilskudd-cookie-secret
ENCRYPTOR_SECRET=@tilskudd-encryptor-secret
JWT_SECRET=@tilskudd-jwt-secret
YAR_SECRET=@tilskudd-session-secret
AUTH_LOGIN_URL=@tilskudd-auth-login-url
AUTH_LOGOUT_URL=@tilskudd-auth-logout-url
QUEUE_SERVICE=@tilskudd-queue-service-url
PAPERTRAIL_HOSTNAME=tilskudd
PAPERTRAIL_HOST=@tfk-papertrail-host
PAPERTRAIL_PORT=@tfk-papertrail-port
```

Run deployment script.

```
$ npm run deploy
```

Alias the deployment

```
$ now alias [CTRL+V] [new url]
```

## Development

Add a local `.env` file

```
NODE_ENV=development
WEB_SERVER_PORT=8000
COOKIE_SECRET=cookie-secret
ENCRYPTOR_SECRET=encryptor-secret
JWT_SECRET=jwt-secret
YAR_SECRET=session-secret
AUTH_LOGIN_URL=auth-login-url
AUTH_LOGOUT_URL=auth-logout-url
QUEUE_SERVICE=queue-service-url
```

Start the development server

```
$ npm run dev
```

## Related
- [micro-logs-main](https://github.com/telemark/micro-logs-main) log/queue microservice
- [tilskudd-logs-stats](https://github.com/telemark/tilskudd-logs-stats) stats microservice
- [tilskudd-dashboard](https://github.com/telemark/tilskudd-dashboard) dashboard using the stats service
- [idporten-info-router](https://github.com/telemark) service for enriching logins from id-porten with data
- [hapi-auth-saml-idporten](https://github.com/telemark/hapi-auth-saml-idporten) auth service for id-porten

## License

[MIT](LICENSE)
