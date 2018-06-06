/*@ngInject*/
export default ($stateProvider) => {
  $stateProvider
    .state('login', {
      url: '/login',
      template: require('../view/login.html'),
      controller: 'LoginController',
      controllerAs: 'ctrl'
    });
}
