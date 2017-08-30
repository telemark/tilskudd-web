'use strict'

const tap = require('tap')
const handlers = require('../../handlers')

tap.equal(Object.keys(handlers).length, 8, 'There are 8 standard handlers')

tap.ok(handlers.showFrontpage, 'Handler has method showFrontpage')

tap.ok(handlers.showKontaktpage, 'Handler has method showKontaktpage')

tap.ok(handlers.showPersonvernpage, 'Handler has method showPersonvernpage')

tap.ok(handlers.showTilskuddpage, 'Handler has method showTilskuddpage')

tap.ok(handlers.showIkkefunnetpage, 'Handler has method showIkkefunnetpage')

tap.ok(handlers.showOrganisasjonsnummerpage, 'Handler has method showOrganisasjonsnummerpage')

tap.ok(handlers.start, 'Handler has method start')

tap.ok(handlers.doLogout, 'Handler has method doLogout')
