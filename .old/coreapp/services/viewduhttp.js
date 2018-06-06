/*@ngInject*/
class ViewduHTTP {

  constructor($q, $http, ViewduPerformanceLog) {
    this.$http = $http;
    this.$q = $q;
    this.plog = ViewduPerformanceLog;

    //properties for storing timings
    this.timings = [];
  }

  get(url) {
    var vm = this;
    return this.$q(function(resolve, reject) {
            var start = Date.now();
            vm.$http
              .get(url, {headers: {'vd_pm_stamp':start}})
              .then(function(data){
               vm.ExtractMakers(data);
               resolve(data);
              },
              function (data) {
                vm.ExtractMakers(data);
                reject(data);
              })
          
          });
  }

  post(url,data) {
    var vm = this;
    return this.$q(function(resolve, reject) {
            var start = Date.now();
            vm.$http
              .post(url, data, {headers: {'vd_pm_stamp':start}})
              .then(function(data){
               vm.ExtractMakers(data);
               resolve(data);
              },
              function (data) {
                vm.ExtractMakers(data);
                reject(data);
              })
          
          });
  }


  put(url, data) {
    var vm = this;
    return this.$q(function(resolve, reject) {
            var start = Date.now();
            vm.$http
              .put(url, data, {headers: {'vd_pm_stamp':start}})
              .then(function(data){
               vm.ExtractMakers(data);
               resolve(data);
              },
              function (data) {
                vm.ExtractMakers(data);
                reject(data);
              })
          
          });
  }

  del(url) {
    var vm = this;
    return this.$q(function(resolve, reject) {
            var start = Date.now();
            vm.$http
              .del(url, {headers: {'vd_pm_stamp':start}})
              .then(function(data){
               vm.ExtractMakers(data);
               resolve(data);
              },
              function (data) {
                vm.ExtractMakers(data);
                reject(data);
              })
          
          });
  }

  ExtractMakers(data) {
    //Mark current time
    var recieved = Date.now();
    var ClientToServer = 0;
    var ServerProcessing = 0;
    var ServerToClient = 0;

    //Attempt to locate all the headers
    //Client to server timing
    if(data.headers('vd_pm_c2s'))
      ClientToServer = Number(data.headers('vd_pm_c2s'));

    //Server to Server Timing
    if(data.headers('vd_pm_s2s')) 
      ServerProcessing = Number(data.headers('vd_pm_s2s'));

    //Posted timings
    if(data.headers('vd_pm_s2cstamp') && Number(data.headers('vd_pm_s2cstamp')) > 0)
      ServerToClient = recieved - Number(data.headers('vd_pm_s2cstamp'));

    //Just log output for the moment
    console.log('@@---> ', data.headers('vd_pm_c2s'), data.headers('vd_pm_s2s'), data.headers('vd_pm_s2cstamp'));
    console.log('@@---> ', ClientToServer, ServerProcessing, ServerToClient);
    console.log('@@[]---> ', this.plog.MonitorReadings);

    //Log the data
    this.plog.LogReadings(ClientToServer, ServerProcessing, ServerToClient);

  }
  
}

export default ViewduHTTP;
