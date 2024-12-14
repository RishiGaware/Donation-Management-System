
window.onload = function() {

    insertInputData();
};

function insertInputData(){
                    console.log("From insertInputData()");
        // Taking the receipt data from h6 element that is hiddent in webpage
    const name = document.getElementById('name').textContent;
    const pan_no = document.getElementById('pan_no').textContent;
    const address = document.getElementById('address').textContent;
    const sum_of_rs = document.getElementById('sum_of_rs').textContent;
    const transfer_number = document.getElementById('transfer_number').textContent;
    const drawn_on = document.getElementById('drawn_on').textContent;
    const rs = document.getElementById('rs').textContent;

    document.getElementById('NAME').value = name;
    document.getElementById('PAN_NO').value = pan_no;
    document.getElementById('ADDRESS').value = address;
    document.getElementById('SUM_OF_RS').value = sum_of_rs;
    document.getElementById('TRANSFER_NUMBER').value = transfer_number;
    document.getElementById('DRAWN_ON').value = drawn_on;
    document.getElementById('RS').value = rs;

                    // console.log(NAME,PAN_NO,SUM_OF_RS,TRANSFER_NUMBER,DRAWN_ON,RS);
}