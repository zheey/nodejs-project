'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATESUBJECT, RETRIEVESUBJECTS} = require("../controller/subject")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATESUBJECT)
router.get('/all', passport.authenticate('jwt', {session: false}), RETRIEVESUBJECTS)


module.exports = router;