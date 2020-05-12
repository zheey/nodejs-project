'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEEXAMYEAR} = require("../controller/exam_year")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEEXAMYEAR)


module.exports = router;