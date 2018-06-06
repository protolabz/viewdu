/*@ngInject*/
export default ($stateProvider) => {
  $stateProvider
    .state('emailValidation', {
      url: '/users/emailvalidation',
      template: require('../view/emailvalidation.html')/*,
      controller: 'UsersController',
      controllerAs: 'users',
      resolve: {
        users: (UserService) => {
          return UserService.getUsers().then((object) => {
            return object.data;
          });
        }
      }*/
    })
    .state('user', {
      url: '/users/:userId',
      template: require('../view/user.html'),
      controller: 'UserController',
      controllerAs: 'user',
      resolve: {
        user: (UserService, $stateParams) => {
          console.log('asking for user', $stateParams.userId);
          return UserService.getUser($stateParams.userId).then((object) => {
            console.log('we recieved user', object.data);
            return object.data;
          });
        }
      }
    });
}
