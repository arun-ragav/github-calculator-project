let currentNumber = "";
let previousNumber = "";

let operator = null;

let shouldResetDisplay = false;


// Get elements

const display =
    document.getElementById("display");

const history =
    document.getElementById("history");


// Add number

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


// Add decimal

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


// Choose operator

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

}


// Calculate

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

                display.innerText =
                    "Cannot divide by 0";

                currentNumber = "";

                previousNumber = "";

                operator = null;

                return;

            }

            result =
                previous / current;

            break;

    }


    history.innerText =
        `${previous} ${getOperatorSymbol(operator)} ${current} =`;


    currentNumber =
        roundResult(result).toString();

    previousNumber = "";

    operator = null;

    shouldResetDisplay = true;


    updateDisplay();

}


// Percentage

function percentage() {

    if (currentNumber === "") {
        return;
    }


    currentNumber =
        (parseFloat(currentNumber) / 100).toString();


    updateDisplay();

}


// Delete

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


// Clear

function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    shouldResetDisplay = false;

    history.innerText = "";

    updateDisplay();

}


// Update display

function updateDisplay() {

    display.innerText =
        currentNumber || "0";

}


// Operator symbols

function getOperatorSymbol(operator) {

    switch (operator) {

        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";

    }

}


// Round long decimal results

function roundResult(number) {

    return Math.round(
        (number + Number.EPSILON) * 100000000
    ) / 100000000;

}


// Theme

function toggleTheme() {

    document.body.classList.toggle("light");

}


// Keyboard support

document.addEventListener(
    "keydown",
    function (event) {

        const key = event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

        }


        // Decimal

        if (key === ".") {

            appendDecimal();

        }


        // Operators

        if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

        }


        // Enter

        if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        // Backspace

        if (key === "Backspace") {

            deleteNumber();

        }


        // Escape

        if (key === "Escape") {

            clearCalculator();

        }


        // Percentage

        if (key === "%") {

            percentage();

        }

    }
);


// Start display

updateDisplay();