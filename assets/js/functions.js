/*----------------- Global Variables needed -----------------*/
// valid Brackets
var pi = Math.PI;
var e = Math.E;
var operators = ['+','-','x','÷'];
var NUM_MAX = 9.999999999 * power(10,99);



/*----------------- Simplified Expressions equate -----------------*/
// equates a simplified expression with no brackets into 1 number
const Equate_Simplified = (expression) => {
    //// split this expression into arr first with nums and operators
    arr_index_counter = 0;
    arr = [];
    for (let i=0; i<expression.length; i++) {
        // if value at that index is empty
        if (!arr[arr_index_counter]) {
            arr[arr_index_counter] = "";
        }

        // specific scenario of --num at the start then skip to the number after -- since -- = +
        if (i==0 && (expression[i] == '-') && expression[i+1]=='-') {
            i=i+1;
        }

        // take into account -ve sign at first index
        // first index value is -ve or (- and previous char is not an operator) or (current char is not an operator (eg number or e etc))
        else if (i==0 && (expression[i] == '-') || (expression[i]=='-' && operators.includes(expression[i-1]))||!operators.includes(expression[i])) {
            arr[arr_index_counter] += expression[i];
        }
    
        // if operator and previous char is not an operator
        else if (operators.includes(expression[i]) && !operators.includes(expression[i-1])) {
            arr[arr_index_counter+1] = "";
            arr[arr_index_counter+1] += expression[i];
            arr_index_counter += 2;
        }
    }
    console.log(arr);

     // prioritise geometric operators 
    var geo_operator_count;
    while (true) {
        geo_operator_count = 0;
        for (let x=0; x<arr.length; x++) {
            // if multiply
            if (arr[x]=='x') {
                let temp = arr;
                temp = arr.slice(0,x-1);
                temp.push(Multiply(arr[x-1],arr[x+1]));
                arr = temp.concat(arr.slice(x+2));
                geo_operator_count += 1;
                break
            }

            // if division
            if (arr[x]=='÷') {
                let temp = arr;
                temp = arr.slice(0,x-1);
                temp.push(Division(arr[x-1],arr[x+1]));
                arr = temp.concat(arr.slice(x+2));
                geo_operator_count += 1;
                break
            }
        }
        if (geo_operator_count==0) {
            break;
        }
    }

    
    // Aritmentic Operators Prioritised Last
    var arith_operator_count;
    while (true) {
        for (let x=0; x<arr.length; x++) {
            arith_operator_count = 0
            // if addition
            if (arr[x]=='+') {
                let temp = arr;
                temp = arr.slice(0,x-1);
                temp.push(Addition(arr[x-1],arr[x+1]));
                arr = temp.concat(arr.slice(x+2));
                arith_operator_count += 1;
                break
            }

            // if subtraction 
            if (arr[x]=='-') {
                let temp = arr;
                temp = arr.slice(0,x-1);
                temp.push(Subtraction(arr[x-1],arr[x+1]));
                arr = temp.concat(arr.slice(x+2));
                arith_operator_count += 1;
                break
            }
        }
        if (arith_operator_count==0) {
            break;
        }
    }

    // return the final result
    return arr[0];
}
/*----------------- SubFunctions -----------------*/

