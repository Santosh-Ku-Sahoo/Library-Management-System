const express = require("express");
const {users} = require("../data/users.json");

const {getAllUsers,getSingleUserById,createUser,updateUserById,deleteUserById,getSubscriptionDetails} = require("../controllers/user-controller");

const router = express.Router();

/** 
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * parameter: none
 * query: none
 */
// router.get("/",(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })
router.get("/", getAllUsers);

/** 
 * Route: /users/:id
 * Method: GET
 * Description: Get user by id
 * Access: Public
 * parameter: id
 * query: none
 * */
    // router.get("/:id",(req,res)=>{

    //     const {id} = req.params; // params are used to get the data from the url and here we are getting the id from the url
    //     const user = users.find((each)=> each.id === id);

    //     if(!user){
    //         return res.status(404).json({
    //             success: false,
    //             message: `User not found with id ${id}`
    //         })
    //     }
    //     res.status(200).json({
    //         success: true,
    //         data: user
    //     })
    // })
router.get("/:id", getSingleUserById);

/** 
 * Route:/users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * parameter: none
 * query: none
 * */
// router.post("/",(req,res)=>{
//     // Destructuring the data from the request body
//     const {id,name,email,issuedBooks,issuedDate,returnDate,subscriptionType,subscriptionExpiryDate} = req.body; // body is used to get the data from the request body
   
//     // Validating the data
//     if(!id || !name || !email ||!subscriptionType || !subscriptionExpiryDate){
//         return res.status(400).json({
//             success: false,
//             message: "Please provide all the required fields"
//         })
//     }
//     // Checking if the user already exists
//     const user = users.find((each)=> each.id === id);
//     if(user){
//         return res.status(409).json({
//             success: false,
//             message: `User already exists with id ${id}`
//         })
//     }
//     // if the user doesn't exist, create a new user
//     users.push({id,name,email,subscriptionType,subscriptionExpiryDate})
//     res.status(201).json({
//         success: true,
//         message: "User created successfully"
//     })
// })
router.post("/", createUser);

/** 
 * Route:/users/:id
 * Method:PUT
 * Description: Update a user by id
 * Access: Public
 * parameter: id
 * query: none
 * */
// router.put("/:id",(req,res)=>{
//     const {id} = req.params; // getting the id from the url
//     const {data} = req.body; // getting the data from the request body
//     const user = users.find((each)=> each.id === id); // getting the user from the users array

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found with id ${id}`
//         })
//     }
//     // updating the user
//     const userIndex = users.findIndex((each) => each.id === id);
//     users[userIndex] = { ...users[userIndex], ...data }; // Update just the one user directly

//     res.status(200).json({
//         success: true,
//         data: users,
//         message: "User updated successfully"
//     })
// })
router.put("/:id", updateUserById);


/** 
 * Route:/users/:id
 * Method:DELETE
 * Description: Delete a user by id
 * Access: Public
 * parameter: id
 * query: none
 * */
// router.delete("/:id",(req,res)=>{
//     const {id} = req.params; // getting the id from the url
//     const user = users.find((each)=> each.id === id); // getting the user from the users array

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found with id ${id}`
//         })
//     }
//     // removing the user from the users array
//     const userIndex = users.findIndex((each) => each.id === id);
//     users.splice(userIndex, 1); // remove exactly 1 item at the specific index
    
//     res.status(200).json({
//         success: true,
//         data: users,
//         message: "User deleted successfully"
//     })
// })
router.delete("/:id", deleteUserById);


/** 
 * Route:/subscriptions-details/:id
 * Method: GET
 * Description: Get all books issued to a user
 * Access: Public
 * parameter: id
 * query: none
 * */
// router.get("/subscriptions-details/:id", (req, res) => {
//     const { id } = req.params;
//     // Find the user by id
//     const user = users.find((each) => each.id === id);

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: `User not found with id ${id}`
//         });
//     }
// // extract the subscription details
//     const getDateInDays = (data = '') => {
//         let date;
//         if (data) {
//             date = new Date(data);
//         } else {
//             date = new Date();
//         }
//         let days = Math.floor(data / (1000 * 60 * 60 * 24));
//         return days;
//     }
//     const subscriptionType =(date = '') => {
//         if(user.subscriptionType === "Basic"){
//             date = date + 90;
//         } else if(user.subscriptionType === "Standard"){
//             date = date + 180;
//         } else if(user.subscriptionType === "Premium"){
//             date = date + 365;
//         }
//     };

//     // Calculate the subscription expiry date
//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiryDate = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiryDate < currentDate,
//         daysLeftForExpiry: subscriptionExpiryDate - currentDate,
//         returnDate: returnDate < currentDate ? "Book return date has passed" : returnDate,
//         fine: returnDate < currentDate ? subscriptionExpiryDate <= currentDate ?(currentDate - returnDate) * 10 :200: 0  // if both conditions are true fine executed and one condition is true 200 fine else 0
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });
router.get("/subscriptions-details/:id", getSubscriptionDetails);

// exporting the router so that we can use it in the index.js file
module.exports = router;