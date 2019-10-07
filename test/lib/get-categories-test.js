'use strict'

const tap = require('tap')
const getCategories = require('../../lib/get-categories')
const expectedCategories = [
  {
    id: '101',
    description: 'Utstilling'
  },
  {
    id: '102',
    description: 'Seminar'
  },
  {
    id: '103',
    description: 'Publikasjon'
  }
]

tap.ok(getCategories, 'get-categories loads OK')

tap.equal(JSON.stringify(getCategories('Billedkunst')), JSON.stringify(expectedCategories), 'returns expected for Billedkunst')

tap.equal(JSON.stringify(getCategories('nonExistingCategory')), JSON.stringify([]), 'returns expected for nonExistingCategory')
