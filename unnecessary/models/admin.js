const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String ,
        required : true,
    },
    username : {
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    },
    role :{
        type : String,
        required : true
    }
});
//collection Part
const collection = new mongoose.model("admin",Admin);
module.exports = collection;