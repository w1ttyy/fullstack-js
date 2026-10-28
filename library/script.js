const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const readStatus = this.read ? "already read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function displayBooks() {
  libraryDiv.replaceChildren();

  myLibrary.forEach((book) => {
    // card
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    if (book.read) bookDiv.classList.add("is-read");

    // title + author
    const bookTitleHeading = document.createElement("h2");
    bookTitleHeading.textContent = book.title;

    const bookAuthorP = document.createElement("p");
    bookAuthorP.classList.add("book-author");
    bookAuthorP.textContent = "by " + book.author;

    // pages + status badge
    const bookMeta = document.createElement("div");
    bookMeta.classList.add("book-meta");

    const bookPagesP = document.createElement("p");
    bookPagesP.classList.add("book-pages");
    bookPagesP.textContent = `${book.pages} pages`;

    const bookReadStatus = document.createElement("span");
    bookReadStatus.classList.add(
      "read-status",
      book.read ? "is-read" : "not-read",
    );
    bookReadStatus.textContent = book.read ? "Read" : "Not read";

    bookMeta.append(bookPagesP, bookReadStatus);

    // toggle + remove
    const bookActions = document.createElement("div");
    bookActions.classList.add("book-actions");

    const bookReadBtn = document.createElement("button");
    bookReadBtn.classList.add("toggle-read-btn");
    bookReadBtn.textContent = book.read ? "Mark as unread" : "Mark as read";
    bookReadBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    const bookRemove = document.createElement("button");
    bookRemove.classList.add("remove-btn");
    bookRemove.textContent = "Remove";
    bookRemove.addEventListener("click", () => {
      const bookIndex = myLibrary.findIndex((item) => item.id === book.id);
      if (bookIndex < 0) return;
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });

    bookActions.append(bookReadBtn, bookRemove);

    bookDiv.append(bookTitleHeading, bookAuthorP, bookMeta, bookActions);
    libraryDiv.appendChild(bookDiv);
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = Number(pagesInput.value);
  const read = readInput.checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  bookForm.reset();
  bookDialog.close();
}

const bookForm = document.querySelector(".book-form");
const bookDialog = document.querySelector("#book-dialog");
const libraryDiv = document.querySelector(".library");
const titleInput = document.querySelector("#bookTitle");
const authorInput = document.querySelector("#bookAuthor");
const pagesInput = document.querySelector("#bookPages");
const readInput = document.querySelector("#bookRead");

bookForm.addEventListener("submit", handleSubmit);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);

displayBooks();
