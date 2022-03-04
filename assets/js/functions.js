/*----------------- Global Variables needed -----------------*/
// valid Brackets
var pi = Math.PI;
var e = Math.E;
var operators = ['+','-','×','÷'];
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


     // prioritise geometric operators 
    var geo_operator_count;
    while (true) {
        geo_operator_count = 0;
        for (let x=0; x<arr.length; x++) {
            // if multiply
            if (arr[x]=='×') {
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

// start simplifying ALL brackets
const CondenseBrackets = (input) => {
    while(true) {
        let end_condition = 0;

        for (let i=0; i<input.length; i++) {
            let LastIndex = 0;
            let bool = true;
            if (input[i]=='(') {
                // get matching bracket with inner content first
                let temp = "";
                let TempCount1 = 1;
                let TempCount2 = 0;
                for (let x=i+1; x < input.length; x++) {
                    if (input[x] == '(') {
                        TempCount1 += 1;
                    }
                    else if (input[x] == ')') {
                        TempCount2 += 1;
                    }
                     // get matching ')' for input[i] == '()
                     if (input[x] == ')' && (TempCount1 == TempCount2)) {
                        LastIndex = x;
                        break;
                    }
                    temp += input[x];
                }
                
                // if content inside inner bracket has more brackets ignore and move to next index
                if (temp.includes('(') || temp.includes(')')) {
                    bool = false;
                }

                // if temp does not contain extra brackets
                if (bool) {
                    // if normal brackets
                    if (input[i-1]!='n' && input[i-1]!='s' && input[i-1]!='g' && isNaN(input[i-1])) {
                        input = input.slice(0,i) + Equate_Simplified(temp) + input.slice(LastIndex+1);
                        end_condition += 1;
                        break;
                    }

                    // if special bracket
                    if (input[i-3]=='s') {
                        input = input.slice(0,i-3) + sin(Equate_Simplified(temp)) + input.slice(LastIndex+1);
                        end_condition += 1;
                        break;
                    }
                    else if (input[i-3]=='c') {
                        input = input.slice(0,i-3) + cos(Equate_Simplified(temp)) + input.slice(LastIndex+1);
                        end_condition += 1;
                        break;
                    }
                    else if (input[i-3]=='t') {
                        input = input.slice(0,i-3) + tan(Equate_Simplified(temp)) + input.slice(LastIndex+1);
                        end_condition += 1;
                        break;
                    }
                    else if (input[i-3]=='l') {
                        input = input.slice(0,i-3) + log(Equate_Simplified(temp)) + input.slice(LastIndex+1);
                        end_condition += 1;
                        break;
                    }

                    // if product bracket
                    if (!isNaN(input[i-1])) {
                        // if null behind right bracket,
                        if (LastIndex == input.length) {
                            input = input.slice(0,i) + '×' + Equate_Simplified(input.slice(i+1, LastIndex));
                            end_condition += 1;
                            break;
                        }
                
                        else if (input[LastIndex+1] == '(') {
                            input = input.slice(0,i) + '×' + Equate_Simplified(input.slice(i+1,LastIndex)) + input.slice(LastIndex+1);
                            end_condition += 1;
                            break;
                        }
                        else {
                            input = input.slice(0,i) + '×' + Equate_Simplified(input.slice(i+1, LastIndex)) + input.slice(LastIndex+1);
                            end_condition += 1;
                            break;
                        }
                    }
                }
            }
        }
        
        // end the while loop when no more brackets
        if (end_condition == 0) {
            break;
        }
    }
    // return final expression with no brackets
    return input
};

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
    input = CondenseBrackets(input);
    // get final value
    input = Equate_Simplified(input);


    // set number limit for output
    if (input > NUM_MAX) {
        output.html('Math Error');
        return;
    }
     output.html(input);
};

 