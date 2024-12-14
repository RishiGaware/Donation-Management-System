const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');


// router.get("/defaultadmin/register/newadmin",(req,res) =>{
//     try{
//         if(req.session.authentication){
//             res.render("registeradmin");
//         }else{
//             res.redirect("/login");
//         }
//     }catch(error){
//         console.log(error);
//     }
// });

//render to default admin page for creating new default admin
router.get("/signup" , (req,res) =>{
        res.render("defaultadmin_page");
});

router.get("/registeradmin", (req,res) => {
    try{
        if(req.session.authentication){
            res.render("registeradmin");
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.post("/admin/signup", async (req, res) => {
        try{
            if(req.session.authentication){
                    //check user already exist or not
                const [userexist] = await query('SELECT * FROM users WHERE username = ? ', [req.body.username]);
                    console.log([userexist],req.body.username);
                if(userexist){
                    res.send("User Already Exist choose Different Name : ");
                }else{
                    const username = req.session.defaultadmin.username;
                    if(req.session.defaultadmin){
                        const role = req.body.role.toLowerCase();
                            //insert is a function where pass two args one is insertQuery and second is req.body values;
                        if(role == 'user' || role == 'admin' || role == 'reviewer' || role == 'defaultadmin'){
                            
                            const adminsignup = await query("insert into users(firstname,lastname,username,password,role) values(?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.username.toLowerCase(),req.body.password,role]);
                            console.log("Record inserted Into DB :",adminsignup);
                            await query("delete from users where username = ?",[username]);
                            req.session.destroy();
                            res.redirect("/login");
                        }else{
                           res.send("Enter Valid Role..!");
                        }
                    }
                }
            }
        }catch(error){
            console.log(error);
        }
});

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