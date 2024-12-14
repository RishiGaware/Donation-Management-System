const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstname : {
        type : String,
        required :true
    },
    lastname : {
        type : String,
        required :true
    },
    username:{
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true
    }
});
//collection Part
const collection = new mongoose.model("user",User);
module.exports = collection;