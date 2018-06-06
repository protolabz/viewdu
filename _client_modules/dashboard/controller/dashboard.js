import '../sass/dashboard.scss';
export default class DashboardController {
  constructor($location, DashboardService) {
    this.$location = $location;

    DashboardService.getLoginCountByDate();

    this.data2 = [{
      key:'Static Data One', 
      color: '#ff7f0e',
      area: false,
      values:[
          {_id: 1, label:1, index:1, value:3},
          {_id: 2, label:2, index:2, value:10},
          {_id: 3, label:3, index:3, value:15},
          {_id: 4, label:4, index:4, value:6},
        ]
      }
    ]

    this.data = [];
    var vm = this;
    DashboardService
      .getLoginCountByDate()
      .then(function(data) {
        vm.data.push({key:'User Activity', area: true, values:data});
      });
    
    DashboardService
      .getUserNumbersByDate()
      .then(function(data) {
        vm.data.push({key:'Users Created', area: true, values:data});
      });
  }
}

DashboardController.$inject = ['$location','DashboardService'];
