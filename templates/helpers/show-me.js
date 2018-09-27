'use strict'

module.exports = (input) => {
  const data = input || ''
  return data || data.length > 0 ? 'show-me' : 'invisible'
}
