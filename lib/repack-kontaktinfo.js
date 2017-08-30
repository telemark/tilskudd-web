'use strict'

module.exports = (data) => {
  const dsf = data.dsfData
  const kor = data.korData
  const person = {
    navn: dsf.NAVN,
    telefonNummer: kor.MobilePhone,
    epost: kor.Email
  }

  return person
}
