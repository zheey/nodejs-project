'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATESUBJECTANSWERS, GETALLSUBJECTANSWERS} = require("../controller/user_answer")

router.post('/create', passport.authenticate('jwt', {session: false}), CREATESUBJECTANSWERS)
router.get('/all', passport.authenticate('jwt', {session: false}), GETALLSUBJECTANSWERS)

module.exports = router;