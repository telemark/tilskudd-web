'use strict'

function init () {
  var cancelButton = document.getElementById('cancelButton')

  cancelButton.addEventListener('click', function (e) {
    e.preventDefault()

    var result = confirm('Er du sikker på at du vil avbryte søknaden? Alt du har gjort vil bli slettet.')

    if (result) {
      window.location.href = cancelButton.getAttribute('href')
    }
  })
}

function ready (fn) {
  if (document.readyState != 'loading') {
    fn ()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)