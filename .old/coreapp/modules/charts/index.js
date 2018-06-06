import './sass/charts.scss';
import angular from 'angular';
import BarChart from './bar';
import LineChart from './line';

export default angular.module('Charts', [BarChart,LineChart]).name;