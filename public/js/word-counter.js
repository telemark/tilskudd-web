'use strict'

function init () {
  var totalChars = 1000
  var textField = document.getElementById('beskrivelse')
  var tegnIgjen = document.getElementById('tegnIgjen')

  function updateCount () {
    tegnIgjen.textContent = totalChars - textField.value.length
  }

  textField.addEventListener('input', updateCount)

  updateCount()
}

function ready (fn) {
  if (document.readyState != 'loading') {
    fn ()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)
