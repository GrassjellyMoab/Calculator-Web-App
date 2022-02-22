function add_to_input(val) {
    var input = $('#input');
    input.html(input.html()+val);
}

function Delete() {
    var inputHTML = $('#input').html();
    $('#input').html(inputHTML.slice(0,-1));
}

function Clear() {
    $('#input').html("");
    $('#output-value').html("");
}

function validBrackets(input, i) {
// check if brackets are not used properly 
        // () is not valid
        var stack = [];
        if (input[i] == "(" && input[i+1] == ")") {
            document.getElementById('output-value').innerHTML = 'Invalid Expression';
            return 'false';
        }
         // first bracket cannot be right bracket
        if (input[i] == ")") {
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

function Results() {
    // variable to leave function if true
    var exit = false;
    var output = document.getElementById('output-value');
    var input = document.getElementById('input').innerHTML;
    var BracketsResult;

    // check if input expression is valid
    for (var i=0; i<input.length; i++) {
        // check if Brackets are valid
        var BracketsResult = validBrackets(input, i);
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

}