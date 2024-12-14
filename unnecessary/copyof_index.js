const express = require('express');
const path =  require('path');
const connection = require("./connection");
// const cookieparser = require("cookie-parser")
const session  = require('express-session');
const store = new session.MemoryStore();
// const public = require("./")

const app = express();
const adminRoute = require('./routes/admin_routes');


//for accesing public folder
app.use((express.static("public")));

// use ejs as a view engine
app.set('view engine','ejs');
app.set("views", path.resolve("./views"));

//converting json string into json object
app.use(express.json());

app.use(express.urlencoded({extended : false}));

//for creating session
app.use(session ({
    secret : 'some secret',
    cookie :{ maxAge : 5000000},
    saveUninitialized : false,
    store
}));

app.use("/admin", adminRoute);

const port = 1222;
app.listen(port,() => {
    console.log(`server running on Port :${port}`);
});

  //for for acccesing the local .css files for styling 

app.get("/public/login.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'login.css'));
});

app.get("/public/registeruser.css", (req,res) => {
    res.sendFile(path.join(__dirname , 'public','registeruser.css'));
});

app.get("/public/registeradmin.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'registeradmin.css'));
});

app.get("/public/receiptpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'receiptpage.css'));
});

app.get("/public/update_receipt_page.css",(req,res) =>{
    res.sendFile(path.join(__dirname,"public","update_receipt_page.css"))
});

app.get("/public/defaultadminpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'defaultadminpage.css'));
});

app.get("/public/userpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'userpage.css'));
});

app.get("/public/adminpage.css", (req,res) => {
    res.sendFile(path.join(__dirname,"public","adminpage.css"));
});

app.get("/public/reviewerpage.css" , (req,res) => {
    res.sendFile(path.join(__dirname,"public","reviewerpage.css"));
});

app.get("/public/reviewer_records.css" , (req,res) => {
    res.sendFile(path.join(__dirname,"public","reviewer_records.css"));
});

app.get("/public/photo.jpg" , (req,res) => {
    res.sendFile(path.join(__dirname , 'public' , 'photo.jpg'));
});

app.get("/public/bg.jpg", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","bg.jpg"));
});

app.get("/public/bg1.jpg", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","bg1.jpg"));
});

app.get("/public/records_bg.jpg", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","records_bg.jpg"));
});

app.get("/public/receipt_print_format.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","receipt_print_format.css"))
});

app.get("/public/receipt_print_format.js",(req,res) => {
    res.sendFile(path.join(__dirname,"public","receipt_print_format.js"));
});

app.get("/public/profilepage.css", (req,res) =>{
    res.sendFile(path.join(__dirname,"public","profilepage.css"));
});

app.get("/",(req,res) => {
  res.render("login");
});

app.get("/login" , (req,res) =>{
    res.render("login");
});


app.get("/defaultadmin" , (req,res) =>{
    if(req.session.authentication){
        res.render("defaultadmin");
    }
});

app.get("/userpage",async(req,res) =>{
    if(req.session.authentication){
        const [users] = await find('SELECT * FROM users WHERE username = ?', [req.session.user.username]);
        // console.log(req.session.user);
        res.render("userpage",{users});
    }
});

app.get("/receipt",(req,res)=>{
    if(req.session.authentication){
        res.redirect("receipt");
    }
});
    //CREATING NEW RECEIPT
app.get("/create/receipt" , (req,res) =>{
    if(req.session.authentication){
        res.render("receipt");
    }
});
    //SUBMITTED NEW RECEIPT
app.get("/receipt/submitted" , (req,res) => {
    if(req.session.authentication){
        res.render("new_receipt_created");
    }
});
    //FOR RENDERING TO update_receipt_page AND PASSING ALL RECORDS FROM RECEIPT TABLE.
app.get("/update", async (req, res) => {
    try{
        if(req.session.authentication){
            // console.log(req.session.user.firstname,req.session.user.lastname);
            const created_by = req.session.user.firstname+" "+req.session.user.lastname;
            const receipts = await query('SELECT * FROM receipt WHERE CREATED_BY = ? ORDER BY RECEIPT_DATE',[created_by]);
            // console.log(":",receipts);
            res.render("update_receipt_page",{ receipts: receipts });
            
        }
    }catch(error){
        console.log(error);
    }
});

//DELETE SESSION DATA AND LOGGING OUT
app.get("/logout",(req,res) =>{
    if(req.session.authentication){
        req.session.destroy();
        res.render("login");
    }
});

