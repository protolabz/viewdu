/**
 * Module One Routes
 */

'use strict';

module.exports = function(app, routeprovider, performanceProvider) {
    // Insert routes below
    routeprovider.get('/testing', function(req,res,next) {
        performanceProvider.ProcessResponse(res).status(200).send('Module One Route, Local Parameter:' + process.env.MODULE_ONE_PARAMETER);
    }, false);

    return routeprovider.router;
};