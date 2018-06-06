import './node_modules/bootstrap/dist/js/bootstrap.min.js';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';

if (TEST) {
  require('angular-mocks');
}

import './sass/style.scss';
import routing from './config';
import home from './modules/home';
//import post from './modules/post';
//import comment from './modules/comment';
//import user from './modules/user';
import translations from './translations'
import dashboard from './modules/dashboard';
import charts from './modules/general/charts'
import services from './services'

/*@ngInject*/
angular.module('app', [translations, services, uirouter, sanitize, home, /*post, comment, user,*/ charts, dashboard])
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
