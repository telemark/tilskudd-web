'use strict'

module.exports = (brreg) => {
  var address = {}

  if (brreg.postadresse !== '') {
    address.address = brreg.postadresse
  } else {
    address.address = brreg.forretningsadr || ''
  }

  if (brreg.ppostnr !== '') {
    address.zip = brreg.ppostnr
  } else {
    address.zip = brreg.forradrpostnr || ''
  }

  if (brreg.ppoststed !== '') {
    address.city = brreg.ppoststed
  } else {
    address.city = brreg.forradrpoststed || ''
  }

  return address
}
