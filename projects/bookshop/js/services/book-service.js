'use strict'
const KEY = 'books';
var gBooks;
var gView = 'table';
var gSortBy = '';
const PAGE_SIZE = 8;
var gPageIdx = 0;

_createBooks();

function setSorter(sortBy) {
    gSortBy = sortBy;
}

function nextPage() {
    if (gPageIdx < 0) { gPageIdx = 0 }

    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx--;
    return gPageIdx;
}

function previousPage() {
    gPageIdx--;
    return gPageIdx;
}

function getBooksToShow() {
    if (gSortBy === 'id') return gBooks.sort(_compareID);
    else if (gSortBy === 'name') return gBooks.sort(_compareName);
    else if (gSortBy === 'price') return gBooks.sort(_comparePrice);
    else return gBooks;

}

function _comparePrice(num1, num2) {
    return num1.price - num2.price;
}

function _compareName(str1, str2) {
    if (str1.name.toUpperCase() > str2.name.toUpperCase()) return 1;
    if (str2.name.toUpperCase() > str1.name.toUpperCase()) return -1;
    return 0;
}

function _compareID(str1, str2) {
    if (str1.id.toUpperCase() > str2.id.toUpperCase()) return 1;
    if (str2.id.toUpperCase() > str1.id.toUpperCase()) return -1;
    return 0;
}



function updateRate(bookID, currRate) {
    var book = gBooks.find(function(book) {
        return book.id === bookID;
    })
    book.rate = currRate;
    _saveBooksToStorage();
}

function getViewType() {
    return gView;
}

function changeViewType(type) {
    return gView = type;
}

function getBookById(bookID) {
    return gBooks.find(function(book) {
        return book.id === bookID;
    });
}

function deleteBook(bookID) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookID === book.id;
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function updateBook(bookID, newPrice) {
    var book = gBooks.find(function(book) {
        return book.id === bookID;
    })
    book.price = newPrice;
    _saveBooksToStorage();
}

function getBooks() {
    var books = gBooks;
    const fromIdx = gPageIdx * PAGE_SIZE;
    books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
    return books;
}

function addBook(name, price) {
    gBooks.unshift(_createBook(name, '', price));
    _saveBooksToStorage();
}

function _createBook(name, imgUrl = '', price = 50) {

    return {
        id: _makeId(),
        name: name,
        imgUrl: imgUrl,
        price: price,
        rate: 0,
        desc: _makeLorem(50)
    }
}

function _createBooks() {

    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [
            // book-shop\img\alice.jpg

            _createBook('Moby Dick', 'img/moby.jpg', 100),
            _createBook('War and Peace', 'img/war.jpg', 95),
            _createBook('Pride and Prejudice', 'img/pride.jpg', 60),
            _createBook('Anna Karenina', 'img/anna.jpg'),
            _createBook('Alice\'s Adventures in Wonderland', 'img/alice.jpg', 78),
            _createBook('Catch-22', 'img/catch.jpg', 70),
            _createBook('The Great Gatsby', 'img/gatsby.jpg', 62),
            _createBook('Hamlet', 'img/hamlet.jpg', 36),
            _createBook('The Odyssey', 'img/odyssey.jpg', 55)
        ];
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}