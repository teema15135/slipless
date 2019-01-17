// var request = new XMLHttpRequest();
// request.responseType = 'json';
// // request.onreadystatechange = (e) => {
// //   if (request.readyState !== 4) {
// //     return;
// //   }

// //   if (request.status === 200) {
// //     console.log('success', request.responseText);
// //   } else {
// //     console.warn('error');
// //   }
// // };

//     request.onload = function(){
//         console.dir(request.response);
//     };

// request.open('GET', 'http://10.51.64.53:8080/getBarcode?email=chompu.luffy@gmail.com');
// request.send();

import React from 'react';

fetch('http://10.51.64.53:8080/getBarcode?email=chompu.luffy@gmail.com')
    .then((response) => response.json())
    .then((responseJson) =>  {

        console.dir(responseJson);
    }
    )