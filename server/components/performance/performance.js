'use strict';

//Called inline of route
function processRequest(req, res, next) {
    
    //clear headers
    res.append('vd_pm_c2s', -1);
        
    //Do processing only if turned on
    if (process.env.PERFORMANCE_MONTITORING === 'false') {
        return next();
    }

    //Instantly note time 
    var recieved = Date.now();

    //check if we have recieved a header with testing information in it
    // if so lets do some pre-processing
    if (req.get('vd_pm_stamp')){
        console.log('User processed date', req.get('vd_pm_stamp'))
        var sentTime = req.get('vd_pm_stamp');

        //determine the difference
        var determineDifference = recieved - sentTime;

        //Append that to the headers for later
        res.set('vd_pm_c2s', determineDifference);

        //Note internal processing time
        res.locals.vd_pm_arrived = recieved;
    }
    next();
}

//called in part of the res.send process
function processResponse(res) {

    //clear headers
    res.append('vd_pm_s2s', -1);
    res.append('vd_pm_s2cstamp', -1);

    //Do processing only if turned on
    if (process.env.PERFORMANCE_MONTITORING === 'false')
        return res;

    //Instantly note time 
    var recieved = Date.now();

    //determine if we are actually processing at the moment
    if (res.locals.vd_pm_arrived) {
        console.log('server processed date', res.locals.vd_pm_arrived)
        var sentTime = res.locals.vd_pm_arrived;

        //determine the difference
        var determineDifference = recieved - sentTime;

        //Append that to the headers for later
        res.set('vd_pm_s2s', determineDifference);
        res.set('vd_pm_s2cstamp', recieved);
    }

    return res;
}

exports.ProcessRequest = processRequest;
exports.ProcessResponse = processResponse;