let firstNumber = '';
let secondNumber = '';
let operator = null;

//obtaining HTML elements
let numberButtons = document.querySelectorAll('.number-button');
let operatorButtons = document.querySelectorAll('.operator-button');
let operateButton = document.querySelector('.operate-button');
let decimalButton = document.querySelector('.decimal-button');
let clearButton = document.querySelector('.clear-button');
let deleteButton = document.querySelector('.delete-button');

let previousOperationScreen = document.querySelector('.previous-operation-screen');
let currentOperationScreen = document.querySelector('.current-operation-screen');

//helper functions
function roundNumber(number) {
    return Math.round(number * 1000) / 1000;
}

//operation functions
function add(a, b) {
    return a + b;
}

function substract(a,b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate() {
    let a = Number(firstNumber);
    let b = Number(secondNumber);
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if(b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}

//evaluate function 
function evaluate() {
    if(operator === null) return;
    if(operator === '÷' && secondNumber === '0') {
        currentOperationScreen.textContent = `LEARN TO DO MATH! YOU CAN'T DIVIDE BY 0.`
    }
    previousOperationScreen.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    firstNumber = operate().toString();
    currentOperationScreen.textContent = firstNumber;

}

//backspace function 
function backspace() {
    if(currentOperationScreen.textContent === '0') {
        return
    }
    currentOperationScreen.textContent.slice(0, -1);
    if(secondNumber !== '') {
        secondNumber = currentOperationScreen.textContent;
    }
    else if(operator !== null) {
        operator = null;
    }
    else {
        firstNumber = currentOperationScreen.textContent;
    }
    if(currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
}

//event listeners
operateButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', backspace);
