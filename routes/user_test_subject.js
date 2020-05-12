'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEUSERSCHOLARSHIPEXAM, CREATEBULKUSERSCHOLARSHIPEXAM, GETALLSUBJECTFORATEST, UpdateUserTestSubject, GETUSERTESTSUBJECT} = require("../controller/user_test_subject")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEUSERSCHOLARSHIPEXAM)
router.post('/bulk-exam', passport.authenticate('jwt', {session: false}), CREATEBULKUSERSCHOLARSHIPEXAM)
router.get('/all', passport.authenticate('jwt', {session: false}), GETALLSUBJECTFORATEST)
router.put('/one', passport.authenticate('jwt', {session: false}), UpdateUserTestSubject)
router.get('/subject', passport.authenticate('jwt', {session: false}), GETUSERTESTSUBJECT)


module.exports = router;