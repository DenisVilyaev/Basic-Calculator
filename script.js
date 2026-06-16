console.log("Hello world!");
const history = document.querySelector(".expression__history");
const display = document.querySelector(".expression__result");
const buttons = document.querySelectorAll(".btn");
const themeBtn = document.querySelector(".btn--theme")


themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark")

  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.removeItem('theme')
  }
})


let firstNumb = null;
let operator = null;
let secondNumb = null;
let resetDisplay = false

buttons.forEach((button) => {
  button.addEventListener("click", () => {


    if (button.classList.contains("btn--func")) {
      if (button.textContent === "CE") {
        if (operator === null) {
          display.textContent = ""
          history.textContent = ""
        } else {
          display.textContent = ""
        }
      } else if (button.textContent === "C") {
        display.textContent = ""
        history.textContent = ""
        firstNumb = null;
        operator = null;
        secondNumb = null;
      } else {
        display.textContent = display.textContent.slice(0, -1)
      }
      if (display.textContent === "") {
        display.textContent = "0"
      }
    }


    else if (button.dataset.action) {
      if (button.dataset.action === 'fraction') {
        if (display.textContent === '0') {
          display.textContent = 'на ноль не делят, додик сука'
        } else {
          display.textContent = Number((1 / Number(display.textContent)).toFixed(10))
        }
      } else if (button.dataset.action === 'square') {
        display.textContent = Number(Math.pow(display.textContent, 2).toFixed(10))
      } else if (button.dataset.action === 'sqrt') {
        if (Number(display.textContent) < 0) {
          display.textContent = 'ты долбаеб?'
        } else {
          display.textContent = Number(Math.sqrt(display.textContent).toFixed(10))
        }
      } else if (button.dataset.action === 'percent') {
        if (firstNumb !== null) {
          display.textContent = Number(display.textContent) / 100 * firstNumb
        } else {
          display.textContent = display.textContent / 100
        }
      } else if (button.dataset.action === 'toggle-sign') {
        display.textContent = display.textContent * -1
      }
    }


    else if (button.classList.contains("btn--op")) {
      if (resetDisplay) {
        firstNumb = Number(display.textContent)
        operator = button.textContent
        history.textContent = firstNumb + " " + operator
        return
      }
      if (firstNumb !== null && operator !== null) {
        secondNumb = Number(display.textContent)
        display.textContent = calculate(firstNumb, operator, secondNumb)
        firstNumb = Number(display.textContent)
        operator = button.textContent
        history.textContent = firstNumb + " " + operator
        secondNumb = null
      } else {
        operator = button.textContent
        firstNumb = Number(display.textContent)
        history.textContent = display.textContent + " " + button.textContent
      }
      resetDisplay = true
    }


    else if (button.classList.contains("btn--equals")) {
      if (operator === null) return
      secondNumb = Number(display.textContent)
      display.textContent = calculate(firstNumb, operator, secondNumb)
      history.textContent = history.textContent + " " + secondNumb + " ="
      operator = null
      secondNumb = null
      firstNumb = Number(display.textContent)
    }


    else {
      if (resetDisplay) {
        display.textContent = ""
        resetDisplay = false
      }

      if (button.textContent === ".") {
        if (display.textContent.includes('.')) return
        display.textContent = display.textContent + button.textContent
      }
      else if (display.textContent === "0") {
        display.textContent = button.textContent
      }
      else {
        display.textContent = display.textContent + button.textContent
      }
    }
  });
});

function calculate(a, operator, b) {
  let result

  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "×") result = a * b;
  if (operator === "÷") result = a / b;

  return Number(result.toFixed(10))
}