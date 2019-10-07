module.exports = headers => {
  const { referer } = headers

  if (referer) {
    const url = new URL(referer)
    return url.pathname.replace('/', '')
  } else {
    return false
  }
}
