var express = require('express');
var router = express.Router();
var dataImg = require("../model/databaseImg")

router.get('/vn', function(req, res, next) {
    res.render('HinhAnh',{title:'Việt Nam',title2:'Hình ảnh Việt Nam',title3:'Những hình ảnh đẹp của Việt Nam',database:dataImg.vn});
  });
  router.get('/', function(req, res, next) {
    res.render('HinhAnh',{title:'Hình Ảnh',title2:'Hình Ảnh',title3:'Kho ảnh đồ sộ',database:dataImg.full});
  });
  router.get('/jp', function(req, res, next) {
    res.render('HinhAnh',{title:'Nhật Bản',title2:'Hình Ảnh Nhật Bản',title3:'Nhật Bản - xứ sở hoa anh đào sẽ không khiến khỏi hết kinh ngạc trước vẻ đẹp của mình',database:dataImg.jp});
  });
  module.exports = router;