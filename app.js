var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const firebase = require("firebase/app");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var tintucRouter = require('./routes/tintuc');
var hinhanhRouter = require('./routes/hinhanh')
var app = express();

var firebaseConfig = {
  apiKey: "AIzaSyAOORPQ1lr7Q9CnCMStKrODZ67cKM-zJdg",
  authDomain: "mindx-database.firebaseapp.com",
  databaseURL: "https://mindx-database.firebaseio.com",
  projectId: "mindx-database",
  storageBucket: "mindx-database.appspot.com",
  messagingSenderId: "19186086978",
  appId: "1:19186086978:web:02d139c9e91788fc5aa9db",
  measurementId: "G-ZW8WR4ZFYB"
};
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // firebase.analytics();
 
firebase.initializeApp(firebaseConfig);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/tin-tuc',tintucRouter);
app.use('/hinh-anh',hinhanhRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
