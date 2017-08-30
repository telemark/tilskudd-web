'use strict'

module.exports = (document) => {
  const kontaktperson = document.kontaktperson
  var output = []

  output.push(`Navn: ${kontaktperson.navn}`)
  output.push(`Telefon: ${kontaktperson.telefonNummer}`)
  output.push(`E-post: ${kontaktperson.epost}`)

  return output.join('<br/>')
}
