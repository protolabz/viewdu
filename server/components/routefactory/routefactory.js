var express = require('express');
var auth = require('../../auth/auth.service');
var perf = require('../performance/performance');


module.exports = 
class RouteFactory {

    constructor() {
        this.exp_router = express.Router();
    }

    //called in part of the res.send process
    get(url, callback, checkedLogin, requiredPermission) {

        //performance checker is first item on list
        var callbackArray = [perf.ProcessRequest];

        //we need to validate login
        if(checkedLogin === true)
            callbackArray.push(auth.isAuthenticated());

        //Add permission set if needed
        if (requiredPermission && requiredPermission.length > 0)
            callbackArray.push(auth.hasRole(requiredPermission))

        callbackArray.push(callback);

        //create route
        return this.exp_router.get(url,callbackArray);
    }

    //called in part of the res.send process
    put(url, callback, checkedLogin, requiredPermission) {

        //performance checker is first item on list
        var callbackArray = [perf.ProcessRequest];

        //we need to validate login
        if(checkedLogin === true)
            callbackArray.push(auth.isAuthenticated());

        //Add permission set if needed
        if (requiredPermission && requiredPermission.length > 0)
            callbackArray.push(auth.hasRole(requiredPermission))

        callbackArray.push(callback);

        //create route
        return this.exp_router.put(url,callbackArray);
    }

    //called in part of the res.send process
    post(url, callback, checkedLogin, requiredPermission) {

        //performance checker is first item on list
        var callbackArray = [perf.ProcessRequest];

        //we need to validate login
        if(checkedLogin === true)
            callbackArray.push(auth.isAuthenticated());

        //Add permission set if needed
        if (requiredPermission && requiredPermission.length > 0)
            callbackArray.push(auth.hasRole(requiredPermission))

        callbackArray.push(callback);

        //create route
        return this.exp_router.post(url,callbackArray);
    }

    //called in part of the res.send process
    delete(url, callback, checkedLogin, requiredPermission) {

        //performance checker is first item on list
        var callbackArray = [perf.ProcessRequest];

        //we need to validate login
        if(checkedLogin === true)
            callbackArray.push(auth.isAuthenticated());

        //Add permission set if needed
        if (requiredPermission && requiredPermission.length > 0)
            callbackArray.push(auth.hasRole(requiredPermission))

        callbackArray.push(callback);

        //create route
        return this.exp_router.delete(url,callbackArray);
    }

    get router() {
        return this.exp_router;
    }
}
