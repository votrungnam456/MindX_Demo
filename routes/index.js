var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Homepage',title2:'Khám phá vẻ đẹp cuộc sống thông qua những tấm hình đầy sống động'});
});

router.get('/vn', function(req, res, next) {
  res.render('vn',{title:'Việt Nam',title2:'Hình ảnh Việt Nam'});
});
router.get('/GoiCuon', function(req, res, next) {
  res.render('GoiCuon',{title:'Gỏi cuốn - Việt Nam',title2:'Gỏi cuốn - Việt Nam'});
});

router.get('/Dung-nhieu-le-hoi-do-dich-covid', function(req, res, next) {
  res.render('TinTuc1',{title:'Dừng nhiều lễ hội do dịch covid-19',title2:'Tin tức du lịch'});
});

module.exports = router;
