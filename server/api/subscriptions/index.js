'use strict';

var controller = new (require('./subscription.controller'))();
var router = new (require('../../components/routefactory/routefactory'))();

router.get('/',controller.index);
router.delete('/:id',controller.destroy, true, 'admin');
router.get('/:id',controller.show);
router.post('/', controller.create, true, 'admin');

module.exports = router.router;