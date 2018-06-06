//import '../sass/home.scss';
export default class LineChartController {
  constructor($location, $scope) {
    this.$location = $location;
    this.$scope = $scope;

    console.log('line chart scope', $scope);

    if (angular.isUndefined(this.$scope.smoothLine))
        this.$scope.smoothLine = false;
    if (angular.isUndefined($scope.showYAxis))
        this.$scope.showYAxis = false;

    this.$scope.options = {
        chart: {
            type: 'lineChart',
            height: 500,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.index; },
            y: function(d){ return d.value; },
            dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: (!this.$scope.xaxislabel ? 'XAxis' : this.$scope.xaxislabel)
            },
            yAxis: {
                axisLabel: (!this.$scope.yaxislabel ? 'YAxis' : this.$scope.yaxislabel),
                axisLabelDistance: -10,
                tickFormat: function(d){
                        return d3.format('.02f')(d);
                }
            }
        }
    }

    if (angular.isUndefined(this.$scope.isdate))
        this.$scope.isdate = false;

    if (this.$scope.isdate) {
        console.log('line chart is a date format');
        this.$scope.options.chart.xAxis.tickFormat = function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    };
        this.$scope.options.chart.xAxis.showMaxMin = false;
        this.$scope.options.chart.xAxis.staggerLabels = true;
    }
  }
}

LineChartController.$inject = ['$location', '$scope'];
