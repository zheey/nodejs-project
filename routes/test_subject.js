'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEEXAMSUBJECT, GETALLEXAMSUBJECT} = require("../controller/test_subject")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEEXAMSUBJECT)
router.get('/all', passport.authenticate('jwt', {session: false}), GETALLEXAMSUBJECT)


module.exports = router;