import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';
import bootstrap from 'angular-ui-bootstrap';

//ViewDu Portal Modules
import services from '../common_services'
import charts from '../charts'

//Core modules
import './sass/style.scss';
import routing from './config';
import home from './modules/home';
import login from './modules/login';
import signup from './modules/signup';
import user from './modules/user';
import sales from './modules/sales';
import translations from './translations'

import performance from './modules/performance'

/*@ngInject*/
export default angular.module('coreapp', [bootstrap,translations, services, uirouter, sanitize, home, login, user, signup, sales, charts, performance])
  .config(routing)
  .run(['NavigationService',(NavigationService) => {console.log('testing',NavigationService)}])
  .name;

