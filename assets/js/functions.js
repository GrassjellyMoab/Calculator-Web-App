/*----------------- Global Variables needed -----------------*/
// valid Brackets
var pi = Math.PI;
var operators = ['+','-','x','÷'];



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
        // take into account -ve sign at first index
        if (i==0 && (expression[i] == '-') || (expression[i]=='-' && operators.includes(expression[i-1]))||!operators.includes(expression[i])) {
            arr[arr_index_counter] += expression[i];
        }

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
    var SpecialFunctions = ['log', 'sin', 'cos', 'tan', 'e'];
    // look for most inner 
    let bool;
    let temp = "";
    let LastIndex;
    var Counter = 0;
    for (let i=0; i<input.length;i++) {
        // if sin cos tan log or e
        temp = "";
        if ((input[i] == 's' && input[i+1] == 'i') || (input[i] == 'c' && input[i+1] == 'o') || input[i] == 't' || input[i] == 'l') {
            bool = true;
            Counter = 1;
            let TempCount1 = 1;
            let TempCount2 = 0;
            // get the matching pair of most outer ()
            for (let x=i+4; x < input.length; x++) {
                if (input[x] == '(') {
                    TempCount1 += 1;
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
            // // check whether its a special ftn with special ftns inside
            for (let z=0; z<SpecialFunctions.length; z++) {
                if (temp.includes(SpecialFunctions[z])) {
                    bool = false;
                }
            }
            if (bool) {
                let second_part = input.slice(LastIndex+1);
                let first_part = input.slice(0,i);
                if (input[i] == 's') {
                    input = first_part + sin(temp) + second_part;
                }
                else if (input[i] == 'c') {
                    input = first_part + cos(temp) + second_part;
                }
                else if (input[i] == 't') {
                    input = first_part + tan(temp) + second_part;
                }
                else if (input[i] == 'l') {
                    input = first_part + log(temp) + second_part;
                }
                temp = 0;
            }
        }
    }
    if (Counter == 0) {
        return input;
    }
    CondenseSpecialFunctions(input); // subjected to changes
}

    
    
function Condense_Bracket_Values(input) {
    var end_condition;
    var test = 0;

    // get index of brackets and form the pairs then condense them eg (((9+9)*8)+9) => ((18*8)+9) => (144+9) => 153
    while (true) {
        test += 1;
        end_condition = 0;
        for (let i=0; i < input.length; i++) {
            if (input[i] == '(') {
                var temp = "";
                let bool = true;
                // prevent send condition where there are no more normal brackets
                if (input[i-1]!='n' && input[i-1]!='s' && input[i-1]!='^' && input[i-1]!='g' && isNaN(input[i-1])) {
                    end_condition += 1;
                }

                let TempCount1 = 1;
                let TempCount2 = 0;
                for (let x=i+1; x < input.length; x++) {
                    if (input[x] == '(') {
                        TempCount1 += 1;
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
            
                if (temp.includes('(') || temp.includes(')')){
                    bool = false;
                }
        
                // extra NaN to prevent mistaking normal bracket for multiplication brackets
                if (bool || !isNaN(input[i-1])) {
                // use EquateSimplified function
                    // if log sin cos tan or e dont remove brackets
                    if (input[i-1]=='n' || input[i-1]=='s' || input[i-1]=='^' || input[i-1]=='g' || !isNaN(input[i-1])) {
                        input = input.slice(0,i+1) + Equate_Simplified(temp) + input.slice(LastIndex);
                    }
                    else {
                        input = input.slice(0,i) + Equate_Simplified(temp) + input.slice(LastIndex+1);
                    }
                }
            }
        }

        // end the while loop if no more of those brackets
        if (end_condition == 0 || test == 100) {
            break;
        }
    }
    // so only outerfunction can do the return thing so i need to edit the input tbh
    return input;
}

/*----------------- Main Function -----------------*/
function Results() {
    // variable to leave function if true
    var output = $('#output-value');
    var input = $('#input').html();

    // replace π with number
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


    // Condense all Brackets
    // check for operators and use them (prioritise geometric operators)
    // CondenseSpecialFunctions(input);
    input = Condense_Bracket_Values(input);
    console.log(input);
    // product brackets
    

    // condense sin cos etc

    // equate all of em
    }

 