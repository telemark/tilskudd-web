const url = require('url')

module.exports = (headers) => {
  const referer = headers.referer

  if (referer) {
    const parsed = url.parse(referer)
    return parsed.pathname.replace('/', '')
  } else {
    return false
  }
}
