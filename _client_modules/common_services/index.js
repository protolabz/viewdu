import angular from 'angular';

import SessionService from './session';
import viewduhttp from './viewduhttp';
import PerformanceLog from './performancelog';
import navigationservice from './navigation';

export default angular.module('Common_Services',[])
  .service('SessionService', SessionService)
  .service('ViewduPerformanceLog', PerformanceLog)
  .service('ViewduHTTP', viewduhttp)
  .service('NavigationService',navigationservice)
  .name;
