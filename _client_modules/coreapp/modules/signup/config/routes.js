/*@ngInject*/
export default ($stateProvider) => {
  $stateProvider
    .state('signup', {
      url: '/signup',
      template: require('../view/signup.html'),
      controller: 'SignupController',
      controllerAs: 'ctrl'
    });
}
