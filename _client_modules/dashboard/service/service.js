/*@ngInject*/
class DashboardService {
  constructor($http) {
    this.$http = $http;
  }

  getLoginCountByDate() {
    return this.$http
          .get('/api/chartdata/auth')
          .then(function(data) {
              console.log('we have recieved chart data', data);
              var queryData = data.data;

              //return value
              var chartData = [];
              queryData.data.forEach(function(element) {
                //Cast the date
                var d = new Date(element.date);
                d.setHours(0,0,0,0);
                
                //Check if we have a date in collection
                if (chartData.filter(e => e.index == d.getTime()).length > 0) {
                  chartData.filter(e => e.index == d.getTime())[0].value++;
                } else {
                  chartData.push({index: d.getTime(), value: 1});
                }
              }, this);

              console.log('transmitting chart data', chartData);
              return chartData;
          },
          function(err) {
            console.log('error retreiving data',err);
            return null;
          });
  }

  getUserNumbersByDate() {
    return this.$http
          .get('/api/chartdata/report/usercreation')
          .then(function(data) {
              console.log('we have recieved chart data', data);
              var queryData = data.data;
              return queryData;
          },
          function(err) {
            console.log('error retreiving data',err);
            return null;
          });
  }
}

export default DashboardService;
