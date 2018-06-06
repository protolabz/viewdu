'use strict';

var controller = new (require('./chartdata.controller'))();
var router =new (require('../../components/routefactory/routefactory'))();

router.get('/:code', controller.retreive, true);
router.get('/report/usercreation', controller.getUsersCreationDates, true);
router.post('/', controller.addRecordFromClient, true);

module.exports = router.router;