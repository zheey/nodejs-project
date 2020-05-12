'use strict';

const express = require('express')
const router = express.Router()
const passport = require('passport');
const {CREATEUSERSPONSOR, GETALLSPONSOR} = require("../controller/scholarship")

router.post('/new', passport.authenticate('jwt', {session: false}), CREATEUSERSPONSOR)
router.get('/all', GETALLSPONSOR)


module.exports = router;