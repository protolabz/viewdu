import nd3 from'angular-nvd3';
import angular from 'angular';
import LineChartController from './controller/controller';
import LineChartDirective from './directive/directive';

export default angular.module('LineChart', [nd3])
  .controller('LineChartController', LineChartController)
  .directive('lineChart', [() => new LineChartDirective()])
  .name;