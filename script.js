'use strict';

const bookTable = document.getElementById('booktable');

const form = document.getElementById('mainform');
form.addEventListener('submit', addBookToLibrary);

let myLibrary = [];
let idCounter = 3;

class BookClass {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

function populateTable() {
  if (localStorage.getItem('localLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('localLibrary'));
    console.log('Local library loaded');
  } else {
    myLibrary.push(new BookClass('1984', 'George Orwell', 525, true, 0));
    myLibrary.push(
      new BookClass('What Lies Benight', 'J. Earl Wright', 338, true, 1)
    );
    myLibrary.push(
      new BookClass('THe Queens Gambit', 'M. Carroll Knight', 647, false, 2)
    );
    console.log('No local library found');
  }
  updateTable();
}

window.onload = populateTable();

function addBookToLibrary(e) {
  e.preventDefault();
  const title = document.getElementById('booktitle').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const alreadyRead = document.getElementById('alreadyread').checked;
  myLibrary.push(new BookClass(title, author, pages, alreadyRead, idCounter++));
  localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
  updateTable();
  form.reset();
}

function updateTable() {
  const jsTable = document.getElementById('js-table');
  jsTable.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    let newRow = jsTable.insertRow(-1);

    let titleCell = newRow.insertCell(-1);
    let titleText = document.createTextNode(myLibrary[i].title);
    titleCell.appendChild(titleText);

    let authorCell = newRow.insertCell(-1);
    let authorText = document.createTextNode(myLibrary[i].author);
    authorCell.appendChild(authorText);

    let pagesCell = newRow.insertCell(-1);
    let pagesText = document.createTextNode(myLibrary[i].pages);
    pagesCell.appendChild(pagesText);

    let readCell = newRow.insertCell(-1);
    if (myLibrary[i].read == false) {
      readCell.innerHTML =
        '<button type="button" class="read-unread-button">❌</button>';
    } else {
      readCell.innerHTML =
        '<button type="button" class="read-unread-button">✔️</button>';
    }

    let deleteCell = newRow.insertCell(-1);
    deleteCell.innerHTML =
      '<button type="button" class="delete-button">🗑️</button>';
  }
}

bookTable.addEventListener('click', respondToClick);

function respondToClick(e) {
  console.log(e);
  const targetBook = e.target.parentNode.parentNode.childNodes[0].innerText;
  console.log(targetBook);

  if (e.target.innerHTML == '🗑️') {
    deleteBook(findBookInArray(targetBook));
    console.log('trash can!');
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    updateTable();
  }
  if (e.target.classList.contains('read-unread-button')) {
    markReadUnread(findBookInArray(targetBook));
    console.log('Read or unread?');
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
    updateTable();
  }
}

function findBookInArray(title) {
  if (myLibrary.length === 0 || myLibrary === null) {
    return;
  }
  for (let book of myLibrary) {
    if (book.title === title) {
      return myLibrary.indexOf(book);
    }
  }
}

function deleteBook(arrayIndexToBeDeleted) {
  myLibrary.splice(arrayIndexToBeDeleted, 1);
}

function markReadUnread(arrayIndex) {
  if (myLibrary[arrayIndex].read == false) {
    myLibrary[arrayIndex].read = true;
    return;
  } else {
    myLibrary[arrayIndex].read = false;
  }
}
