var express = require('express');
var router = express.Router();
var dataHome = require("../model/databaseHomePage")
var dataMonAn = require("../model/databaseMonAn")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{user:'Đăng nhập',title:'Homepage',title2:'Khám phá vẻ đẹp cuộc sống thông qua những tấm hình đầy sống động',databaseAmThuc:dataHome.AmThuc,databaseTT:dataHome.TinTuc});
});


router.get('/GoiCuon', function(req, res, next) {
  res.render('AmThuc',{AmThuc:dataMonAn[0]});
});
router.get('/VitQuayBacKinh', function(req, res, next) {
  res.render('AmThuc',{AmThuc:dataMonAn[1]});
});

module.exports = router;
