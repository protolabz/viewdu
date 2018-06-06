//import '../sass/home.scss';
export default class BarChartController {
  constructor($location, $scope) {
    this.$location = $location;
    this.$scope = $scope;

    console.log('bar chart scope', $scope);

    //Check height
    this.height = $scope.height;
    if(!this.height) {
        this.height = 500;
    }

    // console.log("bar chart contorller", $scope.xaxislabel);
    this.$scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: this.$scope.height,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,/*
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },*/
        transitionDuration: 500,
        xAxis: {
            axisLabel: (!this.$scope.xaxislabel ? 'XAxis' : this.$scope.xaxislabel)
        },
        yAxis: {
            axisLabel: (!this.$scope.yaxislabel ? 'YAxis' : this.$scope.yaxislabel),
            axisLabelDistance: 30
        }
      }
    }
  }
}

BarChartController.$inject = ['$location', '$scope'];
