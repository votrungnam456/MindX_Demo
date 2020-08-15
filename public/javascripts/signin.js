// var express = require('express');
// var router = express.Router();

// router.get('/signin', function(req, res, next) {
//     // loginController(req,res);
//     if(res.status == true)
//     {
//         alert("Vui lòng xác nhận email")
//     }
//   });

async function fect() {
    const response = await fetch('http://localhost:3000/login/signin').then(data => console.log(data))
    console.log(response)
}

fect()