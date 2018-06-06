import angular from 'angular';
import 'lodash';

import 'angular-translate';
import 'angular-translate-loader-url';
import 'angular-translate-loader-static-files';
import translationHelper from './config/translationHelper.js'
import translationProvider from './config/translationProvider.js'
import translationListConfig from './config/translationListConfig.js'
import translationDefault from './config/translationDefault.js'
import localeService from './services/locale'


/*@ngInject*/
export default angular.module('translations', ['pascalprecht.translate'])
  //Configure Translations
  .service('LocaleService', localeService)
  .config(['$translateProvider', translationProvider])
  .provider('translationHelper', () => new translationHelper())
  .config(['$translateProvider', 'translationHelperProvider',translationListConfig])
  .run(['$translate','LocaleService',translationDefault])
  .name;

