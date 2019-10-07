module.exports = (store) => {
  const completedSteps = Object.keys(store)
  const skips = []

  if (completedSteps.indexOf('collaboration') > -1) {
    // What to skip if collaboration
    if (store.collaboration.samarbeid === 'nei') {
      skips.push('partners')
      skips.push('samarbeidsparter')
      skips.push('bidrag')
    }
  }

  if (completedSteps.indexOf('formal') > -1) {
    // What to skip if formal
    if (/folkehelse/.test(store.formal.formal)) {
      skips.push('artform')
    }
  }

  return skips
}
