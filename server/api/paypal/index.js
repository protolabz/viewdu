'use strict';

var paypal = new (require('./paypal.controller'))();
var router =new (require('../../components/routefactory/routefactory'))();

// get all the users, permissions, etc
paypal.init();
router.post('/create',paypal.create, true);
router.get('/approvalReturn',paypal.approvalReturn, true);
router.post('/execute',paypal.execute, true);
router.post('/cancel',paypal.cancel, true);
router.get('/callback', function(req, res){console.log("we have paypal information", req.query);});

module.exports = router.router;