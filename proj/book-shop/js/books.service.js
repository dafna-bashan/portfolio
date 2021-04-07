'use strict'

const STORAGE_KEY = 'books';
var gBooks = _createBooks();
var gSortBy = 'name';

// _createBooks();

function getBooks() {
    // gBooks = _createBooks();
    return gBooks;
}

function _createBook(title, price, image = 4) {
    return {
        id: makeId(),
        title,
        price,
        image,
        desc: makeLorem(),
        rate: 0
    };
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [
            { id: makeId(), title: 'Harry Potter and the Sorcerer\'s Stone', price: 50, image: 1, desc: makeLorem(), rate: 0 },
            { id: makeId(), title: 'Harry Potter and the Chamber of Secrets', price: 30, image: 2, desc: makeLorem(), rate: 0 },
            { id: makeId(), title: ' Harry Potter and the Prisoner of Azkaban', price: 40, image: 3, desc: makeLorem(), rate: 0 },
        ];
        gBooks = books;
        _saveBooksToStorage();
    }
    return books;
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}

function deleteBook(bookId) {
    var bookId = gBooks.findIndex(function(book) {
        return bookId === book.id;
    });
    gBooks.splice(bookId, 1);
    _saveBooksToStorage();
}

function addBook(title, price) {
    var book = _createBook(title, price);
    gBooks.unshift(book);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId);
    // var bookId = gBooks.findIndex(function(book) {
    //     return book.id === bookId;
    // })
    // gBooks[bookId].price = newPrice;
    book.price = newPrice;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id;
    })
    return book;
}

function changeBookRate(operator, bookId) {
    var book = getBookById(bookId);
    if (operator === '+') {
        if (book.rate === 10) return;
        book.rate++;
    } else {
        if (book.rate === 0) return;
        book.rate--;
    }
    _saveBooksToStorage();
}


function setSort(sortBy) {
    gSortBy = sortBy;
}

function getUsersForDisplay() {
    gUsers = loadFromStorage(STORAGE_KEY);
    return gUsers;
}

function getBooksSorted(books) {
    switch (gSortBy) {
        case 'Title':
            books.sort(compareTxt);
            break;
        case 'Price':
            books.sort(function(a, b) {
                return a.price - b.price;
            });
            break;
    }
    return books;
}


function compareTxt(a, b) {
    var txtA = a.title.toUpperCase();
    var txtB = b.title.toUpperCase();

    var comparison = 0;
    if (txtA > txtB) {
        comparison = 1;
    } else if (txtA < txtB) {
        comparison = -1;
    }
    return comparison;
}