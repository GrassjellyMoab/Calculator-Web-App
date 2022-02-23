/*----------------- Global Variables needed -----------------*/
// valid Brackets
var stack = [];
var pi = Math.PI;
var count = 0; // for the counting of right brackets


/*----------------- Basic Button Functions -----------------*/
function add_to_input(val) {
    var input = $('#input');
    input.html(input.html()+val);
}

// keydown event add to input more conveniently
$(document).keydown(function(e) {
    // let KeyEvents = ['40', '41', '101', '120', '42', '47', '45', '46']; //['(', ')', 'e', 'x', '*', '/', '-', '.'];
    KeyEvents = {69:'e^(',88:'x',190:'.',191:'÷',189:'-'}; // 'e' , 'x' , '.' , '/' , '-'
    var ShiftKeyEvents = {57:'(',48:')',187:'+',56:'x'}; // '(' , ')' , ' + ' , '*'
    var key = (e.keyCode ? e.keyCode : e.which); //e.keyCode == undefined, thus e.which value is taken
    // Number Keys
    if (!e.shiftKey) {
        if (parseInt(key) > 47 && parseInt(key) < 58) {
            $('#input').html($('#input').html() + (key - 48));
        }
        if (key in KeyEvents) {
            $('#input').html($('#input').html()+KeyEvents[key]);
        }
        // if functions shortcuts
        if (key == 8) {
            Delete();
        }
        if (key == 13) {
            Results();
        }
        if (key == 67) {
            Clear();
        }
    }
    // if shift key is pressed
    else if (e.shiftKey) {
        if (key in ShiftKeyEvents) {
            $('#input').html($('#input').html()+ShiftKeyEvents[key]);
        }
        if (key == 8) {
            Delete();
        }
        if (key == 13) {
            Results();
        }
        if (key == 67) {
            Clear();
        }
    }
});

function Delete() {
    var inputHTML = $('#input').html();
    // delete sin(
    if (inputHTML[inputHTML.length-1] =='(' && inputHTML[inputHTML.length-2] == 'n' && inputHTML[inputHTML.length-3] == 'i' && inputHTML[inputHTML.length-4] == 's') {
        $('#input').html(inputHTML.slice(0,-4));
    }
    // delete cos(
    else if (inputHTML[inputHTML.length-1] == '(' && inputHTML[inputHTML.length-2] == 's' && inputHTML[inputHTML.length-3] == 'o' && inputHTML[inputHTML.length-4] == 'c') {
        $('#input').html(inputHTML.slice(0,-4));
    }
    // delete tan(
    else if (inputHTML[inputHTML.length-1] == '(' && inputHTML[inputHTML.length-2] == 'n' && inputHTML[inputHTML.length-3] == 'a' && inputHTML[inputHTML.length-4] == 't') {
        $('#input').html(inputHTML.slice(0,-4));
    }
    // delete log(
    else if (inputHTML[inputHTML.length-1] == '(' && inputHTML[inputHTML.length-2] == 'g' && inputHTML[inputHTML.length-3] == 'o' && inputHTML[inputHTML.length-4] == 'l') {
        $('#input').html(inputHTML.slice(0,-4));
    }
    // delete e^(   
    else if (inputHTML[inputHTML.length-1] == '(' && inputHTML[inputHTML.length-2] == '^' && inputHTML[inputHTML.length-3] == 'e') {
        $('#input').html(inputHTML.slice(0,-3));
    }
    else { 
        $('#input').html(inputHTML.slice(0,-1));
    }

}

function Clear() {
    $('#input').html("");
    $('#output-value').html("");
}

/*----------------- Change to Input Box reset output box -----------------*/
$('#input').on('DOMSubtreeModified', function() {
    $('#output-value').html("");
});

/*----------------- Checking validity functions -----------------*/
function validBrackets(input, i) {
// check if brackets are not used properly 
        // () is not valid
        if (input[i] == "(" && input[i+1] == ")") {
            
            document.getElementById('output-value').innerHTML = 'Syntax Error';
            return 'false';
        }
        if (input[i] == "(") {
            count += 1;
        }
         // first bracket cannot be right bracket
        if (input[i] == ")" && count==0) {
            document.getElementById('output-value').innerHTML = 'Syntax Error';
            return 'false';
        }
        // if left bracket add to stack, if right bracket, remove left bracket from stack to ensure brackets are in pairs
        if (input[i] == "(") {
            stack.push(input[i]);
        }
        else if (input[i] == ")") {
            stack.pop();
        }
        return stack;
}

function ValidSpecialFunctions (input, i) {
    // check validity of π
    if (input[i] == 'π' && !isNaN(input[i+1])) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    // if first char is an operator
    if (i == 0 && (input[i] == '+' || input[i] == '-' || input[i] == 'x' || input[i] == '÷')) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    // check validity of +
    if (input[i] == '+' && (isNaN(input[i+1]) || isNaN(input[i-1]))) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    // check validity of -
    if (input[i] == '+' && (isNaN(input[i+1]) || isNaN(input[i-1]))) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    // check validity of x
    if (input[i] == '+' && (isNaN(input[i+1]) || isNaN(input[i-1]))) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    // check validity of ÷
    if (input[i] == '+' && (isNaN(input[i+1]) || isNaN(input[i-1]))) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    // check validity of .
    if (input[i] == '.' && isNaN(input[i+1])) {
        document.getElementById('output-value').innerHTML = 'Syntax Error';
        return 'false';
    }
    
    
}


/*----------------- SubFunctions -----------------*/
function CondenseSpecialFunctions() {
    // condense log(), sin(), cos(), tan(), e^()
}

function Condense_Bracket_Values() {
    // get index of brackets and form the pairs then condense them eg (((9+9)*8)+9) => ((18*8)+9) => (144+9) => 153
    for (let i=0; i < $('#input').html().length; i++) {

    }
}
/*----------------- Operators -----------------*/
function Addition(a, b) {
    return a + b;
}

function Subtraction(a, b) {
    return a - b;
}

function Multiply(a, b) {
    return a * b
}

function Division(a, b) {
    return a / b
}

function Exponential(a) {
    return Math.exp(a);
}

function sin(a) {
    return Math.sin(a);
}

function cos(a) {
    return Math.cos(a);
}

function tan(a) {
    return Math.tan(a);
}

function log(a) {
    return Math.log(a);
}
/*----------------- -----------------*/
function Results() {
    // variable to leave function if true
    var exit = false;
    var output = document.getElementById('output-value');
    var input = document.getElementById('input').innerHTML;
    var BracketsResult;
     // count to check if there is a '(' before
    count = 0;

    // check if input expression is valid
    for (var i=0; i<input.length; i++) {
        // check if Brackets are valid
        var BracketsResult = validBrackets(input, i); // (InputString, index, counter to keep track of '(' )
        var ValidityCheck = ValidSpecialFunctions(input, i);
        if (BracketsResult == 'false' || ValidityCheck == 'false') {
            exit = true;
            break;
        }
    }   

    // exit function
    if (exit == true) {
        return;
    }

    // if bracket stack has values, that means there are invalid brackets
    if (BracketsResult.length) {
        output.innerHTML = 'Syntax Error';
    }
    //reset bracket stack
    stack = [];

}