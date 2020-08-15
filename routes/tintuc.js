var express = require('express');
var router = express.Router();
var dataTT = require("../model/databaseTinTuc")

router.get('/Dung-nhieu-le-hoi-do-dich-covid', function(req, res, next) {
    res.render('TinTuc1',{title:dataTT[0].title,title2:'Tin tức du lịch',tintuc:dataTT[0]});
  });
  router.get('/Dung-nhieu-le-hoi-do-dich-covid-2', function(req, res, next) {
    res.render('TinTuc1',{title:dataTT[1].title,title2:'Tin tức du lịch',tintuc:dataTT[1]});
  });
  router.get('/Dung-nhieu-le-hoi-do-dich-covid-3', function(req, res, next) {
    res.render('TinTuc1',{title:dataTT[2].title,title2:'Tin tức du lịch',tintuc:dataTT[2]});
  });
  module.exports = router;