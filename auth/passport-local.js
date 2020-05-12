'use strict';
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const createError = require("http-errors");

const bcrypt = require('bcrypt');

//user model
const User = require('../models/index').user;


passport.use(new LocalStrategy({
        usernameField: 'phone_number',
        passwordField: 'password'},
    (phone_number, password, done) => {
        return User.findOne({
            where:
                {
                    phone_number: phone_number,
                }
        }).then((user) => {
            if(!user){
                return done(createError(401, "Incorrect Login Credentials."));

            }
            if(user.password) {
                return bcrypt.compare(password, user.password).then(function (true_password) {
                    if (true_password !== true) {
                        return done(createError(401, "Incorrect login credentials."));
                    } else {
                        const newUser = JSON.parse(JSON.stringify(user))
                        delete newUser["password"]
                        return done(null, newUser);
                    }
                });

            }else{
                return done(null, {errors: "User has not completed profile setup. Kindly go to the whatsApp platform to complete your profile."});
            }
        }).catch(err => {
            return done(createError(400, err));
        });
    }
));
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
