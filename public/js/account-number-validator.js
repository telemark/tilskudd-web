'use strict'

function init () {
  var textField = document.getElementById('kontonummer')
  var messageField = document.getElementById('kontonummerValid')
  var button = document.getElementById('nextButton')

  function isValidAccountNumber (accountnumber) {
    var controlDigitIndex = accountnumber.length - 1;

    if (accountnumber.length !== 11) {
      return false
    } else {
      return accountnumber.substr(controlDigitIndex) === generateControlDigit(accountnumber.substr(0, controlDigitIndex));
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
    var accountNumber = textField.value.toString().replace(/\D/g, '')
    if (accountNumber.length > 10) {
      messageField.textContent = isValidAccountNumber(accountNumber) ? 'Kontonummeret er gyldig' : 'Du har tastet et ugyldig kontonummer. Vennligst prøv igjen'
    } else {
      messageField.textContent = ''
    }
    button.disabled = isValidAccountNumber(accountNumber) ? false : true
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