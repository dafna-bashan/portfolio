'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    var diff = 3 - gGhosts.length;
    if (!diff) return;
    for (var i = 0; i < diff; i++) {
        createGhost(board);
    }
    // TODO: 3 ghosts and an interval
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()
    var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j,
        }
        // TODO: return if cannot move
        // TODO: hitting a pacman?  call gameOver
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL || nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        gameOver()
        return;
    }
    // TODO: update the model
    // TODO: update the DOM
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost
    // TODO: update the model
    // TODO: update the DOM
    ghost.location = nextLocation

    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
}


function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}


function changeGhostColor(ghosts) {
    for (var i = 0; i < ghosts.length; i++) {
        if (gPacman.isSuper) {
            ghosts[i].color = 'blue';
        } else {
            ghosts[i].color = getRandomColor();
        }
    }
}