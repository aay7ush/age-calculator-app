const inputs = document.querySelectorAll('input')
const form = document.querySelector('form')

const inputDay = document.getElementById('input-day')
const inputMonth = document.getElementById('input-month')
const inputYear = document.getElementById('input-year')

const yearsEl = document.getElementById('years')
const monthsEl = document.getElementById('months')
const daysEl = document.getElementById('days')

inputDay.addEventListener('input', limitInputField)
inputMonth.addEventListener('input', limitInputField)
inputYear.addEventListener('input', () => {
  if (inputYear.value > 4) {
    inputYear.value = inputYear.value.slice(0, 4)
  }
})

let birthday = {}

inputDay.addEventListener('input', () => {
  if (inputDay.value < 0 || inputDay.value > 31) {
    showErrorMessage(inputDay, 'Must be a valid day')
  } else {
    removeErrorMessage(inputDay)
  }
})

inputMonth.addEventListener('input', () => {
  if (inputMonth.value < 0 || inputMonth.value > 12) {
    showErrorMessage(inputMonth, 'Must be a valid month')
  } else {
    removeErrorMessage(inputMonth)
  }
})

inputYear.addEventListener('input', () => {
  if (inputYear.value > new Date().getFullYear()) {
    showErrorMessage(inputYear, 'Must be in the past')
  } else {
    removeErrorMessage(inputYear)
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  birthday.day = +inputDay.value
  birthday.month = +inputMonth.value
  birthday.year = +inputYear.value

  console.log(birthday)

  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, 'This field is required')
    } else {
      removeErrorMessage(input)
    }
  })

  if (inputDay.value && inputMonth.value && inputYear.value) {
    console.log(isDateValid(birthday.day, birthday.month, birthday.year))
    if (isDateValid(birthday.day, birthday.month, birthday.year)) {
      let [years, months, days] = calculateAge(
        birthday.day,
        birthday.month,
        birthday.year
      )
      renderAge(years, months, days)
      inputsReset()
    } else {
      if (birthday.year > new Date().getFullYear()) {
        showErrorMessage(inputDay, 'Must be a valid date')
        showErrorMessage(inputMonth, '')
        showErrorMessage(inputYear, 'Must be in the past')
      } else {
        showErrorMessage(inputDay, 'Must be a valid date')
        showErrorMessage(inputMonth, '')
        showErrorMessage(inputYear, '')
      }
    }
  }
})

function showErrorMessage(input, message) {
  input.classList.replace('border-clr-light-grey', 'border-clr-light-red')
  input.parentElement.classList.add('text-clr-light-red')
  input.nextElementSibling.textContent = message
  input.nextElementSibling.classList.remove('hidden')
}

function removeErrorMessage(input) {
  input.parentElement.classList.remove('text-clr-light-red')
  input.classList.replace('border-clr-light-red', 'border-clr-light-grey')
  input.nextElementSibling.classList.add('hidden')
}

function limitInputField(event) {
  if (event.target.value > 2) {
    event.target.value = event.target.value.slice(0, 2)
  }
}

function renderAge(years, months, days) {
  yearsEl.textContent = years
  monthsEl.textContent = months
  daysEl.textContent = days
}

function isDateValid(dd, mm, yyyy) {
  const date = new Date(yyyy, mm - 1, dd)

  if (yyyy > new Date().getFullYear()) {
    return false
  }

  return (
    date.getFullYear() === yyyy &&
    date.getMonth() === mm - 1 &&
    date.getDate() === dd
  )
}

function inputsReset() {
  inputDay.value = ''
  inputMonth.value = ''
  inputYear.value = ''
}

function calculateAge(dd, mm, yyyy) {
  const today = new Date()

  let years = today.getFullYear() - yyyy
  let months = today.getMonth() - (mm - 1)
  let days = today.getDate() - dd

  if (months < 0 || (months === 0 && days < 0)) {
    years--
    months += 12
  }

  if (days < 0) {
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    )
    days += daysInPreviousMonth.getDate()
    months--
  }
  return [years, months, days]
}
