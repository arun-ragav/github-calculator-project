/* ============================= */
/* VARIABLES */
/* ============================= */

let currentNumber = "";

let previousNumber = "";

let operator = null;

let shouldResetDisplay = false;

let memory = 0;


/* ============================= */
/* ELEMENTS */
/* ============================= */

const display =
    document.getElementById("display");

const expression =
    document.getElementById("expression");

const historyList =
    document.getElementById("history-list");


/* ============================= */
/* UPDATE DISPLAY */
/* ============================= */

function updateDisplay() {

    display.innerText =
        currentNumber || "0";

}


/* ============================= */
/* ADD NUMBER */
/* ============================= */

function appendNumber(number) {

    if (
        currentNumber === "0" ||
        shouldResetDisplay
    ) {

        currentNumber = "";

        shouldResetDisplay = false;
    }


    currentNumber += number;

    updateDisplay();

}


/* ============================= */
/* DECIMAL */
/* ============================= */

function appendDecimal() {

    if (shouldResetDisplay) {

        currentNumber = "";

        shouldResetDisplay = false;
    }


    if (!currentNumber.includes(".")) {

        currentNumber =
            currentNumber === ""
                ? "0."
                : currentNumber + ".";
    }


    updateDisplay();

}


/* ============================= */
/* CONSTANTS */
/* ============================= */

function appendConstant(type) {

    if (shouldResetDisplay) {

        currentNumber = "";

        shouldResetDisplay = false;
    }


    let value;


    if (type === "pi") {

        value = Math.PI;

    } else {

        value = Math.E;

    }


    currentNumber =
        roundResult(value).toString();


    updateDisplay();

}


/* ============================= */
/* INSERT TEXT */
/* ============================= */

function insertText(text) {

    if (shouldResetDisplay) {

        currentNumber = "";

        shouldResetDisplay = false;
    }


    currentNumber += text;

    updateDisplay();

}


/* ============================= */
/* BASIC OPERATOR */
/* ============================= */

function chooseOperator(selectedOperator) {

    if (currentNumber === "") {

        return;
    }


    if (previousNumber !== "") {

        calculate();

    }


    operator =
        selectedOperator;

    previousNumber =
        currentNumber;

    shouldResetDisplay = true;


    expression.innerText =
        `${previousNumber} ${getSymbol(operator)}`;

}


/* ============================= */
/* POWER */
/* ============================= */

function choosePower() {

    chooseOperator("^");

}


/* ============================= */
/* CALCULATE */
/* ============================= */

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {

        return;
    }


    const previous =
        parseFloat(previousNumber);

    const current =
        parseFloat(currentNumber);


    let result;


    switch (operator) {

        case "+":

            result =
                previous + current;

            break;


        case "-":

            result =
                previous - current;

            break;


        case "*":

            result =
                previous * current;

            break;


        case "/":

            if (current === 0) {

                showError(
                    "Cannot divide by 0"
                );

                return;
            }


            result =
                previous / current;

            break;


        case "^":

            result =
                Math.pow(
                    previous,
                    current
                );

            break;


        default:

            return;

    }


    result =
        roundResult(result);


    const calculation =
        `${previous} ${getSymbol(operator)} ${current} = ${result}`;


    addHistory(calculation);


    expression.innerText =
        `${previous} ${getSymbol(operator)} ${current} =`;


    currentNumber =
        result.toString();


    previousNumber = "";

    operator = null;

    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* SCIENTIFIC FUNCTIONS */
/* ============================= */

