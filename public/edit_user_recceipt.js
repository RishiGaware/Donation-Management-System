// window.onload = function() {
//         // Get the target element ID from the URL parameter
//     // var urlParams = new URLSearchParams(window.location.search);
//     // var scrollToElementId = urlParams.get('scrollTo');

//     // Scroll to the target element if it exists
//     var targetElement = document.getElementById('end');
//     if (targetElement) {
//         targetElement.scrollIntoView();
//     }
  
// };

// window.onload = function() {
//     // Scroll to the 20th row when the window loads
//     scrollToRow(20);
// };

// function scrollToRow(rowIndex) {
//     var table = document.getElementById('data_table');
//     var rows = table.getElementsByTagName('tr');
//     if (rows.length >= rowIndex) {
//         // Get the 20th row
//         var row = rows[rowIndex - 1]; // Adjust index to zero-based
//         // Scroll to the row
//         row.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     } else {
//         // If the table has fewer rows than the specified index
//         console.log('Table does not have 20 rows.');
//     }
// }