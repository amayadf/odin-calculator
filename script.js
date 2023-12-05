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

//string management functions
function deleteNumber(str) {
    str.toString().slice(0,-1);
}

//event handlers
function handleNumberClick(e) {
    let number =  e.target.textContent;
    if(firstNumber == '') {
        firstNumber = number;
        currentOperationScreen.textContent = firstNumber;
    }
    else if(firstNumber != '' && operator == null) {
        firstNumber = firstNumber.concat(number);
        currentOperationScreen.textContent = firstNumber;

    }
    else if(firstNumber == '0' && operator == null) {
        firstNumber = number
        currentOperationScreen.textContent = firstNumber;
    }
    else if(firstNumber != '' && operator != null) {
        if(secondNumber == '' || secondNumber == '0') {
            secondNumber = number;
            currentOperationScreen.textContent = secondNumber;
        }
        else {
            secondNumber.concat(number);
            currentOperationScreen.textContent = secondNumber;
        }
    }
}

function setOperator(e) {
    if(secondNumber != '') {
        handleOperateClick();
    }

}

function handleOperatorClick(e) {
    if(secondNumber != '') {
        handleOperateClick();
    }
    if(firstNumber == '') {
        firstNumber = '0';
    }
    operator = e.target.textContent;

}

function handleOperateClick() {
    
}

function handleClearClick() {

}

function handleDeleteClick() {

}

//event listeners
numberButtons.forEach(numberButton => numberButton.addEventListener('click', handleNumberClick));
operatorButtons.forEach(operatorNumber => operatorNumber.addEventListener('click', handleOperatorClick));
operateButton.addEventListener('click', handleOperateClick);
clearButton.addEventListener('click', handleClearClick);
deleteButton.addEventListener('click', handleDeleteClick);

//keyboard support

window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      operator = (convertOperator(e.key))
  }

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}

function evaluate() {
    if(operator == null) return
    if(operator == '÷' && secondNumber == '0') {
        currentOperationScreen.textContent = `LEARN TO DO MATH! YOU CAN'T DIVIDE BY ZERO...`;
        return;
    }
    previousOperationScreen.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    currentOperationScreen.textContent = roundResult(operate()).toString();
    firstNumber = currentOperationScreen.textContent;
}


//helper functions
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}