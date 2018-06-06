/*@ngInject*/
class SessionService {
  constructor($http, $window) {
    this.$http = $http;
    this.$window = $window;
    this.userdetails = null;
    this.GetActiveUser().then((d) => this.userdetails = d);
  }

  get User() {
      return this.userdetails;
  }

  GoToMyAccount() {
      console.log('userdetails', this.userdetails);
      this.$window.open('/#!/users/' + this.userdetails._id);
  }

  GetActiveUser() {
    return this.$http
          .get('http://localhost:9000/auth/getactiveuser')
          .then(function(data) {
              console.log('we have recieved active user', data.data);
              return data.data;
          },
          function(err) {
            console.log('error retreiving active user',err);
            return null;
          });
  }
}

export default SessionService;
