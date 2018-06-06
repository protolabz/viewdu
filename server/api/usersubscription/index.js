'use strict';


var controller = new (require('./usersubscription.controller'))();
var router =new (require('../../components/routefactory/routefactory'))();

router.get('/', controller.index, true, 'admin');
router.delete('/:id',controller.destroy, true, 'admin');
router.get('/:id',controller.show, true);
router.post('/',controller.create, true);

module.exports = router.router;