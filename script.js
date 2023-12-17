let nums = document.querySelectorAll('.nums');
let opertators = document.querySelectorAll('.operators');
let equal = document.querySelector('.equals');
let del = document.querySelector('.del');

let display = document.querySelector('#res');

let first = 1;
let handler = 0;
let dot = 1;
let errors = 0;

function updateScroll(){
    display.parentElement.scrollLeft = display.parentElement.scrollWidth;
}

del.addEventListener('click', function(){
    display.textContent = 0;
    first = 1;
    handler = 0;
    dot = 1;
    console.log(dot); 
});

function dispNum(clicked){
    if(first){
        display.textContent = clicked;
        first = 0;
    }
    else{
        display.textContent += clicked;
    }
}

nums.forEach(function(button){
    button.addEventListener('click', function(){
        let num = button.textContent;
        if(num == '.'){
            if(dot){
                dispNum(num);
                dot = 0;
            }
        }
        else{
            dispNum(num);
        }
        handler = 0;
        updateScroll();
    });
});

opertators.forEach(function(op){
    op.addEventListener('click', function(){
        let selected = op.textContent;
        first = 0;
        if(errors){
            display.textContent = '0'
            errors = 0;
        }
        
        if(handler){
            display.textContent = display.textContent.slice(0, -1);
        }
        switch(selected){
            case '+':
                display.textContent += '+';
                handler = 1;
                break;
            case '-':
                display.textContent += '-';
                handler = 1;
                break;
            case 'X':
                display.textContent += '*';
                handler = 1;
                break;
            case '÷':
                display.textContent += '/';
                handler = 1;
                break;
            case '%':
                display.textContent = eval(display.textContent)/100;
                break;
        }
        dot = 1;
        updateScroll();
    });
});

equal.addEventListener('click', function(){
    const regex = /\d+$/;
    if (regex.test(display.textContent)){
        if(isNaN(eval(display.textContent))){
            display.textContent = 'Error';
            first = 0;
            errors = 1;
        }
        else{
            switch(eval(display.textContent)){
                case Infinity:
                    display.textContent = 'Undefined';
                    first = 0;
                    errors = 1;
                    break;
                case null:
                    display.textContent = 'Error';
                    first = 0;
                    errors = 1;
                    break;
                default:
                    display.textContent = Math.round(eval(display.textContent)*10000)/10000;
                    break;
            }
        }
        first = 1;
        dot = 1;
    }
});
