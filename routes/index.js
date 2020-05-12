"use strict";

const user = require('../routes/user')
const exam = require('../routes/exam_body')
const year = require('../routes/year')
const exam_year = require('../routes/exam_year')
const subject = require('../routes/subject')
const question = require('../routes/question')
const test = require('../routes/test')
const user_test = require('../routes/user_test')
const user_test_subject = require('./user_test_subject')
const donation = require('../routes/donation')
const exam_subject = require('../routes/test_subject')
const scholarship = require('../routes/scholarship')
const user_answer = require('../routes/user_answer')


const cors = require('cors')


module.exports = app => {
  // setup CORS
  app.options('*', cors())

  app.use((req, res, next) => {
    // Websites you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type, Authorization, token, Content-Type"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  app.use((req, res, next) => {
    if (req.method.toLowerCase() === "options") {
      return res.status(204).send();
    }
    next();
  });

  app.use('/users', user)
  app.use('/exam-body', exam)
  app.use('/years', year)
  app.use('/exam-year', exam_year)
  app.use('/subjects', subject)
  app.use('/questions', question)
  app.use('/tests', test)
  app.use('/user-tests', user_test)
  app.use('/user-test-subject', user_test_subject)
  app.use('/donations', donation)
  app.use('/test-subject', exam_subject)
  app.use('/scholarship', scholarship)
  app.use('/test-log', user_answer)

};
