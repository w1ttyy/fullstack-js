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
  const libraryDiv = document.querySelector(".library");
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    const bookTitleHeading = document.createElement("h2");
    const bookAuthorP = document.createElement("p");
    const bookPagesP = document.createElement("p");
    const bookReadP = document.createElement("p");

    bookTitleHeading.textContent = book.title;
    bookAuthorP.textContent = "Author: " + book.author;
    bookPagesP.textContent = "Pages: " + book.pages;
    bookReadP.textContent =
      "Read?: " + (book.read ? "already read" : "not read yet");

    bookDiv.append(bookTitleHeading, bookAuthorP, bookPagesP, bookReadP);

    libraryDiv.appendChild(bookDiv);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  console.log("submitted");
}

const bookForm = document.querySelector(".book-form");
const bookDialog = document.querySelector("dialog");

bookForm.addEventListener("submit", handleSubmit);

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);

displayBooks();
