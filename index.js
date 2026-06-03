const express = require('express');
const {users}= require('./data/users.json');

// importing the routers
const userRouter = require('./routes/users');
const bookRouter = require('./routes/book');

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
