
window.onload = function() {
    console.log("from update reviewer page js");
    const id = document.getElementById('id').textContent;
    const rowID = document.getElementById('count').textContent;
                    console.log("id = ",id);
                    console.log("count = ",rowID);
    scrollToRow(rowID);
};

function scrollToRow(rowIndex) {
    var table = document.getElementById('data_table');
    var rows = table.getElementsByTagName('tr');
    console.log(rows.length,"<<<<<<");

    if ( rowIndex > 6) {

        var row = rows[rowIndex]; 
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });

    }
};

