'use strict'

function init () {
  var textField = document.getElementById('orgnr')
  var messageField = document.getElementById('orgnrValid')
  var button = document.getElementById('nextButton')

  function isValidOrganizationNumber (organizationnumber) {
    var controlDigitIndex = organizationnumber.length - 1;

    if (organizationnumber.length !== 9) {
      return false
    } else {
      return organizationnumber.substr(controlDigitIndex) === generateControlDigit(organizationnumber.substr(0, controlDigitIndex));
    }
  }

  function generateControlDigit (input) {
    var sum = 0;
    input.split('').reverse().forEach(function (value, index) {
      sum += parseInt(value, 10) * (index % 6 + 2);
    });
    var sumMod11 = sum % 11;
    if (sumMod11 === 0) {
      return '0';
    } else if (sumMod11 === 1) {
      return '-';
    } else {
      return (11 - sumMod11) + '';
    }
  }

  function checkInput () {
    var organizationNumber = textField.value.toString().replace(/\D/g, '')
    if (organizationNumber.length > 8) {
      messageField.textContent = isValidOrganizationNumber(organizationNumber) ? 'Organisasjonsnummeret er gyldig' : 'Du har tastet et ugyldig organisasjonsnummer. Vennligst prøv igjen'
    } else {
      messageField.textContent = ''
    }
    button.disabled = isValidOrganizationNumber(organizationNumber) ? false : true
  }

  textField.addEventListener('input', checkInput)

  checkInput()
}

function ready (fn) {
  if (document.readyState != 'loading') {
    fn ()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)