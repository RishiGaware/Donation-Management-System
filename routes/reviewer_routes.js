const express = require('express');
const router = express.Router();
const connection = require('../connection/connection');


router.get("/reviewer_page",async(req,res)=>{
    try{
        if(req.session.user){
            if(req.session.user.role == "reviewer"){
                const [users] = await query('SELECT * FROM users WHERE username = ? ', [req.session.user.username]);
                res.render("reviewerpage",{users});
            }
        }else{
            res.redirect('/login');
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/reviewer_page/reviewer_records", async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "reviewer"){
                const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
                res.render("reviewer_records",{ receipts: receipts });
            }
        }else{
            res.redirect('/login');
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/reviewer_page/update_reviewer_records", async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "reviewer"){
                                        // const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
                const ID = req.query.ID;
                const Count = req.query.count;
                const [receipt] = await query('SELECT * FROM receipt where ID = ? ORDER BY RECEIPT_DATE',[ID]);
                                        // console.log("reviewer record ",receipt);
                                        // console.log(ID," Id from url");
                                        // console.log(Count,"count from url");
                res.render("update_reviewer_record",{ receipt : receipt , ID : ID , Count : Count });
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.post("/reviewer_page/update_reviewer_records",async (req,res) =>{
    try{
        if(req.session.user){
            if(req.session.user.role == "reviewer"){
                const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
                const ID = req.body.ID;
                const COUNT = req.body.count;

                                // console.log("Count from reviewer records.ejs file",COUNT);
                                // console.log("id from reviewer records.ejs",ID);
                res.redirect(`/reviewer/reviewer_page/update_reviewer_records?ID=${ID}&count=${COUNT}`);
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

router.post("/reviewer_page/reviewer_records_updated" , async (req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "reviewer"){
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
                        // res.redirect("/reviewer_page/reviewer_records");
                        // const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
                res.redirect("/reviewer/reviewer_page/reviewer_records");
            }
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});

    //reviewer can be delete user generated receipts.
router.post("/reviewer_page/reviewer_records/deleted", async (req,res) => {
    try{
        if(req.session.user){
            if(req.session.user.role == "reviewer"){
                const ID  = req.body.ID;
                        // console.log(ID);
                await query("delete from receipt where ID = ?",[ID]);
                        // const [users] = await query('SELECT * FROM users WHERE username = ? ', [req.session.reviewer.username]);
                        // res.render("reviewerpage",{users});
                const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
                res.render("reviewer_records",{ receipts: receipts });
            }
            
        }else{
            res.redirect("/login");
        }
    }catch(error){
        console.log(error);
    }
});
    //render to update reviewer record page
router.post("/reviewer_page/reviewer_records/approved",async (req,res) => {
    if(req.session.user){
        if(req.session.user.role == "reviewer"){
            // const [users] = await query('SELECT * FROM users WHERE username = ? ', [req.session.reviewer.username]);
            const ID = req.body.ID
            // console.log(ID);
            await query("UPDATE receipt SET APPROVAL_STATUS = ? WHERE ID = ?",["approved", ID]);
            const receipts = await query('SELECT * FROM receipt ORDER BY RECEIPT_DATE');
            res.render("reviewer_records",{ receipts: receipts });
        } 
    }else{
        res.redirect("/login");
    }
});

router.post("/reviewer_page/reviewer_records/print",async (req,res) =>{
    if(req.session.user){
        if(req.session.user.role == "reviewer"){
                    // console.log(req.body.ID);
            const [receipt] = await query("select * from receipt where id = ?",[req.body.ID]);
                    // console.log(receipt);
                    // console.log(receipt.NAME);
            res.render("receipt_print_format",{Receipt : receipt});
        } 
    }else{
        res.redirect("/login");
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