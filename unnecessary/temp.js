const specialCharacters = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
    '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '.', '/', '<',
    '>', '?', '`', '~'
];
console.log(specialCharacters);
const pass = "Rishi@1234";
let flag = false;
for (ele of specialCharacters){
    // console.log(ele);
    for (i in pass){
        if(pass[i] == ele){
            flag = true;
            console.log(pass[i],ele);
            break;
        }
    }
};