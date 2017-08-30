'use strict'

const steps = [
  'seover',
  'bidrag',
  'finanser',
  'samarbeidsparter',
  'partners',
  'collaboration',
  'tiltak',
  'target',
  'kategorier',
  'artform',
  'formal',
  'kontaktperson',
  'organisasjon'
]

module.exports = (store) => {
  const completedSteps = Object.keys(store)
  var nextForm = 'seover'

  steps.forEach(function (step) {
    if (completedSteps.indexOf(step) === -1) {
      nextForm = step
    }
  })

  return nextForm
}
