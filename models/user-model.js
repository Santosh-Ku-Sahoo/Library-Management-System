const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    issuedBooks: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
     },
     issuedDate: { 
        type: String,
        required: false
     },
     returnDate: { 
        type: String,
        required: false
     },
     subscriptionType: { 
        type: String,
        required: true
     },
     subscriptionDate: { 
        type: String,
        required: true
     }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;