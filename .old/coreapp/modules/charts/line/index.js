import '../../../node_modules/angular-nvd3/index';
import angular from 'angular';
import LineChartController from './controller/controller';
import LineChartDirective from './directive/directive';

export default angular.module('LineChart', ['nvd3'])
  .controller('LineChartController', LineChartController)
  .directive('lineChart', [() => new LineChartDirective()])
  .name;