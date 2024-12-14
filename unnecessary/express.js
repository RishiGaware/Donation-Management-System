

//middleware route that executes multiple callback routes

app.get("/middleware", (req,res,next) =>{
    console.log("Before Handling Middleware!");
    next();
    },
    (req,res,next) =>{
        console.log("middleware WOrking");
        next();
    },
    (req,res) =>{
        res.send("Middleware Working Successfully!");
    }
);

// Route Parameters: the parameters pass in the url then that object  or variale is 
//accessible in the route for the operation.'


const userr = [
    {
        name : 'rishi',
        role : 'admin',
    },
    {
        name : 'vijay',
        role : 'user',
    },
    {
        name : 'karan',
        role : 'reviewer',
    },
    {
        name : 'nitish',
        role : 'admin',
    }
]


app.get('/login/:role' ,(req,res) => {
    const {role} = req.params;
    const user_roles = userr.find((user) => user.role === role );
    res.send(user_roles);
});




const supermarket = [
    {
        name : 'taksh galaxy',
        km : 5,
    },
    {
        name : 'osia',
        km : 3,
    },
    {
        name : 'inorbit mall',
        km : 1,
    },
    {
        name : 'D mart',
        km : 2.5,
    }
]

app.get('/login/supermarket', (req,res) => {
    console.log(req.query);
    const { km } = req.query;
    const int_km = parseInt(km);
    res.cookie("km",km, {
       maxAge:5000 
    });
    console.log("KM = ",km,int_km);
    if(!isNaN(int_km)){
        const sorted_values  = supermarket.filter((s) => s.km <= int_km );
        res.send(sorted_values);
    }else{
        res.send(supermarket);
    }
});



app.get('/login/:role' ,(req,res) => {
    const {role} = req.params;
    const user_roles = userr.find((user) => user.role === role );
    res.send(user_roles);
});
