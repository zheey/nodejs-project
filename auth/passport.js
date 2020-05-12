const passport = require('passport');

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