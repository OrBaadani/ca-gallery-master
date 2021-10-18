'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    getBooksToShow();
    var viewType = getViewType();
    var otherViewType;
    const books = getBooks();
    var keys = Object.keys(gBooks[0]);
    var strTh = '<tr>';
    if (viewType === 'table') {
        otherViewType = 'cards';
        for (const property in books[0]) {
            if (property === 'desc' || property === 'rate') strTh += '';
            else
                strTh += `<th onclick="onSetSortBy('${property}')">${property}</th>`;
        }
        strTh += `<th>Actions</th></tr>`;
        var strHtmls = books.map(function(book) {
            var str = `<tr>`;
            for (const property in book) {
                if (property === 'desc' || property === 'rate') str += '';
                else
                    str += `<td>${book[property]}</td>`;
            }
            str += `<td><button onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>`;
            str += `</tr>`;
            return str;
        });
        strHtmls = `<table>
        <tbody class="book-table">  ${strTh+strHtmls.join('')}  </tbody>
        </table>`;
    } else if (viewType === 'cards') {
        otherViewType = 'table';
        var strHtmls = books.map(function(book) {

            var str = `<article class="book-preview">
                <span class="delete-btn" onclick="onRemoveBook('${book.id}')">X</span>
                    <img src="${book.imgUrl}">
                    <div class="card-body">
                    <h4>${book.name}</h4>
                    <p><span>${book.price}</span>₪</p>
                    <button onclick="onReadBook('${book.id}')">About</button>
                    <button onclick="onUpdateBook('${book.id}')">Update</button>
                    </div>
                </article>`
            return str;
        });
        strHtmls = strHtmls.join('');
    }

    var container = document.querySelector('.books-container');
    container.innerHTML = strHtmls;

    container.classList.add(viewType);
    container.classList.remove(otherViewType);


}

function onPage(direction) {
    var pageIdx;
    if (direction === 'next') pageIdx = nextPage();
    else pageIdx = previousPage();
    if (pageIdx < 0) return
    document.querySelector('.page input').value = pageIdx + 1;
    renderBooks();
}


function onRemoveBook(bookID) {
    deleteBook(bookID);
    renderBooks();
}

function onAddBook() {
    var name = prompt('Enter The Book\'s name');
    var price = +prompt('Enter The price');
    addBook(name, price);
    renderBooks();
}

function onUpdateBook(bookID) {
    var bookPrice = +prompt('Enter The Book\'s new price');
    updateBook(bookID, bookPrice);
    renderBooks();
}

function onReadBook(bookID) {
    var book = getBookById(bookID);
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('h6 span').innerText = book.price;
    elModal.querySelector('img').src = book.imgUrl;
    elModal.querySelector('div').innerHTML = `<button onclick="onChangeRate('up','${book.id}')">+</button><input type="text" disabled/><button onclick="onChangeRate('down','${book.id}')">-</button>`;
    elModal.querySelector('input').value = book.rate;
    elModal.querySelector('p').innerText = book.desc;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onChangeView(viewType) {
    changeViewType(viewType);
    renderBooks();
}

function onChangeRate(rateDirection, bookID) {

    var currRate = getBookById(bookID).rate;

    if (rateDirection === 'up') {
        if (currRate === 10) return
        currRate++;
    } else if (rateDirection === 'down') {
        if (currRate === 0) return
        currRate--;
    }

    document.querySelector('.modal input').value = currRate;
    updateRate(bookID, currRate);

}

function onSetSortBy(sortBy) {

    console.log('Sorting By:', sortBy);
    setSorter(sortBy);
    renderBooks();

}