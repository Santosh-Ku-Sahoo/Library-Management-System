// Book DTO (Data Transfer Object)
// This file is used to define the structure of the book data that we will be sending in the response. It helps us to ensure that the data we are sending is consistent and follows a specific format.

// we can use this DTO in our controllers to format the data before sending it in the response. This way, we can ensure that the data we are sending is consistent and follows a specific format.
class IssuedBook {
    _id;
    title;
    genre;
    author;
    publishedYear;
    issuedBy;
    issuedDate;
    returnDate;


       constructor(user) {
        this._id = user.IssuedBook._id;
        this.title = user.IssuedBook.title;
        this.genre = user.IssuedBook.genre;
        this.author = user.IssuedBook.author;
        this.publishedYear = user.IssuedBook.publishedYear;
        this.issuedBy = user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
//       OR we can also pass the book data and user data separately in the constructor and then assign the values to the properties of the IssuedBook class. This way, we can avoid accessing the book data from the user object and make our code more organized and easier to maintain.
    // constructor(book, issuedBy, issuedDate, returnDate) {
    //     this._id = book._id;
    //     this.title = book.title;
    //     this.genre = book.genre;
    //     this.author = book.author;
    //     this.publishedYear = book.publishedYear;
    //     this.issuedBy = issuedBy;
    //     this.issuedDate = issuedDate;
    //     this.returnDate = returnDate;
    }
}