'use strict'

module.exports = (data, value) => {
  const arr = Array.isArray(value) ? value : [value]
  return arr.indexOf(data) > -1 ? 'checked' : ''
}
