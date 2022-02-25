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