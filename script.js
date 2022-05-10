const nums = document.querySelectorAll("[data-nums]");
const backspace = document.querySelector("[data-backspace]");
const clear = document.querySelector("[data-all-clear]");
const displayCurrentNum = document.querySelector(".screen h2");
const displayPrevNumAndOperator = document.querySelector(".screen h3");
const equals = document.querySelector("[data-equals]");
const operators = document.querySelectorAll("[data-operator]");

let currentNum = "";
let previousNum = "";
let operation = null;
let total = "";

nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    const num = e.target.textContent;
    storeNum(num);
    updateUI();
  });
});

function storeNum(num) {
  if (num === "." && currentNum.includes(num)) return;
  if (!operation || previousNum) {
    currentNum += num;
  } else {
    previousNum = currentNum;
    currentNum = "";
  }
}

function updateUI() {
  displayCurrentNum.textContent = currentNum;
  displayPrevNumAndOperator.innerHTML = `${previousNum}<i class = "fa-solid fa-${operation}"></i>`;
}

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (currentNum != "" && previousNum != "" && operation != "") {
      calculate();
      previousNum = total;
      currentNum = "";
      operation = e.target.id;
      updateUI();
      return;
    }
    if (currentNum != "") {
      operation = e.target.id;
      storeNum();
      updateUI();
    }
  });
});

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  if (operation === "plus") total = previousNum + currentNum;
  if (operation === "minus") total = previousNum - currentNum;
  if (operation === "xmark") total = previousNum * currentNum;
  if (operation === "divide") total = previousNum / currentNum;
}

clear.addEventListener("click", (e) => {
  total = "";
  currentNum = "";
  previousNum = "";
  operation = null;
  displayPrevNumAndOperator.textContent = "";
  displayCurrentNum.textContent = 0;
});

equals.addEventListener("click", (e) => {
  if (currentNum == "" && previousNum == "") return;
  calculate();
  currentNum = "";
  previousNum = "";
  displayCurrentNum.textContent = total;
  total = "";
  operation = "";
  displayPrevNumAndOperator.textContent = "";
});

backspace.addEventListener("click", (e) => {
  if (currentNum == "") return;
  currentNum = `${currentNum.slice(0, -1)}`;
  updateUI();
});
