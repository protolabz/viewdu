import '../../node_modules/angular-recaptcha'
import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './config/routes';
import SignupService from './service/service';
import SignupController from './controller/signup';
import UserExists from './directive/user-exists';

export default angular.module('signup', [uirouter, 'vcRecaptcha'])
  .config(routes)
  .service('SignupService', SignupService)
  .controller('SignupController', SignupController)
  .directive('userExists', ['SignupService', (SignupService) => new UserExists(SignupService)])
  .name;
