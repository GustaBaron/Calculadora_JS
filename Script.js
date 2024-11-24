document.addEventListener("DOMContentLoaded", function () {
    const visor = document.getElementById("visor");
    let currentInput = "0";
    let previousInput = "";
    let operator = null;

    function updateVisor(value) {
        visor.value = value;
    }

    function Limpar() {
        currentInput = "0";
        previousInput = "";
        operator = null;
        updateVisor(currentInput);
    }

    function Apagar() {
        currentInput = currentInput.slice(0, -1) || "0";
        updateVisor(currentInput);
    }

    function appendNumber(number) {
        if (currentInput === "0" && number !== ",") {
            currentInput = number;
        } else if (number === "," && !currentInput.includes(".")) {
            currentInput += ".";
        } else if (number !== ",") {
            currentInput += number;
        }
        updateVisor(currentInput);
    }

    function DefineOperador(op) {
        if (operator && previousInput && currentInput) {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = "0";
    }

    function Igual() {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(curr)) return;

        let result;
        switch (operator) {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "x":
                result = prev * curr;
                break;
            case "÷":
                result = prev / curr;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = "";
        updateVisor(currentInput);
    }

    function TrocarSinal() {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateVisor(currentInput);
    }

    function Porcentagem() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateVisor(currentInput);
    }

    function inverso() {
        currentInput = (1 / parseFloat(currentInput)).toString();
        updateVisor(currentInput);
    }

    function AoQuadrado() {
        currentInput = Math.pow(parseFloat(currentInput), 2).toString();
        updateVisor(currentInput);
    }

    function Raiz() {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateVisor(currentInput);
    }

    document.getElementById("Limpar").onclick = Limpar;
    document.getElementById("Apagar").onclick = Apagar;
    document.getElementById("TrocarSinal").onclick = TrocarSinal;
    document.getElementById("Porcentagem").onclick = Porcentagem;
    document.getElementById("inverso").onclick = inverso;
    document.getElementById("AoQuadrado").onclick = AoQuadrado;
    document.getElementById("Raiz").onclick = Raiz;
    document.getElementById("Mais").onclick = () => DefineOperador("+");
    document.getElementById("Menos").onclick = () => DefineOperador("-");
    document.getElementById("Multiplicacao").onclick = () => DefineOperador("x");
    document.getElementById("Divisao").onclick = () => DefineOperador("÷");
    document.getElementById("Igual").onclick = Igual;

    const numberButtons = document.getElementsByClassName("btn-calc");
    for (let button of numberButtons) {
        if (!isNaN(button.id)) {
            button.onclick = () => appendNumber(button.id);
        }
    }

    document.getElementById("decimal").onclick = () => appendNumber(",");
});
