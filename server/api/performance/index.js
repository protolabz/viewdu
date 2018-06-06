'use strict';

module.exports = function (app) {

    var controller = new (require('./performance.controller'))(app);
    var router =new (require('../../components/routefactory/routefactory'))();

    router.get('/admin',controller.index, true, 'admin');
    router.delete('/:id',controller.destroy, true);
    router.get('/:id',controller.show, true);
    router.post('/',controller.create, true);

    return router.router;
}
