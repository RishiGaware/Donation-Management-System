const express = require('express');
const path =  require('path');
const connection = require("./connection/connection");
// const cookieparser = require("cookie-parser")
const session  = require('express-session');
const store = new session.MemoryStore();
const jwt = require('jsonwebtoken');        // jwt (json web Token)

                // const JSDOM  = require('jsdom')
                // const alert = require('alert');

const adminRoute = require('./routes/admin_routes');
const userRoute = require('./routes/user_routes');
const defaultadminRoute = require('./routes/defaultadmin_routes');
const reviewerRoute = require('./routes/reviewer_routes');
const cssRoute = require('./routes/public_css_routes');

const app = express();

// use ejs as a view engine
app.set('view engine','ejs');
app.set("views", path.resolve("./views"));

//converting json string into json object
app.use(express.json());

app.use(express.urlencoded({extended : false}));

//for creating session
app.use(session ({
    secret : 'some secret',
    resave: false,
    cookie : { 
        maxAge : 86400000
    },
    saveUninitialized : false,
    store
}));

//app.use is a middleware that mount middleware function to the path that matches "/admin";
app.use("/admin", adminRoute);

//app.use is a middleware that mount middleware function to the path that matches "/user";
app.use("/user", userRoute);

//app.use is a middleware that mount middleware function to the path that matches "/defaultadmin";
app.use("/defaultadmin",defaultadminRoute);

//app.use is a middleware that mount middleware function to the path that matches "/reviewer";
app.use("/reviewer",reviewerRoute);

//app.use is a middleware that mount middleware function to the path that matches "/reviewer";
app.use("/public",cssRoute);

const port = 1222;
app.listen(port,() => {
    console.log(`server running on Port :${port}`);
});

app.get("/",(req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                res.redirect("/user/userpage");
            }else if(req.session.user.role = "admin"){
                res.redirect("/admin/adminpage");
            }else if(req.session.user.role = "reviewer"){
                res.redirect("/reviewer/reviewerpage");
            }
        }else{
            console.log("Session Is Not Created Yet!");
            res.render("login");
        }
    }catch(error){
        console.log(error);
    }
});

app.get("/login" , (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                res.redirect("/user/userpage");
            }else if(req.session.user.role = "admin"){
                res.redirect("/admin/adminpage");
            }else if(req.session.user.role = "reviewer"){
                res.redirect("/reviewer/reviewerpage");
            }
        }else{
                                // console.log("Session Is Not Created Yet!");
            res.render("login");
        }
    }catch(error){
        console.log(error);
    }
});

//DELETE SESSION DATA AND LOGGING OUT
app.get("/logout",(req,res) =>{
    if(req.session.user){
        req.session.destroy();
        res.redirect("/login");
    }
});

app.post("/login", async (req, res) => {
    try {

        if (req.body) {
            const user = {
                username : req.body.username,
                password : req.body.password,
            }
        
            const [users] = await query('SELECT * FROM users WHERE username = ? AND password = ?', [user.username,user.password]);
                                    // console.log(users);

                                // res.cookie('jwt', Token , { httpOnly: true, secure: true, maxAge: 3600000 })
              
            if(users){
                const encryptedToken = generateAccessToken(users);
                                    // console.log(encryptedToken);
                const decodedToken = decriptGetToken(encryptedToken);          //decrypted token assign to token object
                                    // console.log(decodedToken);

                if (users.role == "user") {
                                        // req.session.authentication = true;
                                        // req.session.user = users;
                                        // console.log(req.session.user);

                    req.session.user = decodedToken;
                    res.redirect("/user/userpage");

                } else if (users.role == "admin") {
                                        // req.session.authentication = true;
                                        // req.session.admin = users;

                    req.session.user = decodedToken;
                    res.redirect("/admin/adminpage");

                }else if(users.role == "reviewer"){
                                        // req.session.authentication = true;
                                        // req.session.reviewer = users;
                    
                    req.session.user = decodedToken;
                    res.redirect("/reviewer/reviewer_page")

                }else if (users.role == "defaultadmin"){
                                        // req.session.authentication = true;
                                        // req.session.defaultadmin = users;

                    req.session.user = decodedToken;
                    res.render("registeradmin");

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

        //generate Encripted Jsom Web Token
function generateAccessToken(user) {
    const payload = {
        id       : user.id,
        firstname: user.firstname,
        lastname : user.lastname,
        username : user.username,
        role     : user.role,
    };

    const secret = 'your-secret-key';
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
}

        //decript Jsom web Token
function decriptGetToken(token){
    try {

        return JSON.parse(atob(token.split('.')[1]));

    } catch (error) {

        return null;

    }
}


module.exports = session;

