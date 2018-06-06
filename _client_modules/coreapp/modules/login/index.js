import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './config/routes';
import LoginService from './service/service';
import LoginController from './controller/login';
import CheckAccount from './directive/check-account';

export default angular.module('login', [uirouter])
  .config(routes)
  .service('LoginService', LoginService)
  .controller('LoginController', LoginController)
  .directive('checkAccount', ['LoginService', (LoginService) => new CheckAccount(LoginService)])
  .name;
