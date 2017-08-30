'use strict'

const tap = require('tap')
const handlers = require('../../handlers/soknad')

tap.equal(Object.keys(handlers).length, 19, 'There are 19 soknad handlers')

tap.ok(handlers.doInit, 'Handler has method doInit')

tap.ok(handlers.getNextStep, 'Handler has method getNextStep')

tap.ok(handlers.getPreviousStep, 'Handler has method getPreviousStep')

tap.ok(handlers.getPartOrganisasjon, 'Handler has method getPartOrganisasjon')

tap.ok(handlers.getPartKontaktperson, 'Handler has method getPartKontaktperson')

tap.ok(handlers.getPartFormal, 'Handler has method getPartFormal')

tap.ok(handlers.getPartTarget, 'Handler has method getPartTarget')

tap.ok(handlers.getPartCollaboration, 'Handler has method getPartCollaboration')

tap.ok(handlers.getPartSamarbeidsparter, 'Handler has method getPartSamarbeidsparter')

tap.ok(handlers.getPartArtform, 'Handler has method getPartArtform')

tap.ok(handlers.getPartKategorier, 'Handler has method getPartKategorier')

tap.ok(handlers.getPartPartners, 'Handler has method getPartPartners')

tap.ok(handlers.getPartBidrag, 'Handler has method getPartBidrag')

tap.ok(handlers.getPartTiltak, 'Handler has method getPartTiltak')

tap.ok(handlers.getPartSeover, 'Handler has method getPartSeover')

tap.ok(handlers.getPartFinanser, 'Handler has method getPartFinanser')

tap.ok(handlers.getPartKvittering, 'Handler has method getPartKvittering')

tap.ok(handlers.doCleanup, 'Handler has method doCleanup')

tap.ok(handlers.doSubmit, 'Handler has method doSubmit')
