'use strict'

module.exports = (type) => {
  const categoriesData = require('../config/categories.json')
  const categories = categoriesData[type]

  return categories || []
}
