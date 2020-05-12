'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEYEAR, RETRIEVEYEARS} = require("../controller/year")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEYEAR)
router.get('/all', passport.authenticate('jwt', {session: false}), RETRIEVEYEARS)


module.exports = router;