class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        if(this.currentOperand === '0') {
            this.clear();
        }
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        if(this.currentOperand === '') {
            this.currentOperand = 0;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    } 
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "/":
                computation = prev / current
                break
            default: 
             return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null){
            return `${intergerDigits}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }
    updateDisplay(){
        
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-reset]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


let switches = document.getElementsByClassName('switch');

for (let i of switches) {
    i.addEventListener('click', function () {
      let theme = this.dataset.theme;
    });
  }

  const switch1 = document.querySelector('.theme-selector1')
  const switch2 = document.querySelector('.theme-selector2')
  const switch3 = document.querySelector('.theme-selector3')

function setTheme(theme) {
    if (theme == 'theme-1') {
      document.getElementById('switcher-id').href = './themes/theme-1.css';
      switch1.classList.add('active')
      switch2.classList.remove('active')
      switch3.classList.remove('active')
    } else if (theme == 'theme-2') {
      document.getElementById('switcher-id').href = './themes/theme-2.css';
      switch1.classList.remove('active')
      switch2.classList.add('active')
      switch3.classList.remove('active')
    } else if (theme == 'theme-3') {
      document.getElementById('switcher-id').href = './themes/theme-3.css';
      switch1.classList.remove('active')
      switch2.classList.remove('active')
      switch3.classList.add('active')
    } 
    localStorage.setItem('style', theme);
  }

for (let i of switches) {
   i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setTheme(theme);
    });
}

let style = localStorage.getItem('style');

if (style == null) {
    setTheme('theme-1');
} else {
    setTheme(style);
}
