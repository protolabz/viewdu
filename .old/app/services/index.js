import angular from 'angular';

import SessionService from './session';

export default angular.module('services',[])
  .service('SessionService', SessionService)
  .name;
