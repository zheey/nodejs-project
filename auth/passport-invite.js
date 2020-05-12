'use strict';
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const auth_secret = process.env.auth_secret || require('./auth_key')();
const createError = require('http-errors');
const Invite = require('../models/index').invite; //get the user model
const User_Scholarship = require('../models/index').user_scholarship;
const Scholarship = require('../models/index').user_scholarship;
const User = require('../models/index').user;


//This verifies that the token sent by the user is valid
passport.use('scholarship-jwt', new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey: auth_secret,

    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromHeader('token')
}, async (token, done) => {
    try {
        //console.log('token:', token)
        if (!token || !token.id) {
            return done(createError(401, 'Invalid Scholarship Token.'));
        }
        //check if userId actually exists in DB
        return User_Scholarship.findOne({
            where:
                {
                    userId: token.id,
                    scholarshipId: token.scholarshipId

                }, include: [{model: Scholarship}, {model: User}]
        }).then((user_data) => {


            if (!user_data || user_data === null) {
                return done(createError(401, 'Invalid/Expired Scholarship Token.'));
            } else {

                return done(null, user_data);
            }
        }).catch(err => {
            return done(err);
        })

    } catch (error) {
        done(error);
    }
}));

module.exports = function () {

    passport.serializeUser(function (user, done) {
        //console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        //console.log(user);
        done(null, user);
    });

};