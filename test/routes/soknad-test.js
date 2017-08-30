'use strict'

const tap = require('tap')
const routes = require('../../routes/soknad')

tap.equal(routes.length, 20, 'There are 20 soknad routes')
