import angular from 'angular';
import uirouter from 'angular-ui-router';

import { PerformanceBasicBanner } from './component/basicbanner';

export default angular.module('performance', [])
  .component('performanceBasicBanner',PerformanceBasicBanner)
  .name;
