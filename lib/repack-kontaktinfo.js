module.exports = data => {
  const dsf = data.dsfData
  const kor = data.korData

  return {
    navn: dsf.NAVN,
    telefonNummer: kor.MobilePhone,
    epost: kor.Email
  }
}
