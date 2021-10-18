'use strict';
const PACMAN = 'pacman';

var gCollectedFood = 0;
var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // : use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // : return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === FOOD) {
        updateScore(1);
        gCollectedFood++;
    }
    if (nextCellContent === SUPERFOOD) {
        if (gPacman.isSuper) return;
        updateScore(10);
        gCollectedFood++;
        gPacman.isSuper = true;
        superPowerState();


    }
    if (nextCellContent === CHERRY) {
        updateScore(10);
        var cherrySound = new Audio('../sound/pacman_eatfruit.wav');
        cherrySound.play();
    }
    // : hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if (gPacman.isSuper) {
            var removedGhost = removeGhost(nextLocation.i, nextLocation.j);
            gDeadGhosts.push(removedGhost);
        }
        else {
            gameOver();
            return
        };
    }

    if (gCollectedFood === gTotalFood - 1) victory();
    // : moving from corrent position:
    // : update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // : update the DOM
    renderCellEmpty(gPacman.location, PACMAN);
    // : Move the pacman to new location
    gPacman.location = nextLocation;
    // : update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN;
    // : update the DOM
    renderCell(nextLocation, PACMAN);
    console.log('count', gCollectedFood);
}


function getNextLocation(ev) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    var prevLocation=document.querySelector(`.cell${gPacman.location.i}-${gPacman.location.j}`);
    var transform = 'none';
    prevLocation.style.transform = transform;
    // : figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            transform='rotate(90deg)';
            nextLocation.i++;
            break;
        case 'ArrowUp':
            transform='rotate(270deg)';
            nextLocation.i--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        case 'ArrowLeft':
            transform='scaleX(-1)';
            nextLocation.j--;
            break;
    }
    var elCellPacman = document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`);
    elCellPacman.style.transform = transform;

    return nextLocation;
}