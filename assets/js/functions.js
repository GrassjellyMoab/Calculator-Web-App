/*----------------- Global Variables needed -----------------*/
// valid Brackets
var stack = [];
var pi = Math.PI;


/*----------------- Basic Button Functions -----------------*/
function add_to_input(val) {
    var input = $('#input');
    input.html(input.html()+val);
}

// keydown event add to input more conveniently
$(document).keydown(function(e) {
    // let KeyEvents = ['40', '41', '101', '120', '42', '47', '45', '46']; //['(', ')', 'e', 'x', '*', '/', '-', '.'];
    KeyEvents = {69:'e',88:'x',190:'.',191:'÷',189:'-'}; // 'e' , 'x' , '.' , '/' , '-'
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
    $('#input').html(inputHTML.slice(0,-1));
}

function Clear() {
    $('#input').html("");
    $('#output-value').html("");
}



/*----------------- Checking validity functions -----------------*/
function validBrackets(input, i, count) {
// check if brackets are not used properly 
        // () is not valid
        if (input[i] == "(" && input[i+1] == ")") {
            
            document.getElementById('output-value').innerHTML = 'Invalid Expression';
            return 'false';
        }

        if (input[i] == "(") {
            count+=1;
        }
         // first bracket cannot be right bracket
        if (input[i] == ")" && count>0) {
            console.log("help la");
            document.getElementById('output-value').innerHTML = 'Invalid Expression';
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

function validexponential() {

}

function validDot() {

}

/*----------------- SubFunctions -----------------*/
function Condense_Bracket_Values() {

}
/*----------------- Operators -----------------*/
function Addition() {

}

function Subtraction() {

}

function Multiply() {

}

function Division() {

}

function Exponential() {

}

function sin() {

}

function cos() {

}

function tan() {

}

function log() {

}
/*----------------- -----------------*/
function Results() {
    // variable to leave function if true
    var answer = 0;
    var exit = false;
    var output = document.getElementById('output-value');
    var input = document.getElementById('input').innerHTML;
    var BracketsResult;
     // count to check if there is a '(' before
     var count = 0;

    // check if input expression is valid
    for (var i=0; i<input.length; i++) {
        // check if Brackets are valid
        var BracketsResult = validBrackets(input, i, count); // (InputString, index, counter to keep track of '(' )
        if(BracketsResult == 'false') {
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
        output.innerHTML = 'Invalid Expression';
    }
    //reset bracket stack
    stack = [];

}