app.get("/adminpage",async (req,res) =>{
    if(req.session.authentication){
        const [users] = await query ('select * from users where username = ?',[req.session.admin.username]);
        res.render("adminpage",{users});
    }
});

app.get("/user/signup" , (req,res) => {
    if(req.session.authentication){
        res.render("registeruser");
    }
});

app.get("/user/signup/success" , (req,res) => {
    if(req.session.authentication){
        console.log(req.session.authentication);
        res.render("user_created_successfully");
    }
});

// app.get("/profile/page",async (req,res) => {
//     if(req.session.authentication){
//         const [profile] = await query('SELECT * FROM users WHERE username = ? ', ["rishi@gmail.com"]);
//         console.log(profile.firstname);
//         res.render("profilepage",{profile});
//     }
// });

app.get("/registeradmin", (req,res) => {
    if(req.session.authentication){
        res.render("registeradmin");
    }
});

app.get("/reviewerpage",async(req,res)=>{
    if(req.session.authentication){
        const [users] = await query('SELECT * FROM users WHERE username = ? ', [req.session.reviewer.username]);
        res.render("reviewerpage",{users});
        console.error("Wrong Page");
    }
});

app.get("/reviewer/records" ,async (req,res) =>{
    if(req.session.authentication){
        const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
        res.render("reviewer_records",{ receipts: receipts });
    }
});

app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        if (req.body) {
            const [users] = await query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password])
            // const [user] = await find('SELECT * FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            // const [admin] = await find('SELECT * FROM admin WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            // const [defaultadmin] = await find('SELECT * FROM defaultadmin WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            // const [reviewer] = await find('SELECT * FROM reviewer WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            console.log(users);
            if(users){
                if (users.role == "user") {
                    req.session.authentication = true;
                    req.session.user = {
                        username,
                        password,
                        firstname : users.firstname,
                        lastname  : users.lastname
                    }
                     // console.log(req.session.user);
                    res.render("userpage",{users});
                } else if (users.role == "admin") {
                    req.session.authentication = true;
                    req.session.admin = {
                        username,
                        password
                    }
                    console.log(req.session.authentication);
                    res.render("adminpage",{users});
                }else if (users.role == "defaultadmin"){
                    req.session.authentication = true;
                    req.session.defaultadmin = {
                        username,
                        password
                    }
                    res.render("registeradmin");
                }else if(users.role == "reviewer"){
                    req.session.authentication = true;
                    req.session.reviewer = {
                        username,
                        password
                    }
                    const receipts = await query('SELECT * FROM receipt');
                    // console.log(":",receipts);
                    res.render("reviewerpage",{ receipts: receipts , users})
                }
            }else{
                res.send("Invalid Username Password!");
            }



            
        } else {
            res.send("Invalid User!");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while processing your request.");
    }
});

