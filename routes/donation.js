'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEDONATION, RETRIEVEDONATIONS} = require("../controller/donation")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEDONATION)
router.get('/all', passport.authenticate('jwt', {session: false}), RETRIEVEDONATIONS)


module.exports = router;