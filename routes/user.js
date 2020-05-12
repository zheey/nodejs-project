'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {LOGIN, REGISTERUSER, FINDONE, RESETPASSWORD, UPDATEUSER} = require("../controller/user")

router.post('/login', passport.authenticate("local"), LOGIN )
router.post('/password-link', passport.authenticate('jwt', {session: false}), RESETPASSWORD )
router.put('/update', passport.authenticate('jwt', {session: false}), UPDATEUSER)
router.post('/register', REGISTERUSER)
router.get('/verify', FINDONE)

module.exports = router;