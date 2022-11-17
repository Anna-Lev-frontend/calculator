// MVC

// Модель
const calculator = {
    firstOperand: "",
    secondOperand: "",
    operator: "",
    result: "",
    btnDisabled: true,

    // вызов метода обновления представления
    updateView: function () {
        htmlView.update(this.result, this.btnDisabled);
    },
    //вычисление результата операции
    performOperation: function () {
        if (!this.isValidOperands()) {
            this.result = `Операндом может быть только число`;
            this.updateView();
            return;
        }

        const a = Number(this.firstOperand);
        const b = Number(this.secondOperand);

        switch (this.operator) {
            case "plus":
                this.result = a + b;
                break;
            case "minus":
                this.result = a - b;
                break;
            case "mult":
                this.result = a * b;
                break;
            case "div":
                this.result = b ? a / b : "Деление на ноль недопустимо";
                break;
            default:
                this.result = "К сожалению такой операции еще нет :(";
        }

        this.result = isNaN(this.result) ? this.result : `Результат вычислений = ${this.result}`;
        this.updateView();
    },

    // проверка что операнды числа
    isValidOperands: function () {
        return !isNaN(this.firstOperand) && !isNaN(this.secondOperand);
    },

    // установка параметров в модели
    setParam: function (id, value) {
        this[id] = value;
    },

    // установка состояния кнопки
    setStateBtn: function () {
        this.btnDisabled = !(this.firstOperand && this.secondOperand);
        this.updateView();
    }
};

// Представление
const htmlView = {
    btnCalc: document.getElementById("calculate-btn"),
    result: document.getElementById("show-result"),

    update: function (resultCalc, btnDisabled) {
        this.btnCalc.disabled = btnDisabled;
        this.result.innerHTML = resultCalc;
    }
};


// Контроллер
const controller = {
    addHandlers: function () {
        const calcForm = document.getElementById("calculator");
        const btnCalc = document.getElementById("calculate-btn");
        const operator = document.getElementById("operation");
        calculator.setParam("operator", operator.value);

        // обработчик событий ввода в инпуты
        calcForm.addEventListener("input", function (event) {
            event.preventDefault();
            switch (event.target.id) {
                case "input_1":
                    calculator.setParam("firstOperand", event.target.value.trim());
                    break;
                case "input_2":
                    calculator.setParam("secondOperand", event.target.value.trim());
                    break;
            }
            calculator.setStateBtn();
        });

        // обработчик выбора математической операции
        operator.addEventListener("click", function () {
            event.preventDefault();
            calculator.setParam("operator", operator.value);
        });

        // обработчик нажатия на кнопку вычислить
        btnCalc.addEventListener("click", function (event) {
            event.preventDefault();
            calculator.performOperation();
        });
    }
};

controller.addHandlers();