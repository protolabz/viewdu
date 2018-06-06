import HomeController from '../controller/home';
import '../sass/menu.scss';
let $locale = null;
let $session = null;
let $userId = null;

/*@ngInject*/
export default class Menu {
  constructor(LocaleService, SessionService) {
    this.template = require('../view/menu.html');
    this.restrict = 'E';
    this.scope = {};
    this.controller = HomeController;
    $locale = LocaleService;
    $session = SessionService;
  }

  // optional compile function
  compile(tElement) {
    return this.link.bind(this);
  }

  // optional link function
  link(scope, element, attributes, controller) {
    scope.isActive = function(viewLocation) {
      return viewLocation === controller.$location.path();
    };

    scope.getService = function() {
      return $locale;
    }

    scope.goToMyAccount = function() {
      $session.GoToMyAccount();
    }
  }
}
