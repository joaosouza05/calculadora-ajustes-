const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;

function updateDisplay() {
    display.innerText = currentInput || "0";
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (number === "." && currentInput.includes(".")) return;

    if (number === "." && currentInput === "") {
        currentInput = "0";
    }

    currentInput += number;
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === "") return;

    if (previousInput !== "" && operator !== "") {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    currentInput = "";
    shouldResetDisplay = false;
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    shouldResetDisplay = false;
    updateDisplay();
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === "") return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                display.innerText = "Erro";
                currentInput = "";
                previousInput = "";
                operator = "";
                shouldResetDisplay = true;
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = String(Number(result.toPrecision(10)));
    previousInput = "";
    operator = "";
    shouldResetDisplay = true;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (button.id === "clear") {
            clearDisplay();
            return;
        }

        if (button.id === "calculate") {
            calculate();
            return;
        }

        if (["+", "-", "*", "/"].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});