// start condensing from most inner special function
const CondenseSpecialFunctions = (input) => { 
    var SpecialFunctions = ['log', 'sin', 'cos', 'tan']; 
    while (true) {
        // look for most inner 
        let LastIndex;
        let end_condition = 0;
        for (let i=0; i<input.length;i++) {
            // if sin cos tan log or e
            temp = "";
            if ((input[i] == 's' && input[i+1] == 'i') || (input[i] == 'c' && input[i+1] == 'o') || input[i] == 't' || input[i] == 'l' || input[i] == 'e') {
                let temp = "";
                let bool = true;
                let TempCount1 = 1;
                let TempCount2 = 0;

                // get the matching pair of most outer () 
                if ((input[i] == 's' && input[i+1] == 'i') || (input[i] == 'c' && input[i+1] == 'o') || (input[i] == 't') || (input[i] == 'l')) {
                    end_condition += 1;
                    for (let x=i+4; x < input.length; x++) {
                        if (input[x] == '(') {
                            TempCount1 += 1;
                        }
                        else if (input[x] == ')') {
                            TempCount2 += 1;
                        }
                        if (input[x] == ')' && (TempCount1 == TempCount2)) {
                            LastIndex = x;
                            break; // dont include end brackets into temp variable
                        }
                        temp += input[x]; // temp is the string within the 2 matching brackets
                    }
                }
    
                // check whether its a special function with special functions inside
                for (let z=0; z<SpecialFunctions.length; z++) {
                    if (temp.includes(SpecialFunctions[z])) {
                        
                        bool = false;
                    }
                }
                // if no nested functions eg. sin(sin9))
                if (bool) {
                    let second_part = input.slice(LastIndex+1);
                    let first_part = input.slice(0,i);
                    if (!isNaN(first_part[first_part.length-1])) {
                        if (input[i] == 's') {
                            input = first_part + 'x'+ sin(Equate_Simplified(temp)) + second_part;
                        }
                        else if (input[i] == 'c') {
                            input = first_part + 'x'+ cos(Equate_Simplified(temp)) + second_part;
                        }
                        else if (input[i] == 't') {
                            input = first_part + 'x'+ tan(Equate_Simplified(temp)) + second_part;
                        }
                        else if (input[i] == 'l') {
                            input = first_part + 'x'+ log(Equate_Simplified(temp)) + second_part;
                        }
                    }

                    else {
                        if (input[i] == 's') {
                            input = first_part + sin(Equate_Simplified(temp)) + second_part;
                        }
                        else if (input[i] == 'c') {
                            input = first_part + cos(Equate_Simplified(temp)) + second_part;
                        }
                        else if (input[i] == 't') {
                            input = first_part + tan(Equate_Simplified(temp)) + second_part;
                        }
                        else if (input[i] == 'l') {
                            input = first_part + log(Equate_Simplified(temp)) + second_part;
                        }
                    }
                }
            }
        }
        // end the while loop if no more of those brackets
        if (end_condition == 0) {
            break;
        }
    }
    // return most simplified

    return input;
}

    
    
function Condense_Bracket_Values(input) {
    var end_condition;

    // get index of brackets and form the pairs then condense them eg (((9+9)*8)+9) => ((18*8)+9) => (144+9) => 153
    while (true) {
        end_condition = 0;
        let productbracketcheck = 0;

        for (let i=0; i < input.length; i++) {
            if (input[i] == '(') {
                var temp = "";
                let bool = true;
                // prevent end condition where there are no more normal brackets
                if (input[i-1]!='n' && input[i-1]!='s' && input[i-1]!='^' && input[i-1]!='g' && input[i-1]!=')' && isNaN(input[i-1])) {
                    end_condition += 1;
                }

                let TempCount1 = 1;
                let TempCount2 = 0;
                for (let x=i+1; x < input.length; x++) {
                    if (input[x] == '(') {
                        TempCount1 += 1;
                        // check if product brackets exist
                        if (!isNaN(input[x-1])) {
                            productbracketcheck += 1;
                        }
                    }
                    else if (input[x] == ')') {
                        TempCount2 += 1;
                    }
                    if (input[x] == ')' && (TempCount1 == TempCount2)) {
                        LastIndex = x;
                        break;
                    }
                    temp += input[x];
                }

                if (temp.includes('(') || temp.includes(')') && productbracketcheck==1){
                    bool = false;
                }
        
                // extra NaN to prevent mistaking normal bracket for multiplication brackets
                if (bool) {
                // use EquateSimplified function
                    if (productbracketcheck) {
                        // filter out all product brackets first
                        input = BracketMultiply(input);
                        break;
                    }
                    // if log sin cos tan or e dont remove brackets
                    else if (input[i-1]=='n' || input[i-1]=='s' || input[i-1]=='^' || input[i-1]=='g' || input[i-1]==')' ||!isNaN(input[i-1])) {
                        input = input.slice(0,i+1) + Equate_Simplified(temp) + input.slice(LastIndex);
                        break;
                    }
                    else {
                        input = input.slice(0,i) + Equate_Simplified(temp) + input.slice(LastIndex+1);
                        break;
                    }
                }
            }
        }

        // end the while loop if no more of those brackets
        if (end_condition == 0) {
            break;
        }
    }
    // so only outerfunction can do the return thing so i need to edit the input tbh
    return input;
}

