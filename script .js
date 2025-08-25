let first = second = operator = null;
const equation = document.querySelector("#equation");
let waitingForOperand = false, justCalculated = false, isDecimal = false;
const numArray = Array.from(document.querySelectorAll(".number"));
const equal = document.querySelector("#equal");
const decimal = document.querySelector('#decimal');

decimal.addEventListener("click", addDecimal);
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
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        return "ERROR"; 
    } else {
        return a / b;
    }
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
        default:
            return b;
    }
}
function formatResult(result) {
    if (result === 'ERROR') { 
        return result;
    }
    const rounded = result.toFixed(6);

    return parseFloat(rounded.toString()).toString();
}

function addDecimal() {
    if (isDecimal) {
        return;
    }
    if (equation.textContent === 'ERROR') { 
        return;
    }
    if (justCalculated) {
        equation.textContent = '0.';
        justCalculated = false;
        waitingForOperand = false;
        resetDecimalState(); 
        isDecimal = true; 
        changeDecimalColor();
        return;
    }
    if (waitingForOperand) {
        equation.textContent = '0.';
        waitingForOperand = false;
        resetDecimalState(); 
        isDecimal = true; 
        changeDecimalColor();
    } else {
        if (equation.textContent.indexOf('.') === -1) {
            equation.textContent += '.';
            isDecimal = true; 
            changeDecimalColor();
        }
    }
}

function changeDecimalColor() {
    decimal.style.backgroundColor = "rgba(9, 62, 62, 1)";
}

function resetDecimalState() {
    isDecimal = false;
    decimal.style.backgroundColor = "rgb(36, 62, 62)";
}

function addNumberToDisplay(event) {
    let digit = event.target.textContent;

    if (justCalculated) {
        equation.textContent = digit;
        justCalculated = false;
        waitingForOperand = false;
        resetDecimalState(); 
        return;
    }

    if (waitingForOperand) {
        equation.textContent = digit;
        waitingForOperand = false;
        resetDecimalState(); 
    } else {
        if (equation.textContent === '0') {
            equation.textContent = digit;
        } else {
            equation.textContent += digit;
        }
    }
}

function setOperator(event) {
    const nextOperator = event.target.textContent;
    const inputValue = parseFloat(equation.textContent);

    if (equation.textContent === 'ERROR') {
        return;
    }

    if (first === null) {
        first = inputValue;
    } else if (operator && !waitingForOperand) {
        second = inputValue;
        const result = operate(operator, first, second);

        if (result === 'ERROR') { 
            equation.textContent = 'ERROR';
            first = second = operator = null;
            waitingForOperand = false;
            resetDecimalState(); 
            return;
        }

        equation.textContent = formatResult(result);
        first = result;
    }

    waitingForOperand = true;
    operator = nextOperator;
    justCalculated = false;
}

function calculate() {
    const inputValue = parseFloat(equation.textContent);

    if (equation.textContent === "ERROR" || first === null || operator === null || waitingForOperand) {
        return;
    }

    second = inputValue;
    const result = operate(operator, first, second);

    if (result === 'ERROR') {
        equation.textContent = 'ERROR';
        resetDecimalState(); 
    } else {
        equation.textContent = formatResult(result);
        first = result;
    }
    
    second = operator = null;
    waitingForOperand = false;
    justCalculated = true;
}

function clearDisplay() {
    equation.textContent = '0';
    first = second = operator = null;
    waitingForOperand = justCalculated = false;
    resetDecimalState();
}