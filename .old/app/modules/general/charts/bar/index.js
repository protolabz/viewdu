import '../../../../node_modules/angular-nvd3/index';
import angular from 'angular';
import BarChartController from './controller/controller';
import BarChartDirective from './directive/directive';

export default angular.module('BarChart', ['nvd3'])
  .controller('BarChartController', BarChartController)
  .directive('barChart', [() => new BarChartDirective()])
  .name;