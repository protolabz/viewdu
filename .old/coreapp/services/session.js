/*@ngInject*/
class SessionService {
  constructor($rootScope, $window, $timeout, ViewduHTTP) {
    this.$window = $window;
    this.userdetails = null;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
    this.ViewduHTTP = ViewduHTTP;
  }

  checkForUser() {
    if (this.userdetails == null) {
      console.log('checking for user')
      var vm = this;
      vm
        .GetActiveUser()
        .then(
            function(data) {
              vm.userdetails = data;
              vm.$rootScope.$broadcast('user_login', {user: data});
            });
    }
  }

  get User() {
      return this.userdetails;
  }

  set User(user) {
      this.userdetails = user;
  }

  get LoggedIn() {
    return this.userdetails != null;
  }

  GoToMyAccount() {
      console.log('userdetails', this.userdetails);
      this.$window.open('/#!/users/' + this.userdetails._id);
  }

  GetActiveUser() {
    return this.ViewduHTTP
          .get('/auth/getactiveuser')
          .then(function(data) {
              return data.data;
          },
          function(err) {
            console.log('error retreiving active user',err);
            return null;
          });
  }
}

export default SessionService;
