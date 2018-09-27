'use strict'

module.exports = (crumbs) => {
  return `<nav><ul class="breadcrumbs">${crumbs.join('')}</ul></nav>`
}
