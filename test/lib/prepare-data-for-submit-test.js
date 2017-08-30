'use strict'

const tap = require('tap')
const prepareDataForSubmit = require('../../lib/prepare-data-for-submit')
const config = require('../../config')
const data = require('../data/soknad.json')
const request = {
  headers: {
    'user-agent': 'cheezdoodle 7.8'
  },
  yar: {
    '_store': data
  }
}
const document = prepareDataForSubmit(request)

tap.equal(JSON.stringify(document.kontaktperson), JSON.stringify(data.kontaktperson), 'request is copied OK')

tap.equal(document.CALLBACK_STATUS_URL, config.CALLBACK_STATUS_URL, 'config is copied OK')
