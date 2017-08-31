'use strict'

const config = require('../config')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)

module.exports = (input) => {
  const data = {
    korData: {
      Email: input.personepost,
      MobilePhone: input.persontelefonNummer,
      uid: '12345678901',
      logoutUrl: 'https://selvbetjening.t-fk.no/logout'
    },
    dsfData: {
      NAVN: input.personnavn,
      'NAVN-S': '',
      'NAVN-M': '',
      'NAVN-F': '',
      ADR: '',
      POSTN: '',
      POSTS: '',
      GARD: '',
      KOMNR: '',
      BRUK: '',
      FODT: '123456',
      PERS: '78901',
      'SPES-KD': '0'
    },
    brregData: {
      forretningsadr: input.forretningsadr,
      forradrpostnr: input.forradrpostnr,
      forradrpoststed: input.forradrpoststed,
      orgnr: input.organisasjonsNummer,
      navn: input.organisasjonsNavn,
      ppostnr: input.ppostnr,
      ppoststed: input.ppoststed,
      postadresse: input.postadresse,
      tlf: input.telefonNummer,
      tlf_mobil: input.mobilNummer
    }
  }

  const encrypted = encryptor.encrypt(data)

  return encrypted
}
