let index = -1;
let word = "";
let word_to_remove = 2;
let w1_index = -1;
let w2_index = -1;
let filled = 0;
let hint_left = 3;
let score = 0;
let start = false;
let time = 0;

function addRandomWord() {
    index = Math.floor(Math.random() * words.length);
    word = words[index].word;
    findBlankIndex(word);
    $('.about').html(words[index].about_word);
    console.log("Random" + time)

}

function findBlankIndex(w) {
    if (word_to_remove === 2) {
        while (w1_index === w2_index || w1_index === -1 || w2_index === -1) {
            w1_index = Math.floor(Math.random() * w.length);
            w2_index = Math.floor(Math.random() * w.length);
        }
        addBlanks(w, w1_index, w2_index);
    }
    console.log("Find Blank" + time)
}

function addBlanks(w, w1, w2) {
    let chars = w.split('');
    chars[w1] = '<input type="text" class="word-input" input-id="1" maxlength="1"><span id="value-1" class="value"></span>';
    chars[w2] = '<input type="text" class="word-input" input-id="2" maxlength="1"><span id="value-2" class="value"></span>';
    w = chars.join('');
    $('#main-word').html(w);
    const inputElements = $('#main-word').find('input.word-input');
    inputElements.on('input', function (e) {
        if (!start) {
            start = true;
            updateTime();
        }
        if ($('#main-word').hasClass('jerk')) {
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
        else {
            filled--;
        }
        if (filled == 2) {
            check();
        }
    });
    inputElements.eq(0).focus();
    inputElements.eq(1).on('keydown', function (e) {
        if (e.which === 8 && this.value.length === 0) {
            inputElements.eq(0).focus();
        }
    });
    console.log("Add" + time)
}

$('.hint').on('click', function () {
    if ($('.hintbar').html() == '') {
        hint_left--;
    }
    if (hint_left >= 0) {
        $('.hintbar').html(words[index].word)
        renderHint();
    }
    else {
        $('.hintbar').html("No hint left!");
    }
    
});

function check() {
    console.log("Check" + time)
    let attempted = $('#main-word').text();
    if (attempted == word) {
        removeWord();
        reset();
        score++;
        renderScore();
        if (words.length == 0 || score > 100 || time > 300) {
            gameOver();
        }
        else {
            addRandomWord();
        }
    }
    else {
        $('#main-word').addClass('jerk')
    }
}

function removeWord() {
    words.splice(index, 1)
}

function reset() {
    filled = 0;
    $('.hintbar').html('')
    w1_index = -1;
    w2_index = -1;
}

function renderHint() {
    $('#hints').html(hint_left)
}

function renderScore() {
    $('#score').html(score)
}

function updateTime() {
    let timeInterval = setInterval(() => {
        if (start) {
            $('#time').html(time);
            time++;
        }
        else {
            clearInterval(timeInterval);
        }
    }, 1000);
}
function gameOver() {
    updateTime();
    start = false;
    emptyTimer();
    $('.main').addClass('off')
    $('.results').addClass('show')
    $('#score_result').html(score)
    $('#time_result').html(time)
}
function emptyTimer() {
    $('#time').html('0')
}
$('#restart').click(function () {
    window.location.reload()
})

addRandomWord();
