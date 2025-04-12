const display = document.querySelector('.display')
const keycaps = document.querySelectorAll('.keycap')


keycaps.forEach(key => {
    key.addEventListener('click', handleClick);
});

document.addEventListener('keydown', handleKey);

function handleClick(event){
    const selected = event.target.textContent
    switch(selected){
        case "+":
            handleOperator(selected, display)
            break
        case "x":
            handleOperator(selected, display)
            break
        case "<-":
            deleteOne(display)
            break
        case "CE":
            deleteAll(display)
            break
        case "=":
            calculate(display)
            break
        default:
            showInDisplay(selected, display)
            break
    }
}

function handleKey(event) {
    const key = event.key;

    const validKeys = ['0','1','2','3','4','5','6','7','8','9','+','*','Enter','Backspace','Escape'];
    if (!validKeys.includes(key)) return;

    switch(key) {
        case '+':
        case '*':
            handleOperator(key, display);
            break;
        case 'Enter':
            calculate(display);
            break;
        case 'Backspace':
            deleteOne(display);
            break;
        case 'Escape':
            deleteAll(display);
            break;
        default:
            showInDisplay(key, display);
            break;
    }
}

function showInDisplay(text, display){
    display.textContent = display.textContent + text
}
function handleOperator(operator, display){
    const isValidate = validateOperatorOrder(display)
    if(!isValidate) return;
    showInDisplay(operator, display)
}
function validateOperatorOrder(display){
    const calc = display.textContent
    if(!calc || calc.includes('=')) {
        return false
    }

    const lastElement = calc[calc.length - 1]
    return lastElement !== '+' || lastElement !== 'x'
}
function deleteOne(display){
    display.textContent = display.textContent.slice(0, -1)
}
function deleteAll(display){
    display.textContent = ""
}
function calculate(display){
    const isValidate = validateOperatorOrder(display)
    if(!isValidate) return;
    const characters = display.textContent.split(/([+x])/)
    total = characters[0]
    if(characters.length === 1) return;
    for(let i = 1; i <= characters.length; i++){
        if(characters[i] === '+'){
            total = sum(total, characters[i+1])
        } else if(characters[i] === 'x'){
            total = multiply(total, characters[i+1])
        }
    }
    showInDisplay(`=${total}`, display)
}

function multiply(firstFactor, secondFactor){
    let result = ''
    for(let i = 1; i <= secondFactor; i++){
        result = `${result}${firstFactor}`
    }
    return result;
}

function sum(firstAddend, secondAddend){
    return `${firstAddend}${secondAddend}`;
}
