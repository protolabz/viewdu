/*@ngInject*/
export default ($stateProvider) => {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      template: require('../view/dashboard.html'),
      controller: 'DashboardController',
      controllerAs: 'ctrl'
    });
}
