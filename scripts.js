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

//keyboard support

window.addEventListener('keydown', handleKeyboardInput)

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
  }

//string management functions


//update functions
function updateScreen() {

}

//event handlers
function handleNumberClick(e) {
    let number =  e.target.textContent;
    if(firstNumber == '') {
        firstNumber = number;
    }
    else if(firstNumber != '' && operator == null) {
        firstNumber.concat(number);
    }
    else if(firstNumber == '0' && operator == null) {
        firstNumber = number
    }
    else if(firstNumber != '' && operator != null) {
        if(secondNumber == '' || secondNumber == '0') {
            secondNumber = number;
        }
        else {
            secondNumber.concat(number);
        }
    }
    updateScreen();
}

function handleOperatorClick(e) {
    if(secondNumber != '') {
        handleOperateClick();
    }
    if(firstNumber == '') {
        firstNumber = '0';
    }
    operator = e.target.textContent;
    updateScreen();

}

function handleOperateClick() {

}

function handleClearClick() {
    firstNumber = '';
    secondNumber = '';
    operator = null;
    updateScreen();
}

function handleDeleteClick() {

}

//event listeners
numberButtons.forEach(numberButton => numberButton.addEventListener(handleNumberClick));
operatorButtons.forEach(operatorNumber => operatorNumber.addEventListener(handleOperatorClick));
operateButton.addEventListener(handleOperateClick);
clearButton.addEventListener(handleClearClick);
deleteButton.addEventListener(handleDeleteClick);

