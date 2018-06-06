import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import angular from 'angular';
import uirouter from 'angular-ui-router';

//ViewDu Portal Modules
import services from '../common_services'
import charts from '../charts'

import routes from './config/routes';
import DashboardController from './controller/dashboard';
import DashboardService from './service/service';
import navigation from './config/navigation';

export default angular.module('dashboard', [uirouter, services, charts])
  .config(routes)
  .service('DashboardService', DashboardService)
  .controller('DashboardController', DashboardController)
  .run(['NavigationService', 'SessionService', (NavigationService, SessionService) => { navigation.build(NavigationService, SessionService); }])
  .name;
