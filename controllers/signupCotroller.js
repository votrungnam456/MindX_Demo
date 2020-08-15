const firebase = require("firebase/app");
require("firebase/auth")

async function signupController(req,res){

    let email= req.body.email
    let pwd = req.body.pwd
    let firstname = req.body.first-name
    let middlelastname = req.body.middle-last-name
    console.log(req.body)
 
    if (firstname && middlelastname&&email&&pwd === req.body.Again-pwd) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, pwd);  
            firebase.auth().currentUser.updateProfile({
            newUser
            }) 
            firebase.auth().currentUser.sendEmailVerification();
            res.send(true)
            res.render('signin',{title:'Sign in page'})
        } catch (error) {
            // error.innerHTML = "<p>Tài khoản đã tồn tại</p>";
            // error.style.display="block";
            console.log(error)
        }
        }
    else{
        // error.innerHTML = "<p>Tài khoản hoặc mật khẩu không được để trống</p>";
        // error.style.display="block";
    }  
    }


module.exports = signupController;