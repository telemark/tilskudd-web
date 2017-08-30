'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)
const pkg = require('../package.json')
const repackBrreg = require('../lib/repack-brreg')
const repackKontaktinfo = require('../lib/repack-kontaktinfo')

module.exports.showFrontpage = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress') || ''
  const viewOptions = {
    inProgress: inProgress,
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('index', viewOptions)
}

module.exports.showKontaktpage = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress') || ''
  const viewOptions = {
    inProgress: inProgress,
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('kontakt', viewOptions)
}

module.exports.showPersonvernpage = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress') || ''
  const viewOptions = {
    inProgress: inProgress,
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('personvern', viewOptions)
}

module.exports.showTilskuddpage = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress') || ''
  const viewOptions = {
    inProgress: inProgress,
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('tilskuddsordningene', viewOptions)
}

module.exports.showIkkefunnetpage = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress') || ''
  const viewOptions = {
    inProgress: inProgress,
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('ikkefunnet', viewOptions)
}

module.exports.showOrganisasjonsnummerpage = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress') || ''
  const viewOptions = {
    inProgress: inProgress,
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('organisasjonsnummer', viewOptions)
}

module.exports.start = (request, reply) => {
  const yar = request.yar
  const receivedToken = request.query.jwt
  const jwtDecrypted = jwt.verify(receivedToken, config.JWT_SECRET)
  const data = encryptor.decrypt(jwtDecrypted.data)

  const tokenOptions = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }

  const token = jwt.sign(data, config.JWT_SECRET, tokenOptions)

  const dsfData = data.dsfData
  const korData = data.korData
  const brregData = data.brregData
  const dsfError = data.dsfError
  const korError = data.korError
  const trouble = (dsfError || korError) || (!dsfData || !korData || !brregData)

  yar.reset()
  yar.set('dsfData', dsfData)
  yar.set('korData', korData)
  yar.set('brregData', brregData)
  yar.set('skjemaUtfyllingStart', new Date().getTime())

  if (trouble) {
    reply.redirect('/ikkefunnet')
  } else {
    request.cookieAuth.set({
      token: token,
      isAuthenticated: true,
      data: data
    })

    yar.set('inProgress', true)
    yar.set('validatedContactInfo', false)
    yar.set('organisasjon', repackBrreg(data.brregData))
    yar.set('kontaktperson', repackKontaktinfo(data))

    reply.redirect('/organisasjon')
  }
}

module.exports.doLogout = (request, reply) => {
  const yar = request.yar

  yar.reset()

  request.cookieAuth.clear()

  reply.redirect(config.AUTH_LOGOUT_URL)
}
