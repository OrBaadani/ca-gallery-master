
function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      if (cell === PACMAN || cell === WALL||cell === GHOST) strHTML += '<td class="' + className + ' ' + cell + '"> </td>';
      else strHTML += '<td class="' + className + '"> ' + cell + ' </td>';
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  if (value === PACMAN || value === EMPTY || value === GHOST) {
    elCell.classList.add(value);
    elCell.innerHTML = '';
  }
  else elCell.innerHTML = value;

}

function renderCellGhost(location, color) {
  // debugger
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = `<img src='img/${color}.png'></img>`;

}
function renderCellEmpty(location, value) {
  // debugger
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.classList.remove(value);
  elCell.classList.add('empty');
  elCell.innerHTML = '';

}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function resetColors() {
  gColors = ['orange', 'turquoise', 'pink'];
}
function getRandomColor() {
  return gColors.pop();
}
function shuffle(items) {
  var colors = ['orange', 'turquoise', 'pink'];
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomIntInclusive(0, items.length - 1);
    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}
function playSound(location){
  var audio = new Audio(location);
  audio.play();
}