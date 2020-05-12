'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATETEST} = require("../controller/web-question")
const {CREATEONEQUESTION, CREATEONEQUESTIONWITHOPTION, RETRIEVEQUESTIONS, CREATEBULKQUESTIONWITHOPTION} = require("../controller/question")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEONEQUESTION)
router.post('/question', passport.authenticate('jwt', {session: false}), CREATEONEQUESTIONWITHOPTION)
router.post('/bulk-question', passport.authenticate('jwt', {session: false}), CREATEBULKQUESTIONWITHOPTION)
router.post('/all' , passport.authenticate('jwt', {session: false}), RETRIEVEQUESTIONS)
router.post('/web-create',  passport.authenticate('jwt', {session: false}), CREATETEST)


module.exports = router;