'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('facebook', { scope : ['email'] }))

.get('/callback', passport.authenticate('facebook', {
    //successRedirect: '/app',
    failureRedirect: '/signup',
    session: false
}), auth.setTokenCookie);

module.exports = router;