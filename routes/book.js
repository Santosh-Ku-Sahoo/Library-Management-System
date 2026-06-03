const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {UserModel, BookModel} = require("../models/index"); // here we are importing the UserModel and BookModel from the index.js file in the models folder. This allows us to use the Mongoose models to interact with the MongoDB database in our route handlers.
//    OR
// const UserModel = require("../models/user-model");
// const BookModel = require("../models/book-model");

const {getAllBooks,getSingleBookById,getAllIssuedBooks,addNewBook,updateBook,deleteBook} = require("../controllers/book-controller"); // here we are importing the getAllBooks and getSingleBookById functions from the book-controller.js file in the controllers folder. This allows us to use the controller functions to handle the logic for our route handlers.

const router = express.Router();

/** 
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * parameter: none
 * query: none
 */
// router.get("/",(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })
router.get("/", getAllBooks); // here we are using the getAllBooks function as the callback function for the GET /books route. This allows us to separate the logic for handling the route from the route definition, making our code more organized and easier to maintain.

/** 
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * parameter: id
 * query: none
 * */
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
router.get("/:id", getSingleBookById); // here we are using the getSingleBookById function as the callback function for the GET /books/:id route. This allows us to separate the logic for handling the route from the route definition, making our code more organized and easier to maintain.

/** 
 * Route:/books
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * parameter: none
 * query: none
 * */
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
router.post("/", addNewBook); // here we are using the addNewBook function as the callback function for the POST /books route. This allows us to separate the logic for handling the route from the route definition, making our code more organized and easier to maintain.


/** 
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by id
 * Access: Public
 * parameter: id
 * query: none
 * */
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
router.put("/:id", updateBook); // here we are using the updateBook function as the callback function for the PUT /books/:id route. This allows us to separate the logic for handling the route from the route definition, making our code more organized and easier to maintain.


/** 
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by id
 * Access: Public
 * parameter: id
 * query: none
 * */
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
router.delete("/:id", deleteBook); // here we are using the deleteBook function as the callback function for the DELETE /books/:id route. This allows us to separate the logic for handling the route from the route definition, making our code more organized and easier to maintain.


/** 
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * parameter: none
 * query: none
 * */

//  router.get("/issued/for-users", (req, res) => {
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
router.get("/issued/for-users", getAllIssuedBooks); // here we are using the getAllIssuedBooks function as the callback function for the GET /books/issued/for-users route. This allows us to separate the logic for handling the route from the route definition, making our code more organized and easier to maintain.

// exporting the router so that we can use it in the index.js file

module.exports = router;