const BracketMultiply = (input) => {
    let LastIndex;
    while(true) {
        let end_condition = 0;
        for (let i=0; i<input.length; i++) {
            // select the product bracket
            if (input[i]=='(' && !isNaN(input[i-1])) {
                // find the matching bracket
                for (let x = i+1; x < input.length; x++) {
                    if (input[x] == ')') {
                        LastIndex = x;
                        break;
                    }
                }
                end_condition += 1;


                // if null behind right bracket,
                if (LastIndex == input.length) {
                    input = input.slice(0,i) + 'x' + Equate_Simplified(input.slice(i+1, LastIndex));
                    break;
                }
        
                else if (input[LastIndex+1] == '(') {
                    input = input.slice(0,i) + 'x' + Equate_Simplified(input.slice(i+1,LastIndex)) + input.slice(LastIndex+1);
                    break;
                }
                else {
                    input = input.slice(0,i) + 'x' + Equate_Simplified(input.slice(i+1, LastIndex)) + input.slice(LastIndex+1);
                    break;
                }
            }
        }
        // end loop once no more product brackets
        if (end_condition == 0) {
            break;
        }
    }   
    return input
}

/*----------------- Main Function -----------------*/
function Results() {
    // variable to leave function if true
    var output = $('#output-value');
    var input = $('#input').html();
    // if empty 
    if (input=="") {
        return;
    }

    // check if input expression is valid
    // variable to leave function if true due to syntyax
    var exit = false;
    // check if Brackets are valid
    var ValidityCheck = ValidCheck(input);
    if (ValidityCheck == 'false') {
        output.html('Syntax Error');
        exit = true;
    }   
     // exit function
    if (exit == true) {
        return 0;
    }


    // replace π and e with number
    for (let i=0; i<input.length; i++) {
        if (input[i] == 'π') {
            if (i==0) {
                // pi is the only char
                if (i == input.length) {
                    input = pi;
                    break;
                }
                // pi is the first char but more chars behind
                else if (i < input.length) {
                    input = pi + input.slice(1);
                }
            }
            else if (i>0 && i!=input.length-1) {
                // pi is in between 2 char
                input = input.slice(0,i) + '(' + pi +')' + input.slice(i+1);
            }
            else if (i==input.length-1) {
                input = input.slice(0,i) + '(' + pi +')';
            }
        }
        else if (input[i] == 'e') {
            if (i==0) {
                // pi is the only char
                if (i == input.length) {
                    input = e;
                    break;
                }
                // pi is the first char but more chars behind
                else if (i < input.length) {
                    input = e + input.slice(1);
                }
            }
            else if (i>0 && i!=input.length-1) {
                // pi is in between 2 char
                input = input.slice(0,i) + '(' + e +')' + input.slice(i+1);
            }
            else if (i==input.length-1) {
                input = input.slice(0,i) + '(' + e +')';
            }
        }
    }

    // Condense all Brackets
    // check for operators and use them (prioritise geometric operators)
    input = Condense_Bracket_Values(input);
    input = CondenseSpecialFunctions(input);
    // filter out all product brackets
    input = BracketMultiply(input);
    // equate all
    input = Equate_Simplified(input);


    // set number limit for output
    if (input > NUM_MAX) {
        output.html('Math Error');
        return;
    }

    output.html(input);
    }

 