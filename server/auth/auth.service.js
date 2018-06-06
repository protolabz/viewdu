'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var ChartData = new (require('../api/chartdata/chartdata.controller'))();
var smsService = new (require('../components/sms/smsservice'))();
var email = require('../email');
var perf = require('../components/performance/performance');

var validateJwt = expressJwt({
    secret: config.secrets.session,
    getToken: function fromHeaderOrQuerystring (req) {
        console.log("Getting token JWT");
        console.log("Cookies: ",req.cookies);
        
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.tokens) {
      return JSON.parse(req.cookies.tokens);
    }
    return null;
  }
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            console.log("Validating JWT");
            var vm = res;
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                console.log('adding headers');
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            console.log("We are querying database");
            User.findById(req.user._id, function(err, user) {
                if (err) return next(err);
                if (!user) return next({name: 'UnauthorizedError', status: 401});
                 console.log("We are querying database", user);
                req.user = user;
                next();
            });
        });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                perf.ProcessResponse(res).send(403);
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
    return jwt.sign({
        _id: id
    }, config.secrets.session, {
        expiresIn: 60 * 60 * 2 //2 hours of data
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
    console.log("creating cookie");
    if (!req.user) return res.json(404, {
        message: 'Something went wrong, please try again.'
    });
    var userdetails = req.user; 
    var token = signToken(userdetails._id, userdetails.role);
    res.cookie('tokens', JSON.stringify(token));

    console.log("user details", userdetails);
    console.log("adding cookie and now redirecting");

    console.log('Updating chart data');
    ChartData.addDataRecord('auth', {userid: userdetails._id, date: Date.now() });

    var url = '';
    //Check if we need to set new user details
    if (userdetails.state.validateViaEmailRequired)
        url ='/#!/users/emailvalidation';
    else if (userdetails.state.extendedDetailsRequired)
        url ='/#!/users/' + userdetails._id;
    else
        url ='/app';

    //Process Differently for local user
    if (userdetails.local)
        res.json(200, {success: true, redirect:url})
    else
        res.redirect(url);

    
}

/**
 * Logs out the current user
 */
function logoutUser(req, res) {
    console.log("logout user", req.cookies);
    //remove token item
    var cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }

    console.log("logout user", req.cookies);
    res.redirect('/');   
}

/**
 * Logs out the current user
 */
function getActiveUser(req, res) {
    console.log("getting active user");
    req.user.hashedPassword = "****";
    req.user.salt = "****";
    req.user.state = "****";
    perf.ProcessResponse(res).json(req.user);   
}

function resetPassword(req, res) {
        console.log("resetting password", req.body);
        var userEmail = String(req.body.email);
        User.findOne({email: userEmail}, function(err, user) {
            if (err) return perf.ProcessResponse(res).send(404);
            if (!user) return perf.ProcessResponse(res).send(404);
             console.log("resetting password user", user);
            var newPassword = "resetTest";
            user.password = newPassword;
            return user.save(function(err, user) {
                if (err) return perf.ProcessResponse(res).send(404);
                if (!user) return perf.ProcessResponse(res).send(404);
                
                 console.log("password saved and now sending to user response", user);

                if (user.mobile && user.mobile.length >= 10){
                    console.log("Sending sms reset");
                    smsService.sendSMS(user.mobile, "Your password has been changed to: " + newPassword, 
                    function(err, message){console.log("SMS data err", err);console.log("SMS data message", message);});
                }

                if (user.email)
                {
                    var emailData = { newPassword: newPassword, username: user.name };
                    email.EmailService.SendMailTemplate('passwordReset', process.env.EMAIL_USER, user.email, emailData, function(err) {});
                }

                return perf.ProcessResponse(res).send(200)
            });
        });
};


exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.logoutUser = logoutUser;
exports.getActiveUser = getActiveUser;
exports.resetPassword = resetPassword;