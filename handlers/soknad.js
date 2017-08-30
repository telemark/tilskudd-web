'use strict'

const config = require('../config')
const pkg = require('../package.json')
const getCategories = require('../lib/get-categories')
const getNextForm = require('../lib/get-next-form')
const getSkipSteps = require('../lib/get-skip-steps')
const prepareSoknad = require('../lib/prepare-data-for-submit')
const getReferer = require('../lib/get-referer')
const generateBreadCrumbs = require('../lib/generate-breadcrumb')
const saveApplication = require('../lib/save-application')
const logger = require('../lib/logger')

module.exports.doInit = (request, reply) => {
  const payload = request.payload
  const orgNr = payload.orgnr
  const url = `${config.AUTH_LOGIN_URL}/${orgNr}`

  reply.redirect(url)
}

module.exports.getNextStep = (request, reply) => {
  const payload = request.payload
  const yar = request.yar
  const validatedContactInfo = yar.get('validatedContactInfo')
  const cameFrom = getReferer(request.headers)

  if (payload) {
    var completedSteps = yar.get('completedSteps') || []
    completedSteps.push(payload.stepName)
    yar.set(payload.stepName, payload)
    yar.set('completedSteps', completedSteps)
    const skipSteps = getSkipSteps(yar._store)
    skipSteps.forEach(function (item) {
      yar.set(item, false)
    })
  }

  const nextForm = getNextForm(yar._store)

  if (validatedContactInfo) {
    if (nextForm === cameFrom) {
      reply.redirect('/previous')
    } else {
      reply.redirect('/' + nextForm)
    }
  } else {
    reply.redirect('/kontaktperson')
  }
}

module.exports.getPreviousStep = (request, reply) => {
  const yar = request.yar
  var completedSteps = yar.get('completedSteps')
  if (completedSteps) {
    const previousStep = completedSteps.pop()
    yar.set('completedSteps', completedSteps)
    reply.redirect('/' + previousStep)
  } else {
    reply.redirect('/')
  }
}

module.exports.getPartOrganisasjon = (request, reply) => {
  const yar = request.yar
  const data = yar.get('organisasjon') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('organisasjon', viewOptions)
}

module.exports.getPartKontaktperson = (request, reply) => {
  const yar = request.yar
  const data = yar.get('kontaktperson') || {}
  const inProgress = yar.get('inProgress')
  yar.set('validatedContactInfo', true)
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('kontaktperson', viewOptions)
}

module.exports.getPartFormal = (request, reply) => {
  const yar = request.yar
  const data = yar.get('formal') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('formal', viewOptions)
}

module.exports.getPartTarget = (request, reply) => {
  const yar = request.yar
  const data = yar.get('target') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('target', viewOptions)
}

module.exports.getPartCollaboration = (request, reply) => {
  const yar = request.yar
  const data = yar.get('collaboration') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('collaboration', viewOptions)
}

module.exports.getPartSamarbeidsparter = (request, reply) => {
  const yar = request.yar
  const data = yar.get('samarbeidsparter') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('samarbeidsparter', viewOptions)
}

module.exports.getPartArtform = (request, reply) => {
  const yar = request.yar
  const data = yar.get('artform') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('artform', viewOptions)
}

module.exports.getPartKategorier = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress')
  const artform = yar.get('artform')
  const formal = yar.get('formal')
  const isFolkehelse = /folkehelse/.test(formal.formal)
  const categoryType = isFolkehelse ? 'Folkehelse' : artform.artform
  const data = yar.get('kategorier') || {}
  const categories = getCategories(categoryType)
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL,
    categories: categories
  }

  reply.view('kategorier', viewOptions)
}

module.exports.getPartPartners = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress')
  const data = yar.get('partners') || {}
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('partners', viewOptions)
}

module.exports.getPartTiltak = (request, reply) => {
  const yar = request.yar
  const data = yar.get('tiltak') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('tiltak', viewOptions)
}

module.exports.getPartBidrag = (request, reply) => {
  const yar = request.yar
  const data = yar.get('bidrag') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('bidrag', viewOptions)
}

module.exports.getPartSeover = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress')
  const document = prepareSoknad(request)
  const viewOptions = {
    inProgress: inProgress,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL,
    document: document
  }

  reply.view('seover', viewOptions)
}

module.exports.getPartFinanser = (request, reply) => {
  const yar = request.yar
  const data = yar.get('finanser') || {}
  const inProgress = yar.get('inProgress')
  const viewOptions = {
    inProgress: inProgress,
    data: data,
    crumbs: generateBreadCrumbs(yar._store),
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL
  }

  reply.view('finanser', viewOptions)
}

module.exports.getPartKvittering = (request, reply) => {
  const yar = request.yar
  const document = prepareSoknad(request)
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: config.AUTH_LOGOUT_URL,
    document: document
  }

  yar.reset()

  reply.view('kvittering', viewOptions)
}

module.exports.doCleanup = (request, reply) => {
  const yar = request.yar

  yar.reset()

  reply.redirect('/')
}

module.exports.doSubmit = async (request, reply) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const document = prepareSoknad(request)
  logger('info', ['soknad', 'doSubmit', applicantId])
  try {
    await saveApplication(document)
    logger('info', ['soknad', 'doSubmit', applicantId, 'success'])
    reply.redirect('/kvittering')
  } catch (error) {
    logger('error', ['soknad', 'doSubmit', applicantId, error])
    reply.redirect('/feil')
  }
}
