'use strict';

var NUM = 16;
var gNums = createNums(NUM);
var currNum;
// var elBtn = document.querySelector('.btn');
var elmsg = document.querySelector('.msg');
var elNextNum = document.getElementById('next-num');
var elBtns = document.querySelector('.btn-difficult');


function init() {
    reset();
    createButtons();
    // elBtn.innerHTML = '';
    elmsg.innerHTML = '';
    currNum = 1;
    gNums = createNums(NUM);
    renderBoard(NUM);
}

function changeNum(elBtn) {
    if (elBtn.innerHTML === 'Easy') NUM = 16;
    if (elBtn.innerHTML === 'Hard') NUM = 25;
    if (elBtn.innerHTML === 'Extreme') NUM = 36;
    init();
}

function createButtons() {
    elBtns.innerHTML = '<button onclick="changeNum(this)">Easy</button>' +
        '<button onclick="changeNum(this)">Hard</button>' +
        '<button onclick="changeNum(this)">Extreme</button>';
}

function createNums(num) {
    var nums = [];
    for (var i = 0; i < num; i++) {
        nums.push(i + 1);
    }
    return nums;
}

function renderBoard(num) {
    var row = Math.sqrt(num);
    var strHTML = '';
    for (var i = 0; i < row; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < row; j++) {
            var cell = drawNum();
            // var className = cell ? 'marked' : ''
            strHTML += `<td onclick="cellClicked(this)">${cell}</td>`
                // strHTML += `<td data-i=${i} data-j=${j} onclick="cellClicked(this,${i},${j})" class="${className}">${cell}</td>`
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    elNextNum.innerHTML = `Next Number: ${currNum}`
}


function cellClicked(elCell) {
    //if its not the next num return
    if (currNum === 1) {
        start();
        elBtns.innerHTML = '';
    }
    if (+elCell.innerHTML !== currNum) return
    else {
        elCell.style.backgroundColor = 'rgb(0, 119, 119)';
        if (currNum === NUM) return win();
        currNum++;
        elNextNum.innerHTML = `Next Number: ${currNum}`
    }
}


function win() {
    pause();
    elmsg.innerHTML = '<h1>Win!!!</h1>';
    createButtons();
    // elBtn.innerHTML = '<button onclick="init();">Restart Game</button>';
}

function drawNum() {
    var randomIdx = getRandomIntInclusive(0, gNums.length - 1);
    var tempNum = gNums[randomIdx];
    gNums.splice(randomIdx, 1);
    return tempNum;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// https://tinloof.com/blog/how-to-build-a-stopwatch-with-html-css-js-react-part-2/
// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("time").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
}

function pause() {
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
}