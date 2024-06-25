
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tusinghar:sqSv9wKtjMAe3@cluster0.pt2g1qa.mongodb.net/paytmdemo");
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password:{
        type: String,
        required : true,
        minLength : 6,
    },
    firstName : {
        type : String,
        required : true,
        trim: true,
        maxLength : 10
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 10
    }
});
const User = mongoose.model('User',userSchema);
const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})
const Account = mongoose.model('Account',accountSchema);
module.exports = {
    User,
    Account
}