const tap = require('tap')
const showMe = require('../../templates/helpers/show-me')

tap.equal(showMe(), 'invisible', 'If undefined invisible')

tap.equal(showMe(''), 'invisible', 'If empty invisible')

tap.equal(showMe('yay'), 'show-me', 'If length show-me')
