let type = "";
let word = "";
let word_to_remove = 2;
let w1_index = -1;
let w2_index = -1; 
let filled = 0;
// let hint = "";

let hint_times = 1;

function addRandomWord(t) {
    type = t;

    index = Math.floor(Math.random() * t.length);
    word = t[index];
    findBlankIndex(word)
}

function findBlankIndex(w) {
    if (word_to_remove === 2) {
        while (w1_index === w2_index || w1_index === -1 || w2_index === -1) {
            w1_index = Math.floor(Math.random() * w.length);
            w2_index = Math.floor(Math.random() * w.length);
        }
        
        addBlanks(w, w1_index, w2_index);
    }
}


function addBlanks(w, w1, w2) {
    let chars = w.split('');
    chars[w1] = '<input type="text" class="word-input" input-id="1" maxlength="1"><span id="value-1" class="value"></span>';
    chars[w2] = '<input type="text" class="word-input" input-id="2" maxlength="1"><span id="value-2" class="value"></span>';
    w = chars.join('');
    $('#main-word').html(w);
    const inputElements = $('#main-word').find('input.word-input');

    inputElements.on('input', function(e) {
        if($('#main-word').hasClass('jerk')){
            $('#main-word').removeClass('jerk')
        }
        let input_id = $(this).attr('input-id');
        $(`#value-${input_id}`).html((this.value).toUpperCase());
        if (this.value.length === 1) {
            const currentIndex = inputElements.index(this);
            filled++;
            if (currentIndex === 0) {
                inputElements.eq(1).focus();
            }
        }
        else{
            filled--;
            
        }

        if(filled == 2) {
            check();
        }
        console.log(filled)
    });
    inputElements.eq(0).focus();
    
    inputElements.eq(1).on('keydown', function(e) {
        if (e.which === 8 && this.value.length === 0) {
            inputElements.eq(0).focus();
        }
    });
}

$('.hint').on('click', function() {
    hint();
});

function hint() {
   let hint = easy_hints[index];
  $('.hintbar').html(hint)
}
function check() {
    let attempted = $('#main-word').text();
    console.log(attempted);
    if(attempted == word) {
        addRandomWord(easy)
        removeWord(easy);
        reset();
    }
    else {
        $('#main-word').addClass('jerk')
    }
}

function removeWord(t) {
    t.splice(index, 1)
}
function reset() {
    filled = 0;
    $('.hintbar').html('')
}




addRandomWord(easy);