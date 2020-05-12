'use strict';
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const auth_secret = require('./auth_key');
const init = require('./passport');
const User = require('../models/index').user;


const options = {//secret we used to sign our JWT
                    secretOrKey: auth_secret(),

                    //we expect the user to send the token as a query paramater with the name 'secret_token'
                    jwtFromRequest: ExtractJWT.fromHeader('token')
}

//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy(options, async (token, done) => {
    try {
        //check if userId actually exists in DB
        return User.findOne({
            where:
                {
                    id: token.user.id,
                }
        }).then((user_data) => {

            if (!user_data) {
                return done(null, false, {message: 'expired token'});
            } else {

                return done(null, token.user);
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
