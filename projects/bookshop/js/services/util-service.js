'use strict'


// function renderBooks() {
//     getBooksToShow();
//     var viewType = getViewType();
//     const books = getBooks();
//     var keys = Object.keys(gBooks[0]);
//     var strTh = '<tr>';
//     for (const property in books[0]) {
//         if (property === 'desc' || property === 'rate') strTh += '';
//         else
//             strTh += `<th onclick="onSetSortBy('${property}')">${property}</th>`;
//     }
//     strTh += `<th>Actions</th>`;
//     strTh += '</tr>';
//     const strHtmls = books.map(function(book) {
//         if (viewType === 'cards') {
//             var str = `<article class="book-preview">
//             <span class="delete-btn" onclick="">X</span>
//                 <img src="${book.imgUrl}">
//                 <div class="card-body">
//                 <h4>${book.name}</h4>
//                 <p><span>${book.price}</span>₪</p>
//                 </div>
//             </article>`
//         } else if (viewType === 'table') {

//             var str = `<tr>`;
//             for (const property in book) {
//                 if (property === 'desc' || property === 'rate') str += '';
//                 else
//                     str += `<td>${book[property]}</td>`;
//             }
//             str += `<td><button onclick="onReadBook('${book.id}')">Read</button></td>
//         <td><button onclick="onUpdateBook('${book.id}')">Update</button></td>
//         <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>`;
//             str += `</tr>`;

//         }
//         return str;

//     })
//     document.querySelector('.book-table').innerHTML = strTh + strHtmls.join('');
// }