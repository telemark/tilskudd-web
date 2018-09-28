const paths = require('../config/paths.json')

module.exports = (store) => {
  const allKeys = Object.keys(store)
  const completed = allKeys.filter((key) => store[key])
  const isCompleted = (item) => completed.indexOf(item.id) > -1
  const completes = paths.filter(isCompleted)
  const crumbs = completes.map((item) => { return `<li><a href="/${item.id}">${item.name}</a></li>` })

  return crumbs.length > 2 ? crumbs : []
}
