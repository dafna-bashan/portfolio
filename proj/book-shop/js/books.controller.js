'use strict';

function onInit() {
    renderBooks();
}


function renderBooks() {
    var books = getBooks();
    books = getBooksSorted(books);
    var strHTML = '';
    books.forEach(function(book) {
        strHTML += `<tr><td>${book.id}</td>`;
        strHTML += `<td><img src="./img/${book.image}.jpeg"></td>`
        strHTML += `<td>${book.title}</td><td>${book.price}$</td><td><button onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button onclick="renderPriceModal('${book.id}')">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td></tr>`
    });
    var elContainer = document.querySelector('tbody');
    elContainer.innerHTML = strHTML;
}


function onRemoveBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}


function onAddBook() {
    var elTitle = document.querySelector('input[name=title]');
    var elprice = document.querySelector('input[name=price]');
    addBook(elTitle.value, elprice.value);
    elTitle.value = '';
    elprice.value = '';
    renderBooks();
}
// function onAddBook() {
//     var title = prompt('Book\'s title:');
//     var price = +prompt('Book\'s price:');
//     addBook(title, price);
//     renderBooks();
// }

function onUpdateBook(bookId) {
    // var newPrice = +prompt('Book\'s new price:');
    var newPrice = +document.querySelector('.price-input').value;
    updateBook(bookId, newPrice);
    onCloseModal()
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('pre').innerText = book.title + ' | ' + book.price + ' $';
    elModal.querySelector('.image').innerHTML = `<img src="./img/${book.image}.jpeg">`;
    elModal.querySelector('p').innerText = book.desc;
    elModal.querySelector('.rate-container').innerHTML = `Rate: <button onclick="onChangeRate(this.innerText, '${book.id}')">-</button>
    ${book.rate}<button onclick="onChangeRate(this.innerText, '${book.id}')">+</button>`;
    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
    document.querySelector('.price-modal').hidden = true;
}

function onChangeRate(operator, bookId) {
    changeBookRate(operator, bookId);
    onReadBook(bookId);
}

function onSort(sortBy) {
    setSort(sortBy);
    renderBooks();
}

function renderPriceModal(bookId) {
    var strHTML = `<input class="price-input" type="number"></input>
    <button onclick="onUpdateBook('${bookId}')">Update Price</button>
    <button class="close" onclick="onCloseModal()">X</button>`
    var elModal = document.querySelector('.price-modal');
    elModal.innerHTML = strHTML;
    elModal.hidden = false;
}

// var gPageSize
// var gPageIdx

// function setPage(diff) {
//    if (pageid + diff> gBooks.length/ pagesize)   return gpageid;
//    if(page id + diff <0) return gpageidx;
//    gpageidx +=diff;
//    return
// }