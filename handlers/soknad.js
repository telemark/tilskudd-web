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

module.exports.doInit = async (request, h) => {
  const payload = request.payload
  const orgNr = payload.orgnr
  const url = `${config.AUTH_LOGIN_URL}/${orgNr}`

  logger('info', ['soknad', 'doInit', 'orgNr', orgNr, 'url', url])

  return h.redirect(url)
}

module.exports.getNextStep = async (request, h) => {
  const payload = request.payload
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const validatedContactInfo = yar.get('validatedContactInfo')
  const cameFrom = getReferer(request.headers)

  if (payload) {
    logger('info', ['soknad', 'getNextStep', 'applicantId', applicantId, 'payload', payload.stepName])
    const completedSteps = yar.get('completedSteps') || []
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
      return h.redirect('/previous')
    } else {
      return h.redirect('/' + nextForm)
    }
  } else {
    return h.redirect('/kontaktperson')
  }
}

module.exports.getPreviousStep = async (request, h) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const completedSteps = yar.get('completedSteps')
  logger('info', ['soknad', 'getPreviousStep', 'applicantId', applicantId, 'completedSteps', completedSteps])
  if (completedSteps) {
    const previousStep = completedSteps.pop()
    yar.set('completedSteps', completedSteps)
    return h.redirect('/' + previousStep)
  } else {
    return h.redirect('/')
  }
}

module.exports.getPartOrganisasjon = async (request, h) => {
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
  return h.view('organisasjon', viewOptions)
}

module.exports.getPartKontaktperson = async (request, h) => {
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
  return h.view('kontaktperson', viewOptions)
}

module.exports.getPartFormal = async (request, h) => {
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
  return h.view('formal', viewOptions)
}

module.exports.getPartTarget = async (request, h) => {
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
  return h.view('target', viewOptions)
}

module.exports.getPartCollaboration = async (request, h) => {
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
  return h.view('collaboration', viewOptions)
}

module.exports.getPartSamarbeidsparter = async (request, h) => {
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
  return h.view('samarbeidsparter', viewOptions)
}

module.exports.getPartArtform = async (request, h) => {
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
  return h.view('artform', viewOptions)
}

module.exports.getPartKategorier = async (request, h) => {
  const yar = request.yar
  const inProgress = yar.get('inProgress')
  const formal = yar.get('formal')
  const isFolkehelse = /folkehelse/.test(formal.formal) ? 'Folkehelse' : false
  const isIdrett = /idrett/.test(formal.formal) ? 'Idrett' : false
  const isKultur = /kultur/.test(formal.formal) ? 'Kultur' : false
  const categoryType = isFolkehelse || isKultur || isIdrett
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
  return h.view('kategorier', viewOptions)
}

module.exports.getPartPartners = async (request, h) => {
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
  return h.view('partners', viewOptions)
}

module.exports.getPartTiltak = async (request, h) => {
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
  return h.view('tiltak', viewOptions)
}

module.exports.getPartBidrag = async (request, h) => {
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
  return h.view('bidrag', viewOptions)
}

module.exports.getPartSeover = async (request, h) => {
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
  return h.view('seover', viewOptions)
}

module.exports.getPartFinanser = async (request, h) => {
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
  return h.view('finanser', viewOptions)
}

module.exports.getPartKvittering = async (request, h) => {
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
  return h.view('kvittering', viewOptions)
}

module.exports.doCleanup = async (request, h) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  yar.reset()
  logger('info', ['soknad', 'doCleanup', 'applicantId', applicantId])
  return h.redirect('/')
}

module.exports.doSubmit = async (request, h) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const document = prepareSoknad(request)
  logger('info', ['soknad', 'doSubmit', applicantId])
  try {
    await saveApplication(document)
    logger('info', ['soknad', 'doSubmit', applicantId, 'success'])
    return h.redirect('/kvittering')
  } catch (error) {
    logger('error', ['soknad', 'doSubmit', applicantId, error])
    return h.redirect('/feil')
  }
}
