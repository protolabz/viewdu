import nd3 from'angular-nvd3';
import angular from 'angular';
import BarChartController from './controller/controller';
import BarChartDirective from './directive/directive';

export default angular.module('BarChart', [nd3])
  .controller('BarChartController', BarChartController)
  .directive('barChart', [() => new BarChartDirective()])
  .name;