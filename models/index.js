const UserModel = require('./user-model');
const BookModel = require('./book-model');

module.exports = {
    UserModel,
    BookModel
};// In this index.js file, we are importing the UserModel and BookModel from their respective files and then exporting them as part of an object. This allows us to easily import both models from a single file when we need to use them in other parts of our application, such as in our route handlers or controllers. By organizing our models in this way, we can keep our codebase clean and maintainable.