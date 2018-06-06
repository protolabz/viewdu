'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) { 
    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {
            message: 'Something went wrong, please try again.'
        });

        req.user = user;
        req.user.local = true;
        next();

        /*var token = auth.signToken(user._id, user.role);
        res.json({
            token: token
        });*/
    })(req, res, next)
}, auth.setTokenCookie);

module.exports = router;