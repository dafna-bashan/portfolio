'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-modal-close').click(closeModal);

function init() {
    console.log('Started...');
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide();
    renderQuest();
    // TODO: show the quest section
    $('.quest').show();
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    var currQuest = getCurrQuest()
    $('.quest h2').text(currQuest.txt);
}

function onUserResponse(ev) {
    var res = ev.data.ans;
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            // alert('Yes, I knew it!');
            $('.msg').text('Yes, I knew it!');
            $('.quest').hide();
            onRestartGame();
            // TODO: improve UX
        } else {
            // alert('I dont know...teach me!');
            $('.msg').text('I dont know...teach me!');
            // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();
        }
        $('.modal').fadeIn();
        $('body > :not(.modal)').css('opacity', '0.5')
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();

    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    addGuess(newQuest, newGuess, gLastRes);
    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    restartGame();
}

function closeModal() {
    $('.modal').hide();
    $('body > :not(.modal)').css('opacity', '1')
}