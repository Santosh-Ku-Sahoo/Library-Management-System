const express = require('express');
// const {users}= require('./data/users.json');
const dotenv = require('dotenv');

//import database connection function
const connectDB = require('./databaseConnection');

// importing the routers
const userRouter = require('./routes/users');
const bookRouter = require('./routes/book');

dotenv.config();// This will load the environment variables from the .env file into process.env

connectDB();

const app = express(); 

const PORT = 8081;

app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Home Page"
    })
})



app.use('/users', userRouter);
app.use('/books', bookRouter);

// app.all('/{*splat}',(req,res)=>{ // This will handle all the routes which are not defined above
//     res.status(404).json({
//         message: "Page Not Found"
//     })
// })

app.listen(PORT, ()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
})
