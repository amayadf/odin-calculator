let firstNumber = '';
let secondNumber = '';
let operator = null;

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
    let result;
    switch(operator){
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return substract(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '/':
            if(secondNumber === 0) return null;
            else return divide(firstNumber, secondNumber);
    }
}