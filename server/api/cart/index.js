'use strict';

var controller = new (require('./cart.controller'))();
var router =new (require('../../components/routefactory/routefactory'))();


router.get('/admin',controller.index, true, 'admin');
router.delete('/:id',controller.destroy, true);
router.get('/:id',controller.show, true);
router.post('/:userid',controller.create, true);
router.get('/',controller.user, true);

module.exports = router.router;