function calculateFunction(type) {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    let result;


    switch (type) {

        case "sin":

            result =
                Math.sin(
                    degreesToRadians(number)
                );

            break;


        case "cos":

            result =
                Math.cos(
                    degreesToRadians(number)
                );

            break;


        case "tan":

            result =
                Math.tan(
                    degreesToRadians(number)
                );

            break;


        case "log":

            if (number <= 0) {

                showError(
                    "Invalid log"
                );

                return;
            }


            result =
                Math.log10(number);

            break;


        case "ln":

            if (number <= 0) {

                showError(
                    "Invalid ln"
                );

                return;
            }


            result =
                Math.log(number);

            break;


        default:

            return;

    }


    result =
        roundResult(result);


    addHistory(
        `${type}(${number}) = ${result}`
    );


    expression.innerText =
        `${type}(${number}) =`;


    currentNumber =
        result.toString();


    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* DEGREES TO RADIANS */
/* ============================= */

function degreesToRadians(degrees) {

    return degrees *
        (Math.PI / 180);

}


/* ============================= */
/* SQUARE */
/* ============================= */

function squareNumber() {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    const result =
        roundResult(
            number * number
        );


    addHistory(
        `${number}² = ${result}`
    );


    expression.innerText =
        `${number}² =`;


    currentNumber =
        result.toString();


    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* SQUARE ROOT */
/* ============================= */

function squareRoot() {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    if (number < 0) {

        showError(
            "Invalid number"
        );

        return;
    }


    const result =
        roundResult(
            Math.sqrt(number)
        );


    addHistory(
        `√${number} = ${result}`
    );


    expression.innerText =
        `√${number} =`;


    currentNumber =
        result.toString();


    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* FACTORIAL */
/* ============================= */

function factorial() {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    if (
        number < 0 ||
        !Number.isInteger(number)
    ) {

        showError(
            "Factorial needs a positive integer"
        );

        return;
    }


    if (number > 170) {

        showError(
            "Number too large"
        );

        return;
    }


    let result = 1;


    for (
        let i = 2;
        i <= number;
        i++
    ) {

        result *= i;

    }


    addHistory(
        `${number}! = ${result}`
    );


    expression.innerText =
        `${number}! =`;


    currentNumber =
        result.toString();


    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* RECIPROCAL */
/* ============================= */

function reciprocal() {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    if (number === 0) {

        showError(
            "Cannot divide by 0"
        );

        return;
    }


    const result =
        roundResult(
            1 / number
        );


    addHistory(
        `1/${number} = ${result}`
    );


    expression.innerText =
        `1/${number} =`;


    currentNumber =
        result.toString();


    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* PERCENTAGE */
/* ============================= */

function percentage() {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    const result =
        roundResult(
            number / 100
        );


    addHistory(
        `${number}% = ${result}`
    );


    expression.innerText =
        `${number}% =`;


    currentNumber =
        result.toString();


    shouldResetDisplay = true;


    updateDisplay();

}


/* ============================= */
/* PLUS / MINUS */
/* ============================= */

function toggleSign() {

    if (currentNumber === "") {

        return;
    }


    const number =
        parseFloat(currentNumber);


    currentNumber =
        (-number).toString();


    updateDisplay();

}


/* ============================= */
/* DELETE */
/* ============================= */

function deleteNumber() {

    if (shouldResetDisplay) {

        return;
    }


    currentNumber =
        currentNumber.slice(0, -1);


    if (currentNumber === "") {

        currentNumber = "0";
    }


    updateDisplay();

}


/* ============================= */
/* ALL CLEAR */
/* ============================= */

function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    shouldResetDisplay = false;

    expression.innerText = "";

    updateDisplay();

}


/* ============================= */
/* MEMORY CLEAR */
/* ============================= */

function memoryClear() {

    memory = 0;

}


/* ============================= */
/* MEMORY RECALL */
/* ============================= */

function memoryRecall() {

    currentNumber =
        memory.toString();

    shouldResetDisplay = false;

    updateDisplay();

}


/* ============================= */
/* MEMORY ADD */
/* ============================= */

function memoryAdd() {

    if (currentNumber === "") {

        return;
    }


    memory +=
        parseFloat(currentNumber);

}


/* ============================= */
/* MEMORY SUBTRACT */
/* ============================= */

function memorySubtract() {

    if (currentNumber === "") {

        return;
    }


    memory -=
        parseFloat(currentNumber);

}


/* ============================= */
/* COPY RESULT */
/* ============================= */

function copyResult() {

    const result =
        display.innerText;


    if (
        result === "0" ||
        result === ""
    ) {

        return;
    }


    navigator.clipboard
        .writeText(result)
        .then(() => {

            alert(
                "Result copied!"
            );

        })
        .catch(() => {

            alert(
                "Unable to copy result"
            );

        });

}


/* ============================= */
/* ADD HISTORY */
/* ============================= */

function addHistory(calculation) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calculatorHistory"
            )
        ) || [];


    history.unshift(calculation);


    if (history.length > 30) {

        history.pop();

    }


    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );


    showHistory();

}


/* ============================= */
/* SHOW HISTORY */
/* ============================= */

function showHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calculatorHistory"
            )
        ) || [];


    historyList.innerHTML = "";


    history.forEach(item => {

        const li =
            document.createElement("li");


        li.textContent =
            item;


        historyList.appendChild(li);

    });

}


/* ============================= */
/* CLEAR HISTORY */
/* ============================= */

function clearHistory() {

    localStorage.removeItem(
        "calculatorHistory"
    );


    showHistory();

}


/* ============================= */
/* ERROR */
/* ============================= */

function showError(message) {

    display.innerText =
        message;


    currentNumber = "";

    previousNumber = "";

    operator = null;

    shouldResetDisplay = true;

}


/* ============================= */
/* ROUND RESULT */
/* ============================= */

function roundResult(number) {

    return Math.round(
        (number + Number.EPSILON) *
        100000000
    ) / 100000000;

}


/* ============================= */
/* OPERATOR SYMBOLS */
/* ============================= */

function getSymbol(operator) {

    switch (operator) {

        case "+":

            return "+";


        case "-":

            return "−";


        case "*":

            return "×";


        case "/":

            return "÷";


        case "^":

            return "^";


        default:

            return "";

    }

}


/* ============================= */
/* THEME */
/* ============================= */

function toggleTheme() {

    document.body.classList.toggle(
        "light"
    );


    const theme =
        document.body.classList.contains(
            "light"
        )
            ? "light"
            : "dark";


    localStorage.setItem(
        "calculatorTheme",
        theme
    );

}


/* ============================= */
/* LOAD THEME */
/* ============================= */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "calculatorTheme"
        );


    if (theme === "light") {

        document.body.classList.add(
            "light"
        );

    }

}


/* ============================= */
/* KEYBOARD SUPPORT */
/* ============================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        /* NUMBERS */

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

        }


        /* DECIMAL */

        else if (key === ".") {

            appendDecimal();

        }


        /* OPERATORS */

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

        }


        /* ENTER */

        else if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

        }


        /* BACKSPACE */

        else if (
            key === "Backspace"
        ) {

            deleteNumber();

        }


        /* ESCAPE */

        else if (
            key === "Escape"
        ) {

            clearCalculator();

        }


        /* PERCENTAGE */

        else if (
            key === "%"
        ) {

            percentage();

        }


        /* ROOT */

        else if (
            key.toLowerCase() === "r"
        ) {

            squareRoot();

        }


        /* SQUARE */

        else if (
            key.toLowerCase() === "s"
        ) {

            squareNumber();

        }

    }
);


/* ============================= */
/* START CALCULATOR */
/* ============================= */

loadTheme();

showHistory();

updateDisplay();