class Calculator {
    constructor(firstOperandTextElement, currentOperandTextElement) {
        this.firstOperandTextElement = firstOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.readyToReset = false
        this.clear()
    }

    clear() {
        this.firstOperand = ''
        this.currentOperand = ''        
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.firstOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.firstOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const first = parseFloat(this.firstOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(first) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = first + current
                break
            case '-':
                computation = first - current
                break
            case '*':
                computation = first * current
                break
            case '/':
                computation = first / current
                break
            default:
                return                
        }
        this.readyToReset = true
        this.currentOperand = computation
        this.operation = undefined
        this.firstOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.firstOperandTextElement.innerText =
            `${this.getDisplayNumber(this.firstOperand)} ${this.operation}`
        } else {
            this.firstOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const firstOperandTextElement = document.querySelector('[data-first-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(firstOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.firstOperand === '' &&
        calculator.currentOperand !== '' &&
        calculator.readyToReset) {
            calculator.currentOperand = ''
            calculator.readyToReset = false
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})