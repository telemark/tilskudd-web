'use strict'

const tap = require('tap')
const handlers = require('../../handlers/test')

tap.equal(Object.keys(handlers).length, 3, 'There are 3 test handlers')

tap.ok(handlers.showTestPage, 'Handler has method showTestPage')

tap.ok(handlers.setupTestData, 'Handler has method setupTestData')

tap.ok(handlers.testPing, 'Handler has method testPing')
