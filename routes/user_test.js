'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEUSERSCHOLARSHIP, GETALLUSERTEST, CREATEUSERSCHOLARSHIPWITHSUBJECT, GETUSERTESTWITHSUBJECT, UpdateUserTest} = require("../controller/user_test")

router.post('/enroll', passport.authenticate('jwt', {session: false}), CREATEUSERSCHOLARSHIP)
router.post('/enroll-subject', passport.authenticate('jwt', {session: false}), CREATEUSERSCHOLARSHIPWITHSUBJECT)

router.get('/all', passport.authenticate('jwt', {session: false}), GETALLUSERTEST)
router.get('/test', passport.authenticate('jwt', {session: false}), GETUSERTESTWITHSUBJECT)
router.put('/one', passport.authenticate('jwt', {session: false}), UpdateUserTest)

module.exports = router;