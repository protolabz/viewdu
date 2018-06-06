import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import angular from 'angular';

//ViewDu Portal Modules
import core from '../coreapp'
import dashboard from '../dashboard'
import services from '../common_services'

export default angular.module('viewdu', [services, core, dashboard]).name;
