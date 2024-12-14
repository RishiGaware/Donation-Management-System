
function alertMassage(){
    console.log("Entered In Alert Function!!!!");
    role();
    password();
}

function role (){
    
    let role = document.getElementById("role").value;  //getting input role fron the registerUser Page
    role = role.toLowerCase();                    //COnverting input role into Lowercase for better comparison 
            // console.log(typeof role);   
            // console.log(role); 
    let roleAlert = document.getElementById('role_alert');
    roleAlert.textContent = "Invalid Role.!";


    if(role == ""){
        roleAlert.textContent = "Enter Role!";
        roleAlert.style.visibility = "visible";
        console.log("input missing!");
    }else if(role != "admin" && role != "user" && role != "reviewer"  && role != "defaultadmin"){
        roleAlert.style.visibility = "visible";
        // alert("Enter Valid Role");              // Displaying Alert Massage When Role is Not valid !
    }else{
        roleAlert.style.visibility = "hidden";
    }
};

function password(){

    let password = document.getElementById("password").value;
    let passwordAlert = document.getElementById('password');


    const specialCharacters = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
        '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '.', '/', '<',
        '>', '?', '`', '~'
    ];
    console.log(specialCharacters);
    let flag = false;
    for (ele of specialCharacters){
        // console.log(ele);
        for (i in password){
            if(password[i] == ele){
                flag = true;
                console.log(pass[i],ele);
                break;
            }
        }
    };
    if(password == ""){
        console.log("Password Missing!")
    }else if(flag == false){
        document.getElementById('password_alert').style.visibility = "visible";
    }
};
