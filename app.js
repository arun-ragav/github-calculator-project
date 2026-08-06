let currentNumber = "";
let previousNumber = "";

let operator = null;

let shouldResetDisplay = false;


// Elements

const display =
    document.getElementById("display");

const expression =
    document.getElementById("expression");

const historyList =
    document.getElementById("history-list");


// -------------------------
// Numbers
// -------------------------

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


// -------------------------
// Decimal
// -------------------------

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


// -------------------------
// Operators
// -------------------------

function chooseOperator(selectedOperator) {

    if (currentNumber === "") {
        return;
    }


    if (previousNumber !== "") {

        calculate();

    }


    operator = selectedOperator;

    previousNumber = currentNumber;

    shouldResetDisplay = true;


    expression.innerText =
        `${previousNumber} ${getSymbol(operator)}`;

}


// -------------------------
// Power
// -------------------------

function choosePower() {

    chooseOperator("^");

}


// -------------------------
// Calculate
// -------------------------

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


// -------------------------
// Square
// -------------------------

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


// -------------------------
// Square Root
// -------------------------

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


// -------------------------
// Reciprocal
// -------------------------

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
        roundResult(1 / number);


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


// -------------------------
// Percentage
// -------------------------

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


// -------------------------
// Plus / Minus
// -------------------------

function toggleSign() {

    if (currentNumber === "") {
        return;
    }


    if (currentNumber === "0") {
        return;
    }


    if (currentNumber.startsWith("-")) {

        currentNumber =
            currentNumber.substring(1);

    } else {

        currentNumber =
            "-" + currentNumber;

    }


    updateDisplay();

}


// -------------------------
// Delete
// -------------------------

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


// -------------------------
// Clear
// -------------------------

function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    shouldResetDisplay = false;

    expression.innerText = "";

    updateDisplay();

}


// -------------------------
// Display
// -------------------------

function updateDisplay() {

    display.innerText =
        currentNumber || "0";

}


// -------------------------
// Symbols
// -------------------------

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


// -------------------------
// Round
// -------------------------

function roundResult(number) {

    return Math.round(
        (number + Number.EPSILON) *
        100000000
    ) / 100000000;

}


// -------------------------
// Error
// -------------------------

function showError(message) {

    display.innerText = message;

    currentNumber = "";

    previousNumber = "";

    operator = null;

    shouldResetDisplay = true;

}


// -------------------------
// History
// -------------------------

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


// -------------------------
// Show History
// -------------------------

function showHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "calculatorHistory"
            )
        ) || [];


    historyList.innerHTML = "";


    history.forEach(
        function(item) {

            const li =
                document.createElement("li");

            li.textContent = item;

            historyList.appendChild(li);

        }
    );

}


// -------------------------
// Clear History
// -------------------------

function clearHistory() {

    localStorage.removeItem(
        "calculatorHistory"
    );


    showHistory();

}


// -------------------------
// Copy Result
// -------------------------

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
        .then(
            function() {

                alert(
                    "Result copied!"
                );

            }
        )
        .catch(
            function() {

                alert(
                    "Unable to copy result"
                );

            }
        );

}


// -------------------------
// Theme
// -------------------------

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


// -------------------------
// Load Theme
// -------------------------

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


// -------------------------
// Keyboard
// -------------------------

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

        }


        // Decimal

        else if (key === ".") {

            appendDecimal();

        }


        // Operators

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

        }


        // Enter

        else if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

        }


        // Backspace

        else if (
            key === "Backspace"
        ) {

            deleteNumber();

        }


        // Escape

        else if (
            key === "Escape"
        ) {

            clearCalculator();

        }


        // Percentage

        else if (
            key === "%"
        ) {

            percentage();

        }


        // Square root

        else if (
            key.toLowerCase() === "r"
        ) {

            squareRoot();

        }


        // Square

        else if (
            key.toLowerCase() === "s"
        ) {

            squareNumber();

        }

    }
);


// Start

loadTheme();

showHistory();

updateDisplay();