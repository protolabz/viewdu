import angular from 'angular';

import SessionService from './session';
import viewduhttp from './viewduhttp';
import PerformanceLog from './performancelog';

export default angular.module('services',[])
  .service('SessionService', SessionService)
  .service('ViewduPerformanceLog', PerformanceLog)
  .service('ViewduHTTP', viewduhttp)
  .name;
