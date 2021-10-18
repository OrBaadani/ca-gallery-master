'use strict';
const WALL = 'wall';
const FOOD = '.';
const EMPTY = 'empty';
const SUPERFOOD = '•';
const CHERRY = '🍒';
var gTotalFood = 0;
var gColors = ['orange', 'turquoise', 'pink'];
var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {

    resetColors();
    shuffle(gColors);
    updateScore(0);
    gCollectedFood = 0;
    gTotalFood = 0;
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    // var audioBeg = new Audio('../sound/pacman_beginning.wav');
    // audioBeg.muted = false;
    // audioBeg.play();
    // audioBeg.onended = function() {
    gGame.isOn = true;
    gCherryInterval = setInterval(placeRandomCherry, 15000);
    // };
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
            if (board[i][j] === FOOD) gTotalFood++;
        }

    }
    board[1][SIZE - 2] = SUPERFOOD;
    board[1][1] = SUPERFOOD;
    board[SIZE - 2][1] = SUPERFOOD;
    board[SIZE - 2][SIZE - 2] = SUPERFOOD;
    console.log('total food', gTotalFood);

    return board;

}

// update model and dom
function updateScore(diff) {
    if (diff === 0) gGame.score = 0;
    //model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

}

function endGame() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gIntervalGhosts = null;
    gCherryInterval = null;
}

function gameOver() {

    var audioEnd = new Audio('../sound/pacman_death.wav');
    audioEnd.play();
    console.log('Game Over');
    endGame();
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    elModal.querySelector('h3').innerText = 'You Lose!';
}

function resetGame() {
    init();
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function victory() {
    console.log('Victory');
    endGame();
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    elModal.querySelector('h3').innerText = 'You win!';
}

function superPowerState() {
    var superSound = new Audio('../sound/pacman_intermission.wav');
    superSound.play();
    if (!gPacman.isSuper) return;
    var prevColor = [];
    for (var i = 0; i < gGhosts.length; i++) {
        prevColor.push(gGhosts[i].color);
        gGhosts[i].color = 'blue';
    }
    setTimeout(() => {
        gPacman.isSuper = false;
        var numOfDead = gDeadGhosts.length;
        for (var i = 0; i < numOfDead; i++) {
            gGhosts.push(gDeadGhosts.pop());
            // gGhosts.push(...gDeadGhosts);

        }
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = prevColor[i];
            gGhosts[i].currCellContent = 'empty';
        }
    }, 5000);
}

function placeRandomCherry() {

    var emptyCells = findEmptyCells();
    if (emptyCells.length === 0) return;
    var rndEmptyCellIdx = getRandomIntInclusive(0, emptyCells.length);
    var rndEmptyCell = emptyCells[rndEmptyCellIdx];
    gBoard[rndEmptyCell.i][rndEmptyCell.j] = CHERRY;
    renderCell(rndEmptyCell, CHERRY);


}

function findEmptyCells() {
    var emptyCells = [];
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var elCell = document.querySelector(`.cell${i}-${j}`);
            if (gBoard[i][j] === EMPTY && elCell.classList.contains('empty')) {
                emptyCells.push({ i: i, j: j });
                count++;
            }
        }
    }
    console.log('empty count', count);
    return emptyCells;
}