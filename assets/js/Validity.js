function ValidCheck (input) {
    // variables needed
    var count = 0; // for the counting of right brackets
    var bracketpaircheck = 0;
    var operator_count = 0; // counting the number of operators;
    var output = $('#output.value');
    var operators = ['+','-','×','÷'];
    var left_checks = [')','π','e'];
    var right_checks = ['(','π','s','c','t','l','e'];
    var output = $('#output.value');
    var result = "true";

    // loop through expression
    for (let i=0; i<input.length; i++) {
        // Check for brackets validity
        // check if brackets are not used properly 
        // () is not valid
        if (input[i] == "(" && input[i+1] == ")") {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        if (input[i] == "(") {
            count += 1;
        }
        // first bracket cannot be right bracket
        if (input[i] == ")" && count==0) {
            output.html('Syntax Error');
            count = 0; // reset counter
            result = 'false';
            break;
        }
        // after right bracket can only be operator or '(' or nothing (take into account when ) is last char
        if (input[i] == ")" && !operators.includes(input[i+1]) && input[i+1]!=')' && input[i+1]!='(' && i!=input.length-1) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }

        // check same number of right and left brackets
        if (input[i] == "(") {
            bracketpaircheck += 1;
        }
        else if (input[i] == ")") {
            bracketpaircheck -= 1;
        }
        // if function valid, stack should = '[]' at the end of the thing
        if (bracketpaircheck != 0 && i==input.length-1) {
            output.html('Syntax Error');
            result = 'false';
        }

        // check validity of π and e
        if ((input[i] == 'π' || input[i] == 'e') && !isNaN(input[i+1])) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        // if first char is an operator
        if (i == 0 && (input[i] == '+' || input[i] == '×' || input[i] == '÷')) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        // check validity of +
        if (input[i] == '+' && ((isNaN(input[i+1] && input[i+1]!='-') && !right_checks.includes(input[i+1])) || (isNaN(input[i-1]) && !left_checks.includes(input[i-1])))) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        // check validity of ×
        if (input[i] == '×' && ((isNaN(input[i+1] && input[i+1]!='-') && !right_checks.includes(input[i+1])) || (isNaN(input[i-1]) && !left_checks.includes(input[i-1])))) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        // check validity of ÷
        if (input[i] == '÷' && ((isNaN(input[i+1] && input[i+1]!='-') && !right_checks.includes(input[i+1])) || (isNaN(input[i-1]) && !left_checks.includes(input[i-1])))) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        // check validity of .
        if (input[i] == '.' && (isNaN(input[i+1]) || left_checks.includes(input[i-1]))) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }

        // check validity of -
        // (--9) is not acceptable
        if (input[i] == '(' && input[i+1] == '-' && input[i+2] == '-') {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        // Special Case so we can consider -ve numbers
        if (input[i] == '-' && // char is '-'
            (input[i+1] == '÷' || input[i+1] == '×') // -÷ and -x leads to syntax error
            ) {
            // conditions 
            // -% no go, -+ is ok, -- is ok, if - i+2 char cannot be operator unless i+1 is a (
            // if [i-1] is an operator, i-2 cannot be operator
            output.html('Syntax Error');
            result = 'false';
            break;
        }
        /// if more than 3 operators in a row invalid eg. 9-((-9)-(-(-9))
        if (operators.includes(input[i])) {
            operator_count += 1;
        }
        else if (!operators.includes(input[i])) {
            operator_count = 0;
        }

        if (operator_count == 3) {
            output.html('Syntax Error');
            result = 'false';
            break;
        }
    }
    return result;
}