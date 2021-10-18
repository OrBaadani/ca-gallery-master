'use strict';
const GHOST = 'ghost';
var gGhosts;
var gIntervalGhosts;
var gDeadGhosts = [];


// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);

    board[ghost.location.i][ghost.location.j] = GHOST;

}
function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        renderCellGhost(gGhosts[i].location, gGhosts[i].color);
    }
}

// : loop through ghosts
function moveGhosts() {
    if(!gGame.isOn) return;
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
        renderCellGhost(gGhosts[i].location, gGhosts[i].color);

    }
}
// : figure out moveDiff, nextLocation, nextCell
function moveGhost(ghost) {
    // { i: 0, j: 1 }
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // : return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    // : hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        // if (gPacman.isSuper) {
        //     gDeadGhosts.push(removeGhost(ghost.location.i, ghost.location.j));
        // }
        // else {
            gameOver();
            return;
        }
    // }
    // : moving from corrent position:
    // : update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // : update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // : Move the ghost to new location
    

    ghost.currCellContent = nextCellContent
    ghost.location = nextLocation;
    // : update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST;
    // : update the DOM
    

    renderCellGhost(nextLocation, ghost.color);

    // renderGhostColor(nextLocation,ghost.color);

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 };
    } else if (randNum <= 50) {
        return { i: -1, j: 0 };
    } else if (randNum <= 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`;
}

function removeGhost(locationI, LocationJ) {
    for (var idx = 0; idx < gGhosts.length; idx++) {
        if (gGhosts[idx].location.i === locationI && gGhosts[idx].location.j === LocationJ){
            // gBoard[locationI][LocationJ] = EMPTY;
            if(gGhosts[idx].currCellContent===FOOD)gCollectedFood++;
            return gGhosts.splice(idx, 1)[0];
        }    
    }
}