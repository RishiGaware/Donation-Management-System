const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');

router.get("/adminpage",async (req,res) =>{
    try{
        console.log(req.session,">>>",req.session.user,"<<<");
        if(req.session.user){
            if(req.session.user.role == "admin"){
                const [users] = await query ('select * from users where username = ?',[req.session.user.username]);
                // console.log(users);
                res.render("adminpage",{users});
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/adminpage/user_signup_page" , (req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "admin"){
                res.render("registeruser");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/adminpage/user_signup/success" , (req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "admin"){
                console.log("Signup SUccessful ROute!");
                console.log(req.session.authentication);
                res.render("user_created_successfully");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/adminpage/profile_page",async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "admin"){
                const [org] = await query("select * from org ",[]);
                res.render("profile_page",{org});
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(erroe);
    }
});

router.get('/adminpage/users_page',async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "admin"){
                const users = await query('select * from users where role = ?',['user']);
                res.render("admin_users_page",{users : users});
            }
        }else{
            res.redirect("/login");
        } 
    }catch(error){
        console.log(error)
    }
});

//register new User
router.post("/adminpage/user_signup", async (req, res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "admin"){
                const role = req.body.role.toLowerCase();
                                    // console.log(req.body);
                if(role == "admin" || role == "user" || role == "reviewer" || role == "defaultadmin"){
                    console.log("Entered In If BLock!!")
                    //check user already exist or not
                    const [userexist] = await query('SELECT * FROM users WHERE username = ? and role = ?', [req.body.username,"user"]);
                    console.log(":",userexist);
                    if(userexist){
                        res.send("User Already Exist choose Different Name : ")
                    }else{
                        const usersignup = await query("insert into users(firstname,lastname,username,password,role) values(?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.username.toLowerCase(),req.body.password,req.body.role.toLowerCase()]);
                                    // console.log(usersignup);
                        return res.redirect("/admin/adminpage/user_signup/success")
                    }
                }
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});


router.post("/adminpage/profile_page/update_org",async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "admin"){
                console.log(req.body);
                var name  = req.body.name;
                var reg_no  = req.body.reg_no;
                var pan_no  = req.body.pan_no;
                var gujrat_office  = req.body.gujrat_office;
                var email  = req.body.email.toLowerCase();
    
                console.log(req.body);
    
                if(name){
                    await query("UPDATE org SET name = ?",[name]);
                }
                if(reg_no){
                    await query("UPDATE org SET reg_no = ? ",[reg_no]);
                }
                if(pan_no){
                    await query("UPDATE org SET pan_no = ?",[pan_no]);
                }
                if(gujrat_office){
                    await query("UPDATE org SET gujrat_office = ?",[gujrat_office]);
                }
                if(email){
                    await query("UPDATE org SET email = ?",[email]);
                }
                res.redirect("/admin/adminpage/profile_page");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error)
    }
});

router.post("/adminpage/profile_page/create_org",async (req,res) =>{
    try{
        if(req.session.user){
            if(q == "admin"){
                const createorg = await query("insert into org(name,reg_no,pan_no,gujrat_office,email) values(?,?,?,?,?)",[req.body.name,req.body.reg_no,req.body.pan_no,req.body.gujrat_office,req.body.email.toLowerCase()]);
                res.redirect("/admin/adminpage");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

// router.post("/adminpage/users_page/update_user",async (req,res) => {
//     try{
//         if(req.session.user){
//             if(req.session.user.role == "admin"){
//                 const id = req.body.ID;            

//                 const username = req.body.username;
//                 const arr = username.split(' ');

//                 const firstname = arr[0];
//                 const lastname = arr[1];
//                 console.log(firstname,">>",lastname);


//                 const role = req.body.role;
//                 const email = req.body.email;

//                 if(username){
//                     await query("UPDATE users SET firstname = ? and lastname",[firstname,lastname]);
//                 }
//                 if(role){
//                     // await query("UPDATE org SET reg_no = ? ",[reg_no]);
//                 }
//                 if(email){
//                     await query("UPDATE users SET username = ?",[email]);
//                 }
//             }
//         }else{
//             res.redirect("/login");
//         }
//     }catch(error){
//         console.log(error);
//     }
// });

    //For performing Crud Operation On Project DataBase.
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

module.exports = router;