import { Modal } from './modal.js'
import { AlertError } from './alert-error.js'
import { calculateIMC, notANumber } from './utils.js'

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

inputWeight.oninput = () => {
  AlertError.close()
}
inputHeight.oninput = () => {
  AlertError.close()
}

form.onsubmit = event => {
  event.preventDefault()
  const weight = inputWeight.value
  const height = inputHeight.value

  const weightOrHeightIsNotANumber = notANumber(height) || notANumber(weight)
  if (weightOrHeightIsNotANumber) {
    AlertError.open()
    return
  }
  AlertError.close()
  const result = calculateIMC(weight, height)
  displayResultMessage(result)
}

function displayResultMessage(result) {
  const conditionIMC =
    result < 18.5
      ? 'Abaixo do peso'
      : result >= 18.5 && result < 25
      ? 'Peso saudável'
      : result >= 25 && result < 30
      ? 'Sobrepeso'
      : result > 30 && result < 40
      ? 'Obeso'
      : 'Obeso mórbido'

  const message = `Seu IMC é de ${result}\n\nClassificação:\n${conditionIMC}`

  Modal.message.innerText = message
  Modal.open()
}
