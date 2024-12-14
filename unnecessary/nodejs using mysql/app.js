import express from "express"
const app = express()

app.get("/notes",(req,res)=>{
    res.send("this is the notes")
})

application.use((err , req , res , next) => {
    console.log(err.stack);
    res.status(500).send("something broke!");
})

app.listen(8080,() =>{
    console.log("server is running on port 8080")
})