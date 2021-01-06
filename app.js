var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var jwt = require('jsonwebtoken');
const { secret } = require('./config.json');
var app = express();
require('./mongodb');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery')));
app.use('/axios', express.static(path.join(__dirname, 'node_modules/axios')));

//setting req golbal vars
app.use(function(req, res, next) {
  res.locals.APP_NAME = "E-learning platform";
  let token = req.cookies.userAccess;
  res.locals.isSignedIn = false;

  if(token){
    return jwt.verify(token, secret, function(err, decoded){
      if(decoded){
        req.user = decoded;
        res.locals.isSignedIn = true;
        res.locals.user = decoded;
      }
      next();
    });
  }

  next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);


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
