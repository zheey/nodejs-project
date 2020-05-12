'use strict';

require('dotenv').config();//instantiate environment variables
require('./global/ResponseHandlers');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors')

const passportLocal = require('./auth/passport-local');
const passportJWT = require('./auth/passport-jwt');

const app = express();
passportLocal();
passportJWT();

const fileUpload = require('express-fileupload');
//const upload = require('./commons/fileUploadHandler');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

app.use(fileUpload());

/*app.use(function (req, res, next) {

  /!**
   * Handle File Uploads At This Point for the sake of uniformity.
   *!/
  if (req.files) {
    req.body.files = {};

    for (let i in req.files) {
      //console.log(req.files[i]);
      if (Array.isArray(req.files[i])) {
        req.body[i] = upload(req.files[i]);

      } else {
        req.body[i] = upload(req.files[i])[0];
      }
      console.log("files",req.body);
    }
    delete req.files;
  }
  next();

});*/



//require the route
require('./routes')(app);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(ErrorResp(res, "Page not found", 404 ));
});*/





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
