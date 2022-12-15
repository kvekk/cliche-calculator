class Calculator {

    constructor(prevOperandText, curOperandText) {
        this.prevOperandText = prevOperandText
        this.curOperandText = curOperandText
        this.clear();
    }

    clear() {
        this.curOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        this.curOperand = this.curOperand.slice(0, -1)
    }

    append(number) {
        if (number === '.' && (this.curOperand.includes('.') || this.curOperand.length === 0)) {
            return;
        }
        this.curOperand += number.toString()
    }

    chooseOperation(operation) {
        if (this.curOperand === '') return
        if (this.prevOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.prevOperand = this.curOperand
        this.curOperand = ''
    }

    calculate() {
        if (this.prevOperand === '' || this.curOperand === '') return
        let result
        const prev = parseFloat(this.prevOperand)
        const cur = parseFloat(this.curOperand)
        switch (this.operation) {
            case '+':
                result = prev + cur
                break
            case '-':
                result = prev - cur
                break
            case '×':
                result = prev * cur
                break
            case '÷':
                result = prev / cur
                break
            default:
                return
        }
        this.curOperand = result.toString()
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay() {
        this.curOperandText.innerText = this.curOperand
        if (this.operation != null) {
            this.prevOperandText.innerText = `${this.prevOperand} ${this.operation}`
        }
        else {
            this.prevOperandText.innerText = this.prevOperand
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const prevOperandText = document.querySelector('[data-prev-operand]')
const curOperandText = document.querySelector('[data-cur-operand]')

const calculator = new Calculator(prevOperandText, curOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})