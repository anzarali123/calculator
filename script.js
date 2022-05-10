const numbers = document.querySelectorAll("[data-num]");
const backspace = document.querySelector("[data-backspace]");
const clear = document.querySelector("[data-all-clear]");
const currentOperand = document.querySelector(".screen h2");
const previousOperand = document.querySelector(".screen h3");
const equals = document.querySelector("[data-equals]");
const operators = document.querySelectorAll("[data-operator]");

let operation = null;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    let number = e.target.textContent;
    if (number === "." && currentOperand.textContent === "") {
      number = "0.";
    }
    appendNumber(number);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (
      currentOperand.textContent != "" &&
      previousOperand.textContent === ""
    ) {
      const element = e.target;
      const total = currentOperand.textContent;
      updateDisplay(element, total);
    }
    if (
      currentOperand.textContent != "" &&
      previousOperand.textContent != "" &&
      operation != null
    ) {
      const total = compute();
      const element = e.target;
      updateDisplay(element, total);
    }
  });
});

clear.addEventListener("click", (e) => {
  operation = null;
  currentOperand.textContent = "";
  previousOperand.textContent = "";
});

backspace.addEventListener("click", (e) => {
  if (currentOperand.textContent != "") {
    currentOperand.textContent = `${currentOperand.textContent.slice(0, -1)}`;
  }
});

equals.addEventListener("click", (e) => {
  if (
    currentOperand.textContent != "" &&
    previousOperand.textContent != "" &&
    operation != null
  ) {
    const total = compute();
    currentOperand.textContent = `${total}`;
    previousOperand.textContent = "";
    operation = null;
  }
});

function appendNumber(number) {
  if (number === "." && currentOperand.textContent.includes(number)) return;
  currentOperand.textContent += number;
}

function compute() {
  const num1 = Number(previousOperand.textContent);
  const num2 = Number(currentOperand.textContent);
  let total;
  switch (operation) {
    case "+":
      total = num1 + num2;
      break;
    case "-":
      total = num1 - num2;
      break;
    case "*":
      total = num1 * num2;
      break;
    case "/":
      total = num1 / num2;
      break;
    default:
      return;
  }
  return total;
}

function updateDisplay(element, total) {
  operation = element.id;
  currentOperand.textContent = "";
  previousOperand.innerHTML = `${total} <i class= "fa-solid fa-${element.classList[1]}"></i>`;
  currentOperand.textContent = "";
}
