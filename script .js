let first = 0, second = 0, operator;
const equation = document.querySelector("#equation");
let firstEmpty = true, secondEmpty = true, doSecond = false;
const numArray = Array.from(document.querySelectorAll(".number"));
const equal = document.querySelector("#equal");
let complete = false;
//let decimal = false;
//const dot = document.querySelector("#decimal");

//dot.addEventListener("click", addDecimal);
equal.addEventListener("click", calculate);
for (const button of numArray) {
    button.addEventListener("click", (event) => addNumberToDisplay(event));
}
const opArray = Array.from(document.querySelectorAll(".operator"));
for (const button of opArray) {
    button.addEventListener("click", (event) => setOperator(event));
}
const clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);

function add(a, b) {
    return Number(a) + Number(b);
}
function subtract(a, b) {
    return Number(a) - Number(b);
}
function multiply(a, b) {
    return (Number(a) * Number(b)).toFixed(6);
}
function divide(a, b) {
    return (b == 0)
        ? 0
        : +(Number(a) / Number(b)).toFixed(6);
}
function operate(op, a, b) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function addNumberToDisplay(event) {
    if (complete) {
        clearDisplay();
    }
    let num = event.target.textContent;
    if (doSecond) {
        if (secondEmpty) {
            equation.textContent = String(num);
        } else {
            equation.textContent += String(num);
        }
        secondEmpty = false;
        return;
    }
    if (firstEmpty) {
        equation.textContent = String(num);
    } else {
        equation.textContent += String(num);
    }
    firstEmpty = false;
}

function setOperator(event) {
    if (firstEmpty) return;

    if (!firstEmpty && !secondEmpty) {
        calculate();
    }
    if (complete) {
        complete = false;
    }
    operator = event.target.textContent;
    first = Number(equation.textContent);
    doSecond = true;
}
// function addDecimal() {
//     // if (rewrite || decimal) return;
//     if(decimal) return;
//     if (firstEmpty) {
//         firstEmpty = false;
//     } else if (doSecond && secondEmpty) {
//         secondEmpty = false;
//     }
//     equation.textContent += ".";
//     decimal = true;
//     dot.style.backgroundColor = "rgb(3, 62, 62)";
// }

function calculate() {
    if (firstEmpty || secondEmpty) return;
    second = Number(equation.textContent);
    let res = operate(operator, first, second);
    equation.textContent = String(res);
    first = res;
    second = 0;
    doSecond = false;
    secondEmpty = true;
    firstEmpty = false;
    complete = true;
}

function clearDisplay() {
    firstEmpty = secondEmpty = true;
    equation.textContent = '0';
    first = second = 0;
    doSecond = false;
    operator = undefined;
    complete = false;
    operator = undefined;
    //decimal = false;
    // dot.style.backgroundColor = "rgb(36, 62, 62)";
}