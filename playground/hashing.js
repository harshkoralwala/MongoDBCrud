var { SHA256 } = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
    id: 10
}
var token=jwt.sign(data, '123abc');
console.log(token);



var decode=jwt.verify(token,'123abc');

console.log("decoded=>",decode);
// var message = "Harsh Koralwala";


// var hash = SHA256(message).toString();


// console.log(`hash ${hash}`);


// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
//  }
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();;

// var resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString();

// if (resultHash === token.hash) {
//     console.log('data was not changed');
// }
// else {
//     console.log("data was change.don't TRUST")
// }