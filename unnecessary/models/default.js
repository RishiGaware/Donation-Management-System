const mongoose = require('mongoose');

const Default = new mongoose.Schema({
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
const collection = new mongoose.model("default",Default);
module.exports = collection;