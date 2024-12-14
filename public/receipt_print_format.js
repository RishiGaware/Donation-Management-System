function printbtn() {
    console.log("Inside PrintBtn!");

    // Attach an event listener to the onbeforeprint event
    window.addEventListener('beforeprint', function () {
        console.log('Before print dialog is opened');
        // Give a short delay before going back to the previous page
        setTimeout(function () {
            window.history.back();
        }, 100); // Adjust the delay time as needed
    });

    // Open the print dialog
    window.print();
}



// function printbtn(){
//     console.log("Inside PrintBtn!");
//     // document.getElementById("btn").style.visibility = "hidden";
//     window.print();
//     // window.history.back();
// }