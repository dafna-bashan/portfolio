'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '*';
const CHERRY = '🍒';


var gBoard = buildBoard();
var gModal = document.querySelector('.modal');
var gFoodCount;
var gCherryInterval;

var gGame = {
    score: 0,
    isOn: false,
    isWin: false
};

function init() {
    gGhosts = [];
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gFoodCount = getFoodCount(gBoard);
    gGame.isOn = true;
    gGame.score = 0;
    gGame.isWin = false;
    gModal.style.display = 'none';
    document.querySelector('h2 span').innerText = gGame.score;
    gCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && (j === 1 || j === SIZE - 2) ||
                i === SIZE - 2 && (j === 1 || j === SIZE - 2)) {
                board[i][j] = POWER_FOOD;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    // TODO: update model and dom
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    // TODO
    gModal.style.display = 'block';
    if (gGame.isWin) gModal.innerHTML = '<h3>Win!!!</h3> <button onclick="init()">Play again</button>';
    else gModal.innerHTML = '<h3>Game Over</h3> <button onclick="init()">Play again</button>';
}

function getFoodCount(board) {
    var count = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] !== WALL) count++;
        }
    }
    return count - 1;
}

function addCherry() {
    var emptyCells = getEmptyCells(gBoard);
    var selectedCell = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)];
    gBoard[selectedCell.i][selectedCell.j] = CHERRY;
    renderCell(selectedCell, CHERRY);
    gFoodCount++;
}

function getEmptyCells(board) {
    var emptyCells = [];
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[i].length - 1; j++) {
            var pos = { i, j };
            if (board[i][j] === EMPTY) {
                emptyCells.push(pos);
            }
        }
    }
    return emptyCells;
}