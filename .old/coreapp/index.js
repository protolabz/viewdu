import './node_modules/bootstrap/dist/js/bootstrap.min.js';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';
import bootstrap from 'angular-ui-bootstrap';


if (TEST) {
  require('angular-mocks');
}

import './sass/style.scss';
import routing from './config';
import home from './modules/home';
import login from './modules/login';
import signup from './modules/signup';
import user from './modules/user';
import sales from './modules/sales';
import translations from './translations'
import services from './services'
import charts from './modules/charts'
import performance from './modules/performance'

/*@ngInject*/
angular.module('coreapp', [bootstrap,translations, services, uirouter, sanitize, home, login, user, signup, sales, charts, performance])
  .config(routing)
  //Setup state changes
  .run(['$rootScope', ($root) => {
    $root.$on('$stateChangeStart', (e, newUrl, oldUrl) => {
      if (newUrl !== oldUrl) {
        $root.loadingView = true;
      }
    });
    $root.$on('$stateChangeSuccess', () => {
      $root.loadingView = false;
    });
    $root.$on('$stateChangeError', () => {
      $root.loadingView = false;
    });
  }]);

