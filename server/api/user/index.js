'use strict';

var controller = new (require('./user.controller'))();
var router = new (require('../../components/routefactory/routefactory'))();


router.get('/',controller.index,true,'admin');
router.delete('/:id',controller.destroy,true,'admin');
router.get('/me',controller.me,true);
router.put('/:id/password',controller.changePassword,true);
router.put('/:id',controller.save,true);
router.get('/:id',controller.show,true);
router.get('/validate/:email', controller.validateEmail);
router.get('/emailverification/:vid', controller.emailVerification);
router.post('/',controller.create);

router.get('/:userid/profile/image.jpeg', controller.getprofileimage,true);
router.post('/:userid/upload',controller.saveprofileimage,true);

module.exports = router.router;