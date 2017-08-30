'use strict'

const tap = require('tap')
const routes = require('../../routes/test')

tap.equal(routes.length, 3, 'There are 3 test routes')
