'use strict'

function getSubCategory (data) {
  if (Array.isArray(data)) {
    return data.join(', ')
  } else {
    return data
  }
}

module.exports = (document) => {
  const tiltak = document.tiltak
  const finanser = document.finanser
  const isFolkehelse = /folkehelse/.test(document.formal.formal)
  const isKultur = /kultur/.test(document.formal.formal)
  const isIdrett = /idrett/.test(document.formal.formal)
  var output = []

  output.push(`Navn: ${tiltak.navn}`)

  if (document.formal && document.formal.formal) {
    output.push(`Formål: ${document.formal.formal}`)
  }

  if (document.target && document.target.target) {
    if (Array.isArray(document.target.target)) {
      output.push(`Målgrupper: ${document.target.target.join(', ')}`)
    } else {
      output.push(`Målgruppe: ${document.target.target}`)
    }
  }

  if (isFolkehelse) {
    output.push(`Kategori: ${getSubCategory(document.kategorier.beskrivelse)}`)
  }

  if (isIdrett) {
    output.push(`Kategori:  ${getSubCategory(document.kategorier.beskrivelse)}`)
  }

  output.push(`Beskrivelse: ${tiltak.beskrivelse}`)
  output.push(`Periode: ${tiltak.startdato} - ${tiltak.sluttdato}`)
  output.push(`Frekvens: ${tiltak.antall}`)
  output.push(`Sted: ${tiltak.hvor}`)
  output.push('')
  output.push('<strong>Økonomi</strong>')
  output.push(`Søkebeløp: ${finanser.soknadsSum}`)
  output.push(`Total kostnadsramme: ${finanser.totalRamme}`)
  output.push(`Egne midler: ${finanser.egneMidler}`)
  output.push(`Andre midler (søkt om eller innvilget): ${finanser.andreMidler}`)
  output.push('')
  output.push('<strong>Samarbeidsparter</strong>')
  if (document.collaboration.samarbeid === 'ja') {
    if (document.partners && document.partners.partner) {
      if (Array.isArray(document.partners.partner)) {
        output.push(`${document.partners.partner.join(', ')}`)
      } else {
        output.push(`${document.partners.partner}`)
      }
    }
    output.push(`${document.samarbeidsparter.beskrivelse}`)
    if (document.bidrag && document.bidrag.bidrag) {
      if (Array.isArray(document.bidrag.bidrag)) {
        output.push(`Bidrag: ${document.bidrag.bidrag.join(', ')}`)
      } else {
        output.push(`Bidrag: ${document.bidrag.bidrag}`)
      }
    }
  } else {
    output.push('Ingen samarbeidsparter')
  }

  const trimmed = output.map((item) => item.trim())

  return trimmed.join('<br/>')
}
