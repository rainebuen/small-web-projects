const display = document.getElementById('display');
let currentNum = '';
let lastInputWasOperator = false;


function appendToDisplay(value) {
    const isOperator = ['+', '-', '*', '/'].includes(value);
    const lastNumber = currentNum.split(/[\+\-\*\/]/).pop();

    if (currentNum === '' && (value === '+' || value === '*' || value === '/')) {
        return;
    }

    if (lastInputWasOperator && isOperator) {
        currentNum = currentNum.slice(0, -1) + value;
    } 
    else if (value === '.' && lastNumber.includes('.')) {
        return;
    }
    else {
        currentNum += value;
    }

    lastInputWasOperator = isOperator;
    display.value = currentNum;
}


function clearDisplay() {
    currentNum = '';
    display.value = '';
    lastInputWasOperator = false;;
}
function deleteKey() {
    currentNum = currentNum.slice(0, -1);
    display.value = currentNum;
    lastInputWasOperator = false;
}

function calculateResult() {
    try {
       const result = new Function('return ' + currentNum)();
        display.value = result;
        currentNum = String(result);
    } catch (error) {
        display.value = 'Error';
    }
}
