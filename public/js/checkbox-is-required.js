'use strict'

function init () {
  var button = document.getElementById('nextButton')
  var checkboxes = document.querySelectorAll('input[type="checkbox"]')

  Array.prototype.forEach.call(checkboxes, function (el) {
    el.addEventListener('click', function (e) {
      inputOk()
    })
  })

  function inputOk () {
    button.disabled = true
    Array.prototype.forEach.call(checkboxes, function (box) {
      if (box.checked === true) {
        button.disabled = false
      }
    })
  }

  inputOk()
}

function ready (fn) {
  if (document.readyState != 'loading') {
    fn ()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)
