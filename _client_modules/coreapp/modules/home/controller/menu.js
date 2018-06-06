import '../sass/home.scss';
export default class MenuController {
  constructor($scope, $location, SessionService, LocaleService, NavigationService) {
    this.$location = $location;

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.getService = function() {
      return LocaleService;
    }

    //Menus collections
    if (NavigationService)
      $scope.menus = NavigationService.Menus;


    $scope.LoggedIn = SessionService.LoggedIn;
    $scope.user = SessionService.User;

    $scope.$on('user_login', function (event, data) {
          console.log('we have a login event', data); // 'Data to send'
          $scope.LoggedIn = SessionService.LoggedIn;
          $scope.user = SessionService.User;
        });
  }
}

MenuController.$inject = ['$scope', '$location','SessionService', 'LocaleService','NavigationService'];
