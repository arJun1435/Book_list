
//Book Class: Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Ui Class : Handles UI Tasks
class UI{
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book)=> UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete
        rounded-circle">
        X</a> </td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index)=>{
                if(book.isbn === isbn){
                    books.splice(index, 1);
                }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    //Prevent actual submit
    e.preventDefault();
    //Get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const value1 = document.getElementById("valid1")
    const value2 = document.getElementById("valid2")
    const value3 = document.getElementById("valid3")

    const success = document.getElementById('success');  

    //validate
    if(title === ''){
        value1.style.display = "block";
        setTimeout(()=> value1.style.display="none",2000);
    } else if(author === ''){
        value1.style.display = "none";
        value2.style.display = "block";
        setTimeout(()=> value2.style.display="none",2000);
    }else if(isbn === ''){
        value1.style.display = "none";
        value2.style.display = "none";
        value3.style.display = "block";
        setTimeout(()=> value3.style.display="none",2000);
    }else{
         //Instantiate Book
    const book = new Book(title, author, isbn);

    //Add Book to UI
    UI.addBookToList(book);
    success.style.display = "block";
    setTimeout(()=> success.style.display="none",1000);

    //Add Book to Store
    Store.addBook(book);

    //Clear the Fields
    UI.clearFields();
    }
})

  
//Event : Remove a Book
document.getElementById('book-list').addEventListener('click',(e)=> 
    {
    const remove = document.getElementById('delete');
    //Remove Book from UI
    UI.deleteBook(e.target)
    remove.style.display = "block";
    setTimeout(()=> remove.style.display="none",1000);


    //Remove Book from Store
    Store.removeBook
    (e.target.parentElement.previousElementSibling.textContent);
});