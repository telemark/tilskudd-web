'use strict'

const envs = process.env

module.exports = {
  SERVER_PORT: envs.WEB_SERVER_PORT || 8000,
  ENCRYPTOR_SECRET: envs.ENCRYPTOR_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  COOKIE_SECRET: envs.COOKIE_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  JWT_SECRET: envs.JWT_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  YAR_SECRET: envs.YAR_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  AUTH_LOGIN_URL: envs.AUTH_LOGIN_URL || '/login',
  AUTH_LOGOUT_URL: envs.AUTH_LOGOUT_URL || 'https://selvbetjening.t-fk.no/logout',
  SESSIONS_SERVICE: process.env.SESSIONS_SERVICE || 'https://logs.service.io',
  QUEUE_SERVER: envs.TILSKUDD_QUEUE_SERVER || 'localhost/tilskudd',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'tilskudd',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
