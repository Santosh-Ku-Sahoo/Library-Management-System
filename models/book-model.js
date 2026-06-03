const mongoose = require('mongoose');

const Schema = mongoose.Schema;// This line creates a new Schema object from Mongoose, which will be used to define the structure of our Book documents in the MongoDB collection.

const bookSchema = new Schema({// Here we define the structure of our Book documents using the Schema object. We specify the fields and their types, as well as any validation rules (e.g., required fields).
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    genre: { type: String, required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });// The second argument to the Schema constructor is an options object. Here we set timestamps to true, which will automatically add createdAt and updatedAt fields to our documents, allowing us to track when each book was created and last updated.

const Book = mongoose.model('Book', bookSchema);// This line creates a Mongoose model named 'Book' based on the bookSchema we defined. The model provides an interface for interacting with the MongoDB collection, allowing us to perform CRUD operations on our Book documents.


module.exports = Book;// Finally, we export the Book model so that it can be imported and used in other parts of our application, such as in our route handlers to create, read, update, or delete book records in the MongoDB database.