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
            if ((input[i] == 's' && input[i+1] == 'i') || (input[i] == 'c' && input[i+1] == 'o') || input[i] == 't' || input[i] == 'l') {
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
       
        // check whether inside bracket only has sin() cos() or tan(), if no, then remove brackets?
        let specialfunctionscheck = 0;
        let normalbracketscheck = 0;
        
        
        for (let i=0; i < input.length; i++) {
            if (input[i] == '(') {
                var temp = "";
                let bool = true;
                
                // check if product brackets exist
                if (!isNaN(input[i-1])) {
                    productbracketcheck += 1;
                }

                // prevent end condition where there are still more normal brackets
                if (input[i-1]!='n' && input[i-1]!='s' && input[i-1]!='g' && isNaN(input[i-1])) {
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
                
                    // check for sin() etc
                    if ((input[x]=='s' && input[x+1]=='i') || (input[x]=='c' && input[x+1]=='o') || (input[x]=='t'&&input[x+1]=='a') || input[x]=='l') {
                        specialfunctionscheck += 1;
                    }

                    // check for normal brackets
                    if (input[x]=='(' && (input[x-1]!='n' && input[x-1]!='s' && input[x-1]!='g')) {
                        normalbracketscheck += 1;                    
                    }


                     // get matching ')' for input[i] == '()
                     if (input[x] == ')' && (TempCount1 == TempCount2)) {
                        LastIndex = x;
                        break;
                    }

                    temp += input[x];
                    
                }
                
                // check whether temp has special brackets only
                if (specialfunctionscheck > 0 && normalbracketscheck == 0) {
                    input = input.slice(0,i+1) + CondenseSpecialFunctions(temp) + input.slice(LastIndex);
                    break;
                }


                // if temp includes ( ) bool = false, then we skip to next element in expression
                if (temp.includes('(') || temp.includes(')') && productbracketcheck>0) {
                    bool = false;
                }
        
                
                // extra NaN to prevent mistaking normal bracket for multiplication brackets
                if (bool) {
                // use EquateSimplified function
                    if (productbracketcheck) {
                        // filter out all product brackets first
                        console.log(input);
                        input = BracketMultiply(input);
                        console.log(input);
                        break;
                    }
                    // if log sin cos tan or e dont remove brackets
                    else if (input[i-1]=='n' || input[i-1]=='s' || input[i-1]=='^' || input[i-1]=='g' || input[i-1]==')' ||!isNaN(input[i-1])) {
                        input = input.slice(0,i+1) + Equate_Simplified(temp) + input.slice(LastIndex);
                        console.log(input);
                        break;
                    }
                    // normal brackets
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
                let TempCount1 = 1;
                let TempCount2 = 0;

                // find the matching bracket
                for (let x = i+1; x < input.length; x++) {
                    if (input[x] == '(') {
                        TempCount1 += 1;
                    }
                    else if (input[x] == ')') {
                        TempCount2 += 1;
                    }
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