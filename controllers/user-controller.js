const {UserModel,BookModel} = require('../models');

exports.getAllUsers = async (req,res) => {
    const users = await UserModel.find();
    if(!users || users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }
    res.status(200).json({
        success: true,
        data: users
    });
}

exports.getSingleUserById = async (req,res) => {
    const {id} = req.params;
    // const user = await UserModel.findById(id);
    // const user = await UserModel.findById({_id: id});
    const user = await UserModel.findOne({_id: id});
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id ${id}`
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
}

exports.createUser = async (req,res) => {
    const{data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }

    const user = await UserModel.create(data);
    const allUsers = await UserModel.find();

    res.status(201).json({
        success: true,
        data: allUsers,
        message: "User created successfully"
    });
}

exports.updateUserById = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id ${id}`
        });
    }
    const updatedUser = await UserModel.findByIdAndUpdate({_id: id}, data, {new: true});
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
    });
}

exports.deleteUserById = async (req,res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id ${id}`
        });
    }
    await UserModel.findByIdAndDelete({_id: id});
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
}

exports.getSubscriptionDetails = async (req,res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id ${id}`
        });
    }
    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    }
    const subscriptionType =(date = '') => {
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        } else if(user.subscriptionType === "Standard"){
            date = date + 180;
        } else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiryDate = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiryDate < currentDate,
        daysLeftForExpiry: subscriptionExpiryDate - currentDate,
        returnDate: returnDate < currentDate ? "Book return date has passed" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiryDate <= currentDate ?(currentDate - returnDate) * 10 :200: 0  
    } 
    res.status(200).json({
        success: true,
        data: issuedBooks
    });

}