//register new User
app.post("/user/signup", async (req, res) => {
  if(req.session.authentication){
        //check user already exist or not
    const [userexist] = await query('SELECT * FROM users WHERE username = ? ', [req.body.username]);
    console.log(":",userexist);
    if(userexist){
        res.send("User Already Exist choose Different Name : ")
    }else{
        const usersignup = await query("insert into users(firstname,lastname,username,password,role) values(?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.username.toLowerCase(),req.body.password,req.body.role.toLowerCase()]);
        console.log(usersignup);
        return res.redirect("/user/signup/success");
    }
  }
});

app.post("/admin/signup", async (req, res) => {
    if(req.session.authentication){
        try{
            // console.log(req.session.defaultadmin);
               
                //check user already exist or not
            const [userexist] = await query('SELECT * FROM users WHERE username = ? ', [req.body.username]);
                console.log([userexist],req.body.username);
            if(userexist){
                res.send("User Already Exist choose Different Name : ");
            }else{
                const username = req.session.defaultadmin.username;
                    // console.log(req.session.defaultadmin.username,">>>>>");
                    // console.log(username);
                if(req.session.defaultadmin){
                        //insert is a function where pass two args one is insertQuery and second is req.body values;
                    const adminsignup = await query("insert into users(firstname,lastname,username,password,role) values(?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.username.toLowerCase(),req.body.password,req.body.role.toLowerCase()]);
                        // console.log("Record inserted Into DB :",adminsignup);
                    await query("delete from users where username = ?",[username]);
                }
                return res.redirect("/login");
            }
        }catch(error){
            console.log(error);
        }
    }
});

    //FOR SUBMITTING THE USER RECEIPT
app.post("/receipt/submit", async (req, res) => {
    if(req.session.authentication){
        try{
                //for concatenating firstname and lastname of user
            const name = req.session.user.firstname.concat(" ",req.session.user.lastname);
            console.log(req.body);
                //CALLING INSERT FUNCTION AND PASSING TWO ARGS AS SQL QUERY AND SECOND IS ARGS.
            const create_receipt = await query("insert into receipt(RECEIPT_NO,RECEIPT_DATE,NAME,PAN_NO,ADDRESS,SUM_OF_RS,TRANSFER_NUMBER,DRAWN_ON,RS,CREATED_BY) values(?,?,?,?,?,?,?,?,?,?)",
            [req.body.receipt_no , req.body.date , req.body.name , req.body.pancard_no , req.body.address , req.body.sum_of_rs , req.body.transfer_no , req.body.drawn_on , req.body.rs,name]);
                
                //RECORD INSERTED INTO DB
            console.log(create_receipt);
    
            res.redirect("/receipt/submitted");
    
        }catch (error){
            res.redirect("/receipt");
            console.log(error);
        }
    }
});

app.post("/update/user/records" ,async (req,res) => {
    try{
        if(req.session.authentication){
            var NAME  = req.body.NAME;
            var RECEIPT_NO  = req.body.RECEIPT_NO;
            var PAN_NO  = req.body.PAN_NO;
            var ADDRESS  = req.body.ADDRESS;
            var SUM_OF_RS  = req.body.SUM_OF_RS;
            var TRANSFER_NUMBER  = req.body.TRANSFER_NUMBER;
            var DRAWN_ON  = req.body.DRAWN_ON;
            var ID  = req.body.ID;
            var RS =  req.body.RS;

            console.log(req.body);

            if(NAME){
                await query("UPDATE receipt SET NAME = ? WHERE ID = ?",[NAME , ID]);
            }
            if(RECEIPT_NO){
                await query("UPDATE receipt SET RECEIPT_NO = ? WHERE ID = ?",[RECEIPT_NO , ID]);
            }
            if(PAN_NO){
                await query("UPDATE receipt SET PAN_NO = ? WHERE ID = ?",[PAN_NO , ID]);
            }
            if(ADDRESS){
                await query("UPDATE receipt SET ADDRESS = ? WHERE ID = ?",[ADDRESS , ID]);
            }
            if(SUM_OF_RS){
                await query("UPDATE receipt SET SUM_OF_RS = ? WHERE ID = ?",[SUM_OF_RS , ID]);
            }
            if(TRANSFER_NUMBER){
                await query("UPDATE receipt SET TRANSFER_NUMBER = ? WHERE ID = ?",[TRANSFER_NUMBER, ID]);
            }
            if(DRAWN_ON){
                await query("UPDATE receipt SET DRAWN_ON = ? WHERE ID = ?",[DRAWN_ON, ID]);
            }
            if(RS){
                await query("UPDATE receipt SET RS = ? WHERE ID = ?",[RS, ID]);
            }
            res.redirect("/userpage");
        }
    }catch(error){
        console.log(error);
    }
});

app.post("/update/reviewer/records" , async (req,res) => {
    try{
        if(req.session.authentication){
            var NAME  = req.body.NAME;
            var RECEIPT_NO  = req.body.RECEIPT_NO;
            var PAN_NO  = req.body.PAN_NO;
            var ADDRESS  = req.body.ADDRESS;
            var SUM_OF_RS  = req.body.SUM_OF_RS;
            var TRANSFER_NUMBER  = req.body.TRANSFER_NUMBER;
            var DRAWN_ON  = req.body.DRAWN_ON;
            var ID  = req.body.ID;
            var RS =  req.body.RS;

            console.log(req.body);
            console.log(ID);

            if(NAME){
                await query("UPDATE receipt SET NAME = ? WHERE ID = ?",[NAME , ID]);
            }
            if(RECEIPT_NO){
                await query("UPDATE receipt SET RECEIPT_NO = ? WHERE ID = ?",[RECEIPT_NO , ID]);
            }
            if(PAN_NO){
                await query("UPDATE receipt SET PAN_NO = ? WHERE ID = ?",[PAN_NO , ID]);
            }
            if(ADDRESS){
                await query("UPDATE receipt SET ADDRESS = ? WHERE ID = ?",[ADDRESS , ID]);
            }
            if(SUM_OF_RS){
                await query("UPDATE receipt SET SUM_OF_RS = ? WHERE ID = ?",[SUM_OF_RS , ID]);
            }
            if(TRANSFER_NUMBER){
                await query("UPDATE receipt SET TRANSFER_NUMBER = ? WHERE ID = ?",[TRANSFER_NUMBER, ID]);
            }
            if(DRAWN_ON){
                await query("UPDATE receipt SET DRAWN_ON = ? WHERE ID = ?",[DRAWN_ON, ID]);
            }
            if(RS){
                await query("UPDATE receipt SET RS = ? WHERE ID = ?",[RS, ID]);
            }
            res.redirect("/reviewer/records");
        }
    }catch(error){
        console.log(error);
    }
});

    //reviewer can be delete user generated receipts.
app.post("/delete/reviewer/records", async (req,res) => {
    try{
        if(req.session.authentication){
            const ID  = req.body.ID;
            console.log(ID);
            await query("delete from receipt where ID = ?",[ID]);
            // const [users] = await query('SELECT * FROM users WHERE username = ? ', [req.session.reviewer.username]);
            // res.render("reviewerpage",{users});
            const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
            res.render("reviewer_records",{ receipts: receipts });
        }
    }catch(error){
        console.log(error);
    }
});
    //render to update reviewer record page
app.post("/approve/reviewer/records",async (req,res) => {
    if(req.session.authentication){
        // const [users] = await query('SELECT * FROM users WHERE username = ? ', [req.session.reviewer.username]);
        const ID = req.body.ID
        console.log(ID);
        await query("UPDATE receipt SET APPROVAL_STATUS = ? WHERE ID = ?",["approved", ID]);
        const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
        res.render("reviewer_records",{ receipts: receipts });
    }
});

app.post("/print/reviewer/records",async (req,res) =>{
    if(req.session.authentication){
        console.log(req.body.ID);
        const [receipt] = await query("select * from receipt where id = ?",[req.body.ID]);
        console.log(receipt);
        console.log(receipt.NAME);
        res.render("receipt_print_format",{Receipt : receipt});
    }
});


    //FOR SELECTING ALL DATA FROM TABLE
function query(sql, values=0) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}



module.exports = session;

    //finding values in DB
function find(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
    //inserting records into DB
function insert(sql, values) {
  return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
}
    //deleting defaultadmin records from DB
function deleterecord(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

    //FOR UPDATING THE EXISTING RECORDS
    function update(sql, values) {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }



    login
    if (users.role == "user") {
                console.log("Hello User!");
                req.session.authentication = true;
                req.session.user = {
                    username,
                    password,
                    firstname : user.firstname,
                    lastname  : user.lastname
                }
                // console.log(req.session.user);
                res.render("userpage",{user});
            } else if (users.role == "admin") {
                console.log("Hello admin!");
                req.session.authentication = true;
                req.session.admin = {
                    username,
                    password
                }
                res.render("adminpage",{admin});
            }else if (users.role == "defaultadmin"){
                req.session.authentication = true;
                req.session.defaultadmin = {
                    username,
                    password
                }
                res.render("registeradmin");
            }else if(users.role == "reviewer"){
                console.log("Hello reviewer!");
                console.log("username = ",username);
                console.log("password = ",password);
                console.log(reviewer);
                req.session.authentication = true;
                req.session.reviewer = {
                    username,
                    password
                }
                const receipts = await select('SELECT * FROM receipt');
                // console.log(":",receipts);
                res.render("reviewerpage",{ receipts: receipts , reviewer})
            }else {
                res.send("Invalid Username Password!");
            }



    inserting the aproved status into receipt table
app.post('/aprove/reviewer/recoord/action',async (req, res) => {
    const action = req.body.action;
    console.log(action);
    if (action === 'yes'){
        const ID = req.body.receipt_ID;
            // console.log(req.body);  
            console.log(ID);
        await update("UPDATE receipt SET APPROVAL_STATUS = ? WHERE ID = ?",["approved", ID]);
        const receipts = await select('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
        res.render("reviewer_records",{ receipts: receipts });

    } else {
        const receipts = await select('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
        res.render("reviewer_records",{ receipts: receipts });
    }
});


// const [user] = await find('SELECT * FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            // const [admin] = await find('SELECT * FROM admin WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            // const [defaultadmin] = await find('SELECT * FROM defaultadmin WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
            // const [reviewer] = await find('SELECT * FROM reviewer WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
           