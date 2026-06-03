const {BookModel, UserModel} = require('../models');
const IssuedBook = require('../dtos/book-dto'); // here we are importing the IssuedBookModel from the issued-book-model.js file in the models folder. This allows us to use the IssuedBookModel to interact with the issued books collection in the MongoDB database.

// const getAllBooks = (req, res) => {

// }

// const getSingleBookById = (req, res) => {

// }

// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }

// rather than exporting the functions separately, we can export them individually
//exports.getAllBooks = (req, res) => {


//router.get("/",(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })
exports.getAllBooks = async(req,res)=> {// here we are using the async keyword to make the function asynchronous. This allows us to use the await keyword to wait for the result of the BookModel.find() method before sending the response.
    const books = await BookModel.find();// here we are using the BookModel.find() method to get all the books from the MongoDB database. This method returns a promise, so we are using the await keyword to wait for the result before sending the response.
    if(books.length === 0){ // here we are checking if the books array is empty. If it is empty, then we are sending the error message in the response.
        return res.status(404).json({
            success: false,
            message: "No books found"
        })
    }
    res.status(200).json({
        success: true,
        data: books
    });
}


// router.get("/:id",(req,res)=>{

//     const {id} = req.params; // params are used to get the data from the url and here we are getting the id from the url
//     const book = books.find((each)=> each.id === id);   // finding the book from the books array using the id
// // if the book is not found then we are sending the error message in the response
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found with id ${id}`
//         })
//     }
// // if the book is found then we are sending the book data in the response
//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })
exports.getSingleBookById = async(req,res)=> {
    const {id} = req.params;
    const book = await BookModel.findById(id);// here we are using the BookModel.findById() method to get the book with the given id from the MongoDB database. This method returns a promise, so we are using the await keyword to wait for the result before sending the response.
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found with id ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: book
    });
}


// router.get("/issued/for-users", (req, res) => {
//     const issuedBooks = [];

//     const usersWithIssuedBooks = users.filter((each) => {
//         if (each.issuedBooks && each.issuedBooks.length > 0) {
//             return each;
//         }
//     });

//     usersWithIssuedBooks.forEach((each) => {
//         each.issuedBooks.forEach((bookId) => {
//             const book = books.find((book) => book.id === bookId);
//             if (book) {
//                 // creating a copy of the book object to avoid modifying the original data
//                 const issuedBook = { ...book };
//                 issuedBook.issuedBy = each.name;
//                 issuedBook.issuedDate = each.issuedDate;
//                 issuedBook.returnDate = each.returnDate;
//                 issuedBooks.push(issuedBook);
//             }
//         });
//     });

//     if (issuedBooks.length === 0) {
//         return res.status(404).json({
//             success: false,
//             message: "No books issued"
//         });
//     }
    
//     res.status(200).json({
//         success: true,
//         data: issuedBooks,
//     });
//  });

exports.getAllIssuedBooks = async(req,res)=> {
    const users = await UserModel.find({ 
        issuedBooks: { $exists: true,}
    }).populate('issuedBooks'); // here we are using the UserModel.find() method to get all the users who have issued books from the MongoDB database. We are using the $exists operator to check if the issuedBooks field exists in the user document. This method returns a promise, so we are using the await keyword to wait for the result before sending the response.
  
    const issuedBooks = users.map((each) => {
        return new IssuedBook(each); // here we are using the IssuedBook class to create a new object for each user who has issued books. This allows us to format the data in a specific way before sending it in the response.
    });

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books issued"
        });
    }
    
    res.status(200).json({
        success: true,
        data: issuedBooks,
    });

}


// router.post("/",(req,res)=>{
//     // Destructuring the data from the request body
//     const {id,title,genre,author,publishedYear} = req.body; // body is used to get the data from the request body 
//     // Validating the data
//     if(!id || !title || !genre || !author || !publishedYear){
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all the required fields"
//         })
//     }
//     // Creating a new book object
//     const newBook = {
//         id,
//         title,
//         genre,
//         author,
//         publishedYear
//     }
//     // Pushing the new book to the books array
//     books.push(newBook);
//     // Sending the response with the new book data 
//     res.status(201).json({
//         success: true,
//         data: newBook
//     })
// })
exports.addNewBook = async(req,res)=>{
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }

    await BookModel.create(data); // here we are using the BookModel.create() method to create a new book in the MongoDB database. This method returns a promise, so we are using the await keyword to wait for the result before sending the response.
    // res.status(201).json({
    //     success: true,
    //     message: "Book created successfully",
    //     data: data
    // });
    const allBooks = await BookModel.find(); // here we are using the BookModel.find() method to get all the books from the MongoDB database after creating a new book. This allows us to send the updated list of books in the response. This method returns a promise, so we are using the await keyword to wait for the result before sending the response.
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: allBooks
    });
};


// router.put("/:id",(req,res)=>{
//     const {id} = req.params; // getting the id from the url
//     const {title,genre,author,publishedYear} = req.body; // getting the data from the request body

//     const book = books.find((each)=> each.id === id); // finding the book from the books array using the id

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found with id ${id}`
//         })
//     }
//     // Updating the book data
//     book.title = title || book.title;
//     book.genre = genre || book.genre;
//     book.author = author || book.author;
//     book.publishedYear = publishedYear || book.publishedYear;

//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })
exports.updateBook = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }
    const updatedBook = await BookModel.findOneAndUpdate({_id: id}, data, {new: true}); // here we are using the BookModel.findByIdAndUpdate() method to update a book in the MongoDB database. The {new: true} option ensures that the updated document is returned.
    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book not found with id ${id}`
        });
    }
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    });
};


// router.delete("/:id",(req,res)=>{
//     const {id} = req.params; // getting the id from the url

//     const bookIndex = books.findIndex((each)=> each.id === id); // finding the index of the book from the books array using the id

//     if(bookIndex === -1){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found with id ${id}`
//         })
//     }
//     // Removing the book from the books array using the index
//     books.splice(bookIndex,1);
//     res.status(200).json({
//         success: true,
//         message: "Book deleted successfully"
//     })
// })
exports.deleteBook = async(req,res)=>{
    const {id} = req.params;
    //check if the book exists or not
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found with id ${id}`
        })
    }
    await BookModel.findByIdAndDelete({id});
    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
};
