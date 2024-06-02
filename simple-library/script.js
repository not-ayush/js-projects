const add = document.querySelector("#add");
const books = document.querySelector(".books");
const popup = document.querySelector(".add-dailogue");
const submit = document.querySelector("#submit");
const form = document.querySelector("form");

let library = [];
let topIndex = -1;

function book(bookName, author, pages, status) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

add.addEventListener("click", () => {
    popup.style.display = "block";
});

books.addEventListener("click", (e) => {
    if (e.target.className == "status") {
        // update array object, update card html, update style and content of button
        let curIndex = e.target.parentElement.parentElement.getAttribute("dataIndex");
        let statusElem = document.querySelector(`.card[dataIndex="${curIndex}"] span.status`);

        library[curIndex].status = oppositeStatus(statusElem.textContent);
        statusElem.textContent = library[curIndex].status;
        e.target.textContent = `Mark as ${oppositeStatus(library[curIndex].status)}`;
    } else if (e.target.className == "remove") {
        // update array object, remove element from DOM, update index data for elements
        let curIndex = e.target.parentElement.parentElement.getAttribute("dataIndex");
        library.splice(curIndex, 1);
        topIndex--;
        books.removeChild(document.querySelector(`.card[dataIndex="${curIndex}"]`));
        let nextNodes = document.querySelectorAll(`.card`);
        for (let i = curIndex; i < nextNodes.length; i++) {
            if (i < 0) break;
            nextNodes[i].setAttribute("dataIndex", nextNodes[i].getAttribute("dataIndex") - 1);
        }
    }
});

// outside click closes the popup
popup.addEventListener("click", () => {
    popup.style.display = "none";
    form.reset();
});

// prevent bubbling
form.addEventListener("click", (e) => {
    e.stopPropagation();
});

// getting form data and adding the element to library
const bookName = document.querySelector("#book-name");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let readStr = read.checked ? "Read" : "Unread";
    let newBook = new book(bookName.value, author.value, pages.value, readStr);
    library.push(newBook);
    updateLibrary(newBook);
    topIndex++;
    popup.style.display = "none";
    form.reset();
});

function updateLibrary(bookObj) {
    let newBookCard = document.createElement("div");
    newBookCard.className = "card";
    newBookCard.setAttribute("dataIndex", topIndex + 1);
    newBookCard.innerHTML = `
    <ul>
      <li>
        <span class="data-label">Title: </span>
        <span class="data">${bookObj.bookName}</span>
      </li>
      <li><span class="data-label">Pages: </span> <span class="data">${bookObj.pages}</span></li>
      <li><span class="data-label">Author: </span> <span class="data">${bookObj.author}</span></li>
      <li><span class="data-label">Status: </span> <span class="data status">${bookObj.status}</span></li>
    </ul>
    <div><button class="status">Mark As ${oppositeStatus(bookObj.status)}</button><button class="remove">Remove</button></div>
    `;
    books.appendChild(newBookCard);
}

function oppositeStatus(s) {
    if (s == "Read") {
        return "Unread";
    } else if (s == "Unread") {
        return "Read";
    }
}

