const tap = require('tap')
const hideMe = require('../../templates/helpers/hide-me')

tap.equal(hideMe(), 'show-me', 'If undefined show-me')

tap.equal(hideMe(''), 'show-me', 'If empty show-me')

tap.equal(hideMe('yay'), 'invisible', 'If length invisible')
