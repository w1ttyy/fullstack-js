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

  this.info = function () {
    const readStatus = this.read ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function displayBooks() {
  libraryDiv.replaceChildren();
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    const bookTitleHeading = document.createElement("h2");
    const bookAuthorP = document.createElement("p");
    const bookPagesP = document.createElement("p");
    const bookReadP = document.createElement("p");
    const bookRemove = document.createElement("button");

    bookTitleHeading.textContent = book.title;
    bookAuthorP.textContent = "Author: " + book.author;
    bookPagesP.textContent = "Pages: " + book.pages;
    bookReadP.textContent =
      "Read?: " + (book.read ? "already read" : "not read yet");
    bookRemove.textContent = "Remove book";

    bookRemove.addEventListener("click", () => {
      const bookIndex = myLibrary.findIndex((item) => book.id === item.id);
      if (bookIndex < 0) return;
      myLibrary.splice(bookIndex, 1);
      displayBooks();
    });

    bookDiv.append(
      bookTitleHeading,
      bookAuthorP,
      bookPagesP,
      bookReadP,
      bookRemove,
    );

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
