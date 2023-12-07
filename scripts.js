const ERROR_MESSAGE = `You can't divide by zero. Learn Math.`;

let firstNumber = '';
let secondNumber = '';
let operator = null;
let resetScreen = false;
let evaluateLast = false;

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

function toggleOperators(toDisable) {
    decimalButton.disabled = toDisable;
    operatorButtons.forEach(operatorButton => operatorButton.disabled = toDisable);
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
            return add(a, b).toString();
        case '-':
            return substract(a, b).toString();
        case 'x':
            return multiply(a, b).toString();
        case '÷':
            if(b == 0) return null;
            else return divide(a, b).toString();
        default:
            return null;
    }
}

//evaluate function 
function evaluate() {
    if(operator != null) {
        if(currentOperationScreen.textContent == ERROR_MESSAGE){
            clear()
        }
        else if(operator == '÷' && currentOperationScreen.textContent == '0') {
            currentOperationScreen.textContent = ERROR_MESSAGE;
            previousOperationScreen.textContent = '';
            resetScreen = true;
            toggleOperators(true);
        }
        else {
            if(evaluateLast) {
                firstNumber = currentOperationScreen.textContent;
            }
            else {
                secondNumber = currentOperationScreen.textContent;
                evaluateLast = true;
            }
            previousOperationScreen.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
            currentOperationScreen.textContent = operate();
        }
    }
}

//backspace function 
function backspace() {
    if(currentOperationScreen.textContent != '0') {
        if(currentOperationScreen.textContent == ERROR_MESSAGE) {
            clear();
        }
        else {
            currentOperationScreen.textContent = currentOperationScreen.textContent.slice(0, -1);
            if(currentOperationScreen.textContent == '') {
                currentOperationScreen.textContent = '0';
            }
        }
    }
}   

//clear function
function clear() {
    toggleOperators(false);
    firstNumber = '';
    secondNumber = '';
    operator = null;
    currentOperationScreen.textContent = '0';
    previousOperationScreen.textContent = '';
}

//click number function
function addNumber(number) {
    if(currentOperationScreen.textContent == ERROR_MESSAGE) {
        clear();
    }
    if(currentOperationScreen.textContent == '0' || resetScreen) {
        currentOperationScreen.textContent = '';
        resetScreen = false;
    }
    if(currentOperationScreen.textContent.length < 16){
        currentOperationScreen.append(number);
    }
}

//set operator function
function setOperator(operatorToSet) {
    if(operator != null && !resetScreen && !evaluateLast) evaluate();
    operator = operatorToSet;
    firstNumber = currentOperationScreen.textContent;
    previousOperationScreen.textContent = `${firstNumber} ${operator}`;
    resetScreen = true;
    evaluateLast = false;
}

//decimal function
function addDecimal() {
    if (!currentOperationScreen.textContent.includes('.')) {
        return currentOperationScreen.textContent += '.';
    }
}

//keyboard support
window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) addNumber(e.key);
    if (e.key == '.') addDecimal();
    if (e.key == '=' || e.key == 'Enter') evaluate();
    if (e.key == 'Backspace') backspace();
    if (e.key == 'Escape') clear();
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        setOperator(convertOperator(e.key));
    }
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator == '/') return '÷';
    if (keyboardOperator == '*') return '×';
    if (keyboardOperator == '-') return '−';
    if (keyboardOperator == '+') return '+';
}

//event listeners
operateButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', backspace);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', addDecimal);

numberButtons.forEach(numberButton => numberButton.addEventListener('click', () => {
    addNumber(numberButton.textContent);
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
    setOperator(operatorButton.textContent);
}))