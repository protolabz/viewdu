(function () {
'use strict';

angular.module('wetware.Directives').directive('pieChart', pieChart);

function pieChart() {
    return {
        restrict: 'E',
         scope: {
            datachart: '=?',
            xaxislabel: '=?',
            yaxislabel: '=?',
        },
        replace: true,
        template: '<div><nvd3 options="options" data="datachart[0].values"></nvd3></div>',
        controller: pieChartController
    }
}

function pieChartController($scope, $templateCache) {
    //console.log("Pie chart contorller", $scope.xaxislabel);
    $scope.options = {
    chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
    }
}
}
})();