let currentNumber = "";
let previousNumber = "";
let operator = null;

const display = document.getElementById("display");


// Number buttons
function appendNumber(number) {

    if (currentNumber === "0") {
        currentNumber = "";
    }

    currentNumber += number;

    display.innerText = currentNumber;
}


// Decimal button
function appendDecimal() {

    if (!currentNumber.includes(".")) {

        currentNumber =
            currentNumber === ""
                ? "0."
                : currentNumber + ".";

    }

    display.innerText = currentNumber;
}


// Select operator
function chooseOperator(selectedOperator) {

    if (currentNumber === "") {
        return;
    }

    previousNumber = currentNumber;

    operator = selectedOperator;

    currentNumber = "";

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

    let previous = Number(previousNumber);
    let current = Number(currentNumber);

    let result;


    if (operator === "+") {
        result = previous + current;
    }

    else if (operator === "-") {
        result = previous - current;
    }

    else if (operator === "*") {
        result = previous * current;
    }

    else if (operator === "/") {

        if (current === 0) {

            display.innerText = "Error";

            currentNumber = "";
            previousNumber = "";
            operator = null;

            return;
        }

        result = previous / current;
    }


    currentNumber = result.toString();

    previousNumber = "";

    operator = null;

    display.innerText = currentNumber;
}


// Percentage
function percentage() {

    if (currentNumber !== "") {

        currentNumber =
            (Number(currentNumber) / 100).toString();

        display.innerText = currentNumber;
    }
}


// Delete
function deleteNumber() {

    currentNumber =
        currentNumber.slice(0, -1);

    if (currentNumber === "") {
        currentNumber = "0";
    }

    display.innerText = currentNumber;
}


// Clear
function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    display.innerText = "0";
}
// Change Dark / Light Theme
function toggleTheme() {

    document.body.classList.toggle("light");

}