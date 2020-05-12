'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEEXAM, RETRIEVEEXAMS} = require("../controller/exam_body")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEEXAM)
router.get('/all', passport.authenticate('jwt', {session: false}), RETRIEVEEXAMS)


module.exports = router;