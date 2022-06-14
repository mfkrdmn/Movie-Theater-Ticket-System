class Book{
    constructor(bookName,bookAuthor,bookISBN){
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookISBN = bookISBN 
    }
}

class List{

    addBook(books){
        const row = document.getElementById("bookList");
        const newBook = document.createElement("tr");
        newBook.innerHTML= `

            <td>${books.bookName}</td>
            <td>${books.bookAuthor}</td>
            <td>${books.bookISBN}</td>
            <td><a href="#" class="delete">X</td>
        `
        row.appendChild(newBook)
    }

    count(){
        const table = document.getElementById("bookList")
        let bookCount = document.getElementsByTagName("tr").length-1;
        document.getElementById("result").innerHTML = bookCount + " book added"
    }

    showMessage(message,className){
        const messageBox = document.createElement("div");
        messageBox.className = `alert ${className}`;
        messageBox.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#formBook");
        container.insertBefore(messageBox,form)

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    delete(target) {
        if(target.className === 'delete') {
          target.parentElement.parentElement.remove();
        }
    }

    
      clearForm() {
        document.getElementById('bookName').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookISBN').value = '';
      }

}

document.getElementById("formBook").addEventListener("submit", e =>{

    const bookName = document.getElementById('bookName').value
    const bookAuthor = document.getElementById('bookAuthor').value
    const bookISBN = document.getElementById('bookISBN').value;

    const book = new Book(bookName, bookAuthor, bookISBN)

    const list = new List();

    if(bookName == '' || bookAuthor == '' || bookISBN == '') {
        list.showMessage('Please fill all required fields!', 'error');
    }
    else{
        list.addBook(book);
        list.count()
        list.showMessage("Book added successfully", "success")
        list.clearForm()
    }

    e.preventDefault()
})

document.getElementById('bookList').addEventListener('click', function(e){

    const list = new List();
  
    list.delete(e.target);
  
    list.showMessage('kitap Silindi!', 'success');
  
    list.count();

    e.preventDefault();
  });

