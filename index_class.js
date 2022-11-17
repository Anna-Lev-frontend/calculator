class Model {
    constructor() {
        this.operator = 'plus';
        this.leftOperandValue = 0;
        this.rightOperandValue = 0;
        //this.buttonDisabled = false;
        //this.result = null; 
    }
    setOperator(value) {
        this.operator = value;
    }
    setLeftOperatorValue(value) {
        this.leftOperandValue = Number(value);
    }
    setRightOperatorValue(value) {
        this.rightOperandValue = Number(value);
    }
    isBtnDisabled() {
        return !(this.leftOperandValue && this.rightOperandValue)
    }
    getResult() {
        switch (true) {
            case this.operator === 'plus':
                return this.leftOperandValue + this.rightOperandValue;
        };
        switch (true) {
            case this.operator === 'minus':
                return this.leftOperandValue - this.rightOperandValue;
        };
        switch (true) {
            case this.operator === 'mult':
                return this.leftOperandValue * this.rightOperandValue;
        };
        switch (true) {
            case this.operator === 'div':
                return this.leftOperandValue / this.rightOperandValue;
        };
    }
}

class View {
    constructor() {
        this.leftInput = document.querySelector('#leftOperand');
        this.rightInput = document.querySelector('#rightOperand');
        this.operator = document.querySelector('#operator')
        this.btnResult = document.querySelector('#calculate-btn');
        this.result = document.querySelector('#show-result')
    }
    btnDisabled(value) {
        this.btnResult.disabled = value;
    }
    getResult(value) {
        this.result.innerText = value;
    }
}
class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }
    start() {
        console.log(this.view.leftInput)
        this.view.leftInput.addEventListener('change', this.changeInputLeftHandler.bind(this));
        this.view.rightInput.addEventListener('change', this.changeInputRightHandler.bind(this));
        this.view.operator.addEventListener('change', this.changeOperatorHandler.bind(this));
        this.view.btnResult.addEventListener('click', this.clickBtnResult.bind(this));
    }
    changeInputLeftHandler(event) {
        this.model.setLeftOperatorValue(event.currentTarget.value);
        this.view.btnDisabled(this.model.isBtnDisabled())
    }
    changeInputRightHandler(event) {
        this.model.setRightOperatorValue(event.currentTarget.value)
        this.view.btnDisabled(this.model.isBtnDisabled());
    }
    changeOperatorHandler(event) {
        this.model.setOperator(event.currentTarget.value)
    }
    clickBtnResult(event) {
        //чтобы отменяло стандартную работу элемента
        event.preventDefault();
        const result = this.model.getResult();
        this.view.getResult(result);
    }
}

const model = new Model();
const view = new View();
const controller = new Controller(view, model);
controller.start();
