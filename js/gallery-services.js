'use strict'

var gProjs;
_createProjs();

function _createProj(id, name, title) {

    return {
        id: id,
        name: name,
        title: title,
        desc: 'lorem ipsum lorem ipsum lorem ipsum',
        url: `projs/${id}`,
        // url: `projs/${id}`,
        publishedAt: Date.now(),
        labels: ['Matrixes', 'keyboard events']
    }
}



function _createProjs() {

    var projs = [
        _createProj('pacman', 'Pacman', 'title'),
        _createProj('minesweeper', 'MineSweeper', 'title'),
        _createProj('bookshop', 'Book Shop', 'title')
    ];
    gProjs = projs;
}

function getProjs() {
    var projs = gProjs;
    return projs;
}