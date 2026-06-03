const mongoose = require('mongoose');

function connectDB() {
    const DB_URL = process.env.MONGO_URI;// here we are getting the MongoDB connection URI from the environment variables. This is a common practice to keep sensitive information like database credentials out of the source code.
    mongoose.connect(DB_URL);// this line establishes a connection to the MongoDB database using Mongoose. The connect method takes the connection URI as an argument and attempts to connect to the database.

    const db = mongoose.connection;// this line gets the default connection and assigns it to the variable db. This allows us to listen for events on the connection, such as errors or successful connection.

    db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
    db.once("open", function () {
        console.log("Connected to MongoDB successfully!");
    });
}
// This function will be responsible for connecting to the MongoDB database using Mongoose. We will export this function and call it in the index.js file to establish the connection.
module.exports = connectDB;// here module.exports is used to export the connectDB function so that it can be imported and used in other files, such as index.js, to establish a connection to the MongoDB database.