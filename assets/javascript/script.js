class Calculator{
    constructor(upperDisplayElement, lowerDisplayElement){
        this.upperDisplayElement = upperDisplayElement;
        this.lowerDisplayElement = lowerDisplayElement;
        this.clear();
    }

    clear(){
        this.currentNumber = '';
        this.oldNumber = '';
        this.operation = undefined;
    }

    appendNumber(number){
        if (this.currentNumber.includes('.') && number == '.'){return}
        this.currentNumber += number.toString();
    }

    chooseOperation(operation){
        if (this.currentNumber === '') {return}
        if(this.oldNumber !== ''){this.compute()}  
        this.oldNumber = this.currentNumber;
        this.operation = operation;
        this.currentNumber = '';
        this.updateDisplay();
    }

    compute(){
        switch(this.operation){
            case "+":
                this.currentNumber = (Number(this.oldNumber) + Number(this.currentNumber)).toString();
                break;
            case "-":
                this.currentNumber = (Number(this.oldNumber) - Number(this.currentNumber)).toString();
                break; 
            case "*":
                this.currentNumber = (Number(this.oldNumber) * Number(this.currentNumber)).toString();
                break;   
            case "÷":
                this.currentNumber = (Number(this.oldNumber) / Number(this.currentNumber)).toString();
                break;
            }
        }

    updateDisplay(){
        this.lowerDisplayElement.innerText = this.currentNumber;
        if (this.operation !== undefined){
            this.upperDisplayElement.innerText = this.oldNumber + "  " + this.operation;
        } else{
            this.upperDisplayElement.innerText = '';
        }
    }

}



const upperDisplayElement = document.getElementById('upper-display');
const lowerDisplayElement = document.getElementById('lower-display');
const acButton = document.querySelector('[data-ac]');
const delButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');


const calculator = new Calculator(upperDisplayElement,lowerDisplayElement);

numberButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.oldNumber = '';
    calculator.operation = undefined;
    calculator.updateDisplay();
})

acButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener('click', ()=>{
    
    if (calculator.currentNumber !== ''){
        calculator.currentNumber = calculator.currentNumber.substring(0, calculator.currentNumber.length - 1); 
    }
    calculator.updateDisplay();
})