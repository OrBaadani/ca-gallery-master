'use strict'

var gProjs;
_createProjs();

function _createProj(id, name, title, date, url) {
    if (!url) url = `projs/${id}`;

    return {
        id: id,
        name: name,
        title: title,
        desc: 'lorem ipsum lorem ipsum lorem ipsum',
        url: url,
        // url: `projs/${id}`,
        publishedAt: date,
        labels: ['Matrixes', 'keyboard events']
    }
}



function _createProjs() {

    var projs = [
        _createProj('pacman', 'Pacman', 'title', 'Sept. 2021'),
        _createProj('minesweeper', 'MineSweeper', 'title', 'Oct. 2021', 'https://orbaadani.github.io/MineSweeper/'),
        _createProj('bookshop', 'Book Shop', 'title', 'Oct. 2021')
    ];
    gProjs = projs;
}

function getProjs() {
    var projs = gProjs;
    return projs;
}