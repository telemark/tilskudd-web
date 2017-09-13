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

  logger('info', ['soknad', 'doInit', 'orgNr', orgNr, 'url', url])

  reply.redirect(url)
}

module.exports.getNextStep = (request, reply) => {
  const payload = request.payload
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const validatedContactInfo = yar.get('validatedContactInfo')
  const cameFrom = getReferer(request.headers)

  if (payload) {
    logger('info', ['soknad', 'getNextStep', 'applicantId', applicantId, 'payload', payload.stepName])
    let completedSteps = yar.get('completedSteps') || []
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
  const applicantId = yar.get('applicantId')
  let completedSteps = yar.get('completedSteps')
  logger('info', ['soknad', 'getPreviousStep', 'applicantId', applicantId, 'completedSteps', completedSteps])
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
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartOrganisasjon', 'applicantId', applicantId])
  reply.view('organisasjon', viewOptions)
}

module.exports.getPartKontaktperson = (request, reply) => {
  const yar = request.yar
  const data = yar.get('kontaktperson') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartKontaktperson', 'applicantId', applicantId])
  reply.view('kontaktperson', viewOptions)
}

module.exports.getPartFormal = (request, reply) => {
  const yar = request.yar
  const data = yar.get('formal') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartFormal', 'applicantId', applicantId])
  reply.view('formal', viewOptions)
}

module.exports.getPartTarget = (request, reply) => {
  const yar = request.yar
  const data = yar.get('target') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartTarget', 'applicantId', applicantId])
  reply.view('target', viewOptions)
}

module.exports.getPartCollaboration = (request, reply) => {
  const yar = request.yar
  const data = yar.get('collaboration') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartCollaboration', 'applicantId', applicantId])
  reply.view('collaboration', viewOptions)
}

module.exports.getPartSamarbeidsparter = (request, reply) => {
  const yar = request.yar
  const data = yar.get('samarbeidsparter') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartSamarbeidsparter', 'applicantId', applicantId])
  reply.view('samarbeidsparter', viewOptions)
}

module.exports.getPartArtform = (request, reply) => {
  const yar = request.yar
  const data = yar.get('artform') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartArtform', 'applicantId', applicantId])
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
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartKategorier', 'applicantId', applicantId, 'categoryType', categoryType])
  reply.view('kategorier', viewOptions)
}

module.exports.getPartPartners = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress')
  const data = yar.get('partners') || {}
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartPartners', 'applicantId', applicantId])
  reply.view('partners', viewOptions)
}

module.exports.getPartTiltak = (request, reply) => {
  const yar = request.yar
  const data = yar.get('tiltak') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartTiltak', 'applicantId', applicantId])
  reply.view('tiltak', viewOptions)
}

module.exports.getPartBidrag = (request, reply) => {
  const yar = request.yar
  const data = yar.get('bidrag') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartBidrag', 'applicantId', applicantId])
  reply.view('bidrag', viewOptions)
}

module.exports.getPartSeover = (request, reply) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartSeover', 'applicantId', applicantId])
  reply.view('seover', viewOptions)
}

module.exports.getPartFinanser = (request, reply) => {
  const yar = request.yar
  const data = yar.get('finanser') || {}
  const inProgress = yar.get('inProgress')
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartFinanser', 'applicantId', applicantId])
  reply.view('finanser', viewOptions)
}

module.exports.getPartKvittering = (request, reply) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
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
  logger('info', ['soknad', 'getPartKvittering', 'applicantId', applicantId])
  reply.view('kvittering', viewOptions)
}

module.exports.doCleanup = (request, reply) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  yar.reset()
  logger('info', ['soknad', 'doCleanup', 'applicantId', applicantId])
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
