[![Build Status](https://travis-ci.org/telemark/tilskudd-web.svg?branch=master)](https://travis-ci.org/telemark/tilskudd-web)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tilskudd-web.svg)](https://greenkeeper.io/)

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

Setup now:alias in [package.json](package.json)

Run deployment script.

```
$ npm run now-deploy
```

## Related
- [micro-logs-main](https://github.com/telemark/micro-logs-main) log/queue microservice
- [tilskudd-logs-stats](https://github.com/telemark/tilskudd-logs-stats) stats microservice

## License

[MIT](LICENSE)

![Robohash image of tilskudd-web](https://robots.kebabstudios.party/tilskudd-web.png "Robohash image of tilskudd-web")