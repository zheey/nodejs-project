'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATESCHOLARSHIP, VERIFYSCHOLARSHIP, SCHOLASHIPLINK, GETALLSCHOLARSHIPS, GETONESCHOLARSHIP} = require("../controller/test")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATESCHOLARSHIP)
router.post('/generate', passport.authenticate('jwt', {session: false}), SCHOLASHIPLINK)
router.post('/verify', passport.authenticate('jwt', {session: false}), VERIFYSCHOLARSHIP)
router.get('/all', passport.authenticate('jwt', {session: false}), GETALLSCHOLARSHIPS)
router.get('/one', passport.authenticate('jwt', {session: false}), GETONESCHOLARSHIP)


module.exports = router;