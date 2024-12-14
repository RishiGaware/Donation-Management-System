const express = require('express');
const path =  require('path');

const cssRouter = express();
//for accesing public folder
cssRouter.use(express.static("public"));

//for for acccesing the local .css files for styling 

cssRouter.get("/public/login.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'login.css'));
});

cssRouter.get("/public/registeruser.css", (req,res) => {
    res.sendFile(path.join(__dirname , 'public','registeruser.css'));
});

cssRouter.get("/public/registeradmin.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'registeradmin.css'));
});

cssRouter.get("/public/receiptpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'receiptpage.css'));
});

cssRouter.get("/public/update_user_receipt.css",(req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_user_receipt.css"))
});

cssRouter.get("/public/update_user_receipt.js", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_user_receipt.js"));
});

cssRouter.get("/public/defaultadminpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'defaultadminpage.css'));
});

cssRouter.get("/public/userpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'userpage.css'));
});

cssRouter.get("/public/adminpage.css", (req,res) => {
    res.sendFile(path.join(__dirname,"public","adminpage.css"));
});

cssRouter.get("/public/reviewerpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname,"public","reviewerpage.css"));
});

cssRouter.get("/public/reviewer_records.css" , (req,res) => {
    res.sendFile(path.join(__dirname,"public","reviewer_records.css"));
});

cssRouter.get("/public/photo.jpg" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'photo.jpg'));
});

cssRouter.get("/public/bg.jpg", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","bg.jpg"));
});

cssRouter.get("/public/bg1.jpg", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","bg1.jpg"));
});

cssRouter.get("/public/records_bg.jpg", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","records_bg.jpg"));
});

cssRouter.get("/public/receipt_print_format.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","receipt_print_format.css"))
});

cssRouter.get("/public/receipt_print_format.js",(req,res) => {
    res.sendFile(path.join(__dirname,"public","receipt_print_format.js"));
});

cssRouter.get("/public/profilepage.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","profilepage.css"));
});

cssRouter.get("/public/defaultadmin_page.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","defaultadmin_page.css"));
});

cssRouter.get("/public/admin_users_page.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","admin_users_page.css"));
});

cssRouter.get("/public/edit_user_receipt.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","edit_user_receipt.css"));
});

cssRouter.get("/public/edit_user_receipt.js",(req,res) => {
    res.sendFile(path.join(__dirname,"public","edit_user_receipt.js"));
});

cssRouter.get("/public/update_reviewer_records.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_reviewer_records.css"));
});

cssRouter.get("/public/update_reviewer_record.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_reviewer_record.css"));
});

cssRouter.get("/public/update_reviewer_records.js", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_reviewer_records.js"));
});

cssRouter.get("/public/update_reviewer_record.js", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_reviewer_record.js"));
});


module.exports = cssRouter;