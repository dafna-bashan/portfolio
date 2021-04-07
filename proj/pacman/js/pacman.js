'use strict'
const PACMAN = '😷';

var gPacman;


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // TODO: return if cannot move
        // TODO: hitting a ghost?  call gameOver
    if (nextCell === WALL) return;

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            //remove ghost from array 
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                    if (gGhosts[i].currCellContent === FOOD) {
                        gFoodCount--;
                    }
                    gGhosts.splice(i, 1);
                }
            }
            // console.log(gGhosts)
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY);
            return;
        }
    } else {
        if (nextCell === FOOD) {
            updateScore(1);
        } else if (nextCell === POWER_FOOD) {
            if (gPacman.isSuper) return;
            updateScore(1);
            gPacman.isSuper = true;
            changeGhostColor(gGhosts);
            setTimeout(function() {
                gPacman.isSuper = false;
                changeGhostColor(gGhosts);
                createGhosts(gBoard);
            }, 5000);
        } else if (nextCell === CHERRY) {
            updateScore(10);
        }
        if (nextCell !== EMPTY) gFoodCount--;
        console.log(gFoodCount);
    }
    if (!gFoodCount) {
        gGame.isWin = true;
        gameOver();
    }
    // TODO: update the model
    // TODO: update the DOM
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)
        // TODO: Move the pacman
        // TODO: update the model
    gPacman.location = nextLocation

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, PACMAN)
}



function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
                break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }

    return nextLocation;
}