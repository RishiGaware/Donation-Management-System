const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');

router.get("/userpage",async(req,res) =>{
    try{
            if(req.session.user){
                            // console.log(">>>>",req.session.user,req.session.user.role,"<<<<");
                if(req.session.user.role == "user"){
                    const username = req.session.user.username;
                    const [users] = await query('SELECT * FROM users WHERE username = ?', [username]);
                            // console.log(req.session.user);
                            // console.log(req.session);
                    res.render("userpage",{users});
                }
            }else{
                res.redirect("/login");
            }
    }catch(error){
        console.log(error);
    }
});

    //CREATING NEW RECEIPT
router.get("/userpage/create_receipt" , (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                res.render("user_receipt");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});
    //SUBMITTED NEW RECEIPT
router.get("/userpage/receipt/submitted" , (req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                res.render("new_receipt_created");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});
    //FOR RENDERING TO edit_receipt_page AND PASSING ALL RECORDS FROM RECEIPT TABLE.
router.get("/userpage/edit_receipts", async (req, res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                                        // console.log(req.sessionID);
                                        // console.log(req.session.user.firstname,req.session.user.lastname);

                const created_by = req.session.user.firstname+" "+req.session.user.lastname;
                const receipts = await query('select * from receipt where CREATED_BY = ? order by RECEIPT_DATE;',[created_by]);
                    // console.log(":",receipts);
                res.render("edit_user_receipt",{ receipts: receipts });
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/userpage/edit_receipts/update", async (req, res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                const created_by = req.session.user.firstname+" "+req.session.user.lastname;
                                            // const receipt = await query('select * from receipt where CREATED_BY = ? order by RECEIPT_DATE;',[created_by]);
                const ID = req.query.ID;
                const Count = req.query.count; 
                const [receipt] = await query('select * from receipt where CREATED_BY = ? AND ID = ?;',[created_by,ID])       //getting single record that is going to update
 
                                            // console.log(">>>>>",receipt,"<<<<<<<<<<<<<<");
                                            // console.log("ID from the URL",ID);
                                            // console.log("count from the URl",Count);

                res.render("update_user_receipt",{ receipt: receipt , ID : ID , Count : Count });
            } 
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.post("/userpage/edit_receipts",async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                const created_by = req.session.user.firstname+" "+req.session.user.lastname;
                const receipts = await query('select * from receipt where CREATED_BY = ? order by RECEIPT_DATE;',[created_by]);
                const ID = req.body.ID;  
                const count = req.body.count;

                            // console.log(" ID from edit receipt.ejs =",ID);
                            // console.log(" Count from edit receipt.ejs =",count);
                            // console.log(req.body);

                res.redirect(`/user/userpage/edit_receipts/update?ID=${ID}&count=${count}`);       //passes ID as a query parameter in the url.
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

//FOR SUBMITTING THE USER RECEIPT
router.post("/userpage/receipt_submit", async (req, res) => {
    try{    
        if(req.session.user){
            if(req.session.user.role == "user"){
                    //for concatenating firstname and lastname of user
                const name = req.session.user.firstname.concat(" ",req.session.user.lastname);
                            // console.log(req.body);
                    //CALLING INSERT FUNCTION AND PASSING TWO ARGS AS SQL QUERY AND SECOND IS ARGS.
                const create_receipt = await query("insert into receipt(RECEIPT_NO,RECEIPT_DATE,NAME,PAN_NO,ADDRESS,SUM_OF_RS,TRANSFER_NUMBER,DRAWN_ON,RS,CREATED_BY) values(?,?,?,?,?,?,?,?,?,?)",
                [req.body.receipt_no , req.body.date , req.body.name , req.body.pancard_no , req.body.address , req.body.sum_of_rs , req.body.transfer_no , req.body.drawn_on , req.body.rs,name]);
                    
                            //RECORD INSERTED INTO DB
                            // console.log(create_receipt);

                res.redirect("/user/userpage/receipt/submitted");
            }
        }else{
            res.redirect("/login");
        }      
    }catch (error){
        res.redirect("/receipt");
        console.log(error);
    }
});

router.post("/userpage/update_user_receipt" ,async (req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "user"){
                var NAME  = req.body.NAME;
                var RECEIPT_NO  = req.body.RECEIPT_NO;
                var PAN_NO  = req.body.PAN_NO;
                var ADDRESS  = req.body.ADDRESS;
                var SUM_OF_RS  = req.body.SUM_OF_RS;
                var TRANSFER_NUMBER  = req.body.TRANSFER_NUMBER;
                var DRAWN_ON  = req.body.DRAWN_ON;
                var ID  = req.body.ID;
                var RS =  req.body.RS;
        
                        // console.log(req.body);
                        // console.log(ID);
        
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
                        
                res.redirect("/user/userpage/edit_receipts");
            }
        }else{
            res.redirect("/login");
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


