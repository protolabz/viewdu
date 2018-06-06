'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');
var auth = require('./auth.service');
var perf = require('../components/performance/performance');


// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
router.use('/google', require('./google'));

//Localised routes for special reasons
router.get('/logout', auth.logoutUser)
router.get('/getactiveuser', perf.ProcessRequest, auth.isAuthenticated(), auth.getActiveUser)
router.post('/passwordreset', auth.resetPassword)

module.exports = router;