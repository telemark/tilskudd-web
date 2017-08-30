'use strict'

const generateEnterpriseAddress = require('./generate-enterprise-address')

module.exports = (brreg) => {
  const address = generateEnterpriseAddress(brreg)

  const fixPhones = (data) => {
    let phones = []

    if (data.tlf && data.tlf !== '') {
      phones.push(data.tlf)
    }

    if (data.tlf_mobil && data.tlf_mobil !== '') {
      phones.push(data.tlf_mobil)
    }

    return phones.join(' / ')
  }

  const data = {
    organisasjonsNummer: brreg.orgnr,
    organisasjonsNavn: brreg.navn,
    kontoNummer: '',
    adresse: `${address.address}, ${address.zip} ${address.city}`,
    telefonNummer: fixPhones(brreg),
    epost: ''
  }

  return data
}
