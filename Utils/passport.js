'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
const customerModel = new (require('./../Models/Customer'))();

module.exports = function () {
    passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    },
    function (accessToken, refreshToken, profile, done) {
        const userData = {
            accessToken,
            refreshToken,
            profile
        };
        return done(null, userData);
    }));

    passport.use(new GoogleTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    function (accessToken, refreshToken, profile, done) {
        const userData = {
            accessToken,
            refreshToken,
            profile
        };
        return done(null, userData);
    }));
};