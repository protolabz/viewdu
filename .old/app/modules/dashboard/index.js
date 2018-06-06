import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './config/routes';
import DashboardController from './controller/dashboard';
import DashboardService from './service/service'

export default angular.module('dashboard', [uirouter])
  .config(routes)
  .service('DashboardService', DashboardService)
  .controller('DashboardController', DashboardController)
  .name;
