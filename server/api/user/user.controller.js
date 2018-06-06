'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var email = require('../../email');
var Guid = require('guid');

var path = require('path');
var fs = require('file-system');
var perf = require('../../components/performance/performance');

module.exports = 
class UserController {

    constructor() {
    }

    validationError(res, err) {
        return perf.ProcessResponse(res).json(422, err);
    };

    /**
     * Get list of users
     * restriction: 'admin'
     */
    index(req, res) {
        User.find({}, '-salt -hashedPassword', function(err, users) {
            if (err) return perf.ProcessResponse(res).send(500, err);
            perf.ProcessResponse(res).json(200, users);
        });
    };

    /**
     * Validates if user email already exists
     */
    validateEmail(req, res) {
        var email = req.params.email;
        console.log('validating email', email);
        User.findOne({provider: 'local', email:email}, function(err, user) {
            if (err) return perf.ProcessResponse(res).json({err:err});
            if (!user) return perf.ProcessResponse(res).json({exists:false});
            perf.ProcessResponse(res).json({exists:true});
        });
    };

    emailVerification(req, res) {
        var vid = req.params.vid;
        console.log('validating email', vid);
        User.findOne({'state.emailVeriId':vid}, function(err, user) {
            console.log('validate email user found', user, user._id);
            if (err) return validationError(res, err);
            if (!user) return validationError(res, err);
            
            //update user
            user.state.validateViaEmailRequired = false;
            User.findByIdAndUpdate(user._id, user, function(err, saved) {
                if (err) return validationError(res, err);
                console.log('validate email user saved', saved, err);
                res.redirect('/#!/login?type=2');
            });
        });
    };

    /**
     * Creates a new user
     */
    create(req, res, next) {
        var newUser = new User(req.body);
        newUser.provider = 'local';
        newUser.role = 'user';
        newUser.date = Date.now();
        newUser.state = {
            extendedDetailsRequired:true,
            validateViaEmailRequired:true,
            emailVeriId: Guid.raw()
        };
        newUser.save(function(err, user) {
            if (err) return validationError(res, err);
            var data = {
                creation: true,
                redirect: '/#!/users/emailvalidation'
            };

            var emailData = { emailVeriId: user.state.emailVeriId, domain: process.env.DOMAIN };

            email.EmailService.SendMailTemplate('welcome', process.env.EMAIL_USER, user.email, emailData, function(err) {});
            console.log('sending create user data', data, user);
            perf.ProcessResponse(res).json(200, data);
        });
    };

    save(req, res, next) {
        var updated = req.body;
        var userId = req.params.id;

        User.findById(userId, function(err, user) {
            if (err) return next(err);
            if (!user) return perf.ProcessResponse(res).send(401);
            
            user.name = updated.name;
            user.email = updated.email;
            user.mobile = updated.mobile;
            user.address = updated.address;
            user.city = updated.city;
            user.country = updated.country;
            user.postcode = updated.postcode;
            user.gender = updated.gender;
            user.birthday = updated.birthday;
            user.job = updated.job;
            user.addressstate = updated.addressstate;
            user.state.extendedDetailsRequired = false;
            user.date = Date.now();

            console.log('saving user', user, updated);

            user.save(function(err, user) {
                if (err) return validationError(res, err);
                perf.ProcessResponse(res).json(200, {updated:true});
            });
        });
    };

    /**
     * Get a single user
     */
    show(req, res, next) {
        var userId = req.params.id;

        User.findById(userId, function(err, user) {
            if (err) return next(err);
            if (!user) return perf.ProcessResponse(res).send(401);
            perf.ProcessResponse(res).json(user);
        });
    };

    /**
     * Deletes a user
     * restriction: 'admin'
     */
    destroy(req, res) {
        User.findByIdAndRemove(req.params.id, function(err, user) {
            if (err) return perf.ProcessResponse(res).send(500, err);
            return perf.ProcessResponse(res).send(204);
        });
    };

    /**
     * Change a users password
     */
    changePassword(req, res, next) {
        var userId = req.user._id;
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);

        User.findById(userId, function(err, user) {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                user.save(function(err) {
                    if (err) return validationError(res, err);
                    perf.ProcessResponse(res).send(200);
                });
            } else {
                perf.ProcessResponse(res).send(403);
            }
        });
    };

    /**
     * Get my info
     */
    me(req, res, next) {
        var userId = req.user._id;
        User.findOne({
            _id: userId
        }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
            if (err) return next(err);
            if (!user) return perf.ProcessResponse(res).json(401);
            perf.ProcessResponse(res).json(user);
        });
    };

    /**
     * Authentication callback
     */
    authCallback(req, res, next) {
        res.redirect('/');
    };
    
    saveprofileimage(req, res, next) {
        var tempPath = req.body;
        console.log("saving image", req.body);
        var userid = req.params.userid;
        var targetPath = 'profileimages/' + userid + '.base64';
        
        fs.writeFile(targetPath, req.body.data , function(err) {
          if (err) {
             perf.ProcessResponse(res).send(500, { error: 'Failed to write file' });
          }
          perf.ProcessResponse(res).send("File write success");
        });
    }
    
    getprofileimage(req, res, next) {
        var userid = req.params.userid;
        console.log("geting profile image", userid);
        perf.ProcessResponse(res).sendfile(path.resolve('profileimages/' + userid + '.base64'));
    }

}

