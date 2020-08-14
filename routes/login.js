var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupCotroller')

router.get('/', function(req, res, next) {
  res.send('My first API!!!');
  });

router.get('/signin', function(req, res, next) {
    // loginController(req,res);
    res.render('signin',{title:'Sign in page'})
  });
  
router.post('/signin',function(req, res, next) {
  loginController(req,res);
});

// router.get('/signin', function(req, res, next) {
// res.render('signin',{title:'User'})
// });

router.get('/signup', function(req, res, next) {
  res.render('signup',{title:'Sign up page'})
});

router.post('/signup', function(req, res, next) {
  signupController(req,res);
  // console.log(req.body)
});

module.exports = router