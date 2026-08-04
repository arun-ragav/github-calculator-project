let display = document.getElementById("display");


// Add number or operator

function appendValue(value) {

    if (display.value === "0") {

        display.value = value;

    } else {

        display.value += value;

    }

}


// Clear calculator

function clearDisplay() {

    display.value = "0";

}


// Delete last character

function deleteNumber() {

    display.value =
        display.value.slice(0, -1);


    if (display.value === "") {

        display.value = "0";

    }

}


// Calculate result

function calculate() {

    try {

        display.value =
            eval(display.value);

    } catch {

        display.value = "Error";

    }

}