const firebase = require("firebase/app");
require("firebase/auth")
var dataVN = require("../model/databaseImg")
var dataHome = require("../model/databaseHomePage")

async function loginController(req,res){
  // Your web app's Firebase configuration
    let user = req.body.username
    let pwd = req.body.pwd

    if (user && pwd) {
        try {
          const loginResult = await firebase.auth().signInWithEmailAndPassword(user, pwd);
          if (!loginResult.user.emailVerified) {
            // error.innerHTML = "<p>Vui lòng xác nhận email</p>";
            // error.style.display="block";
            console.log('xác nhận Email đê')
            res.send('vui lòng xác nhận email')
          }
          else{
            console.log('Đăng nhập thành công')
            res.render('index',{title:'Homepage',title2:'Khám phá vẻ đẹp cuộc sống thông qua những tấm hình đầy sống động',databaseAmThuc:dataHome.AmThuc,databaseTT:dataHome.TinTuc});           
          }
        } catch (err) {
        //   error.innerHTML = "<p>Tài khoản hoặc mật khẩu không đúng</p>";
        //   error.style.display="block";
        // console.log('Tài khoản hoặc mật khẩu không đúng')
        console.log(err)
        res.send('sai');
        }
      }
    else{
    //   error.innerHTML = "<p>Tài khoản hoặc mật khẩu không được để trống</p>";
    //   error.style.display="block";
    console.log('Tài khoản hoặc mật khẩu không được để trống')
    }
  }


module.exports = loginController;