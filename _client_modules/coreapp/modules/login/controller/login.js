import '../sass/login.scss';
export default class LoginController {
  constructor(LoginService, $location, $window, SessionService) {
    this.loginService = LoginService;
    this.$location = $location;
    this.$window = $window;
    this.sessionService = SessionService;

    this.email = "";
    this.password = "";
    this.failed = false;
    this.confirmResetPassword = false;

    console.log('location search', $location.search())
    if (this.$location.search().type && this.$location.search().type === '2')
      this.successfulEmailValidation = true;
  }

  loginUser()
  {
    console.log("Attempt to log in user", this.email, this.password);
    var vm = this;
    vm.failed = false;
    this.loginService
      .login(this.email, this.password)
      .then(function(data) {
        if (data.redirect)
          vm.$window.location.href = data.redirect;
        else
          alert("Login Failed");
      })
      .catch(function(err) {
        console.log('Error from log in', err);
        vm.failed = true;
      });
  }

  forgotPassword()
  {
    console.log("forgot password");
    var vm = this;
    this.confirmResetPassword = false;
    this.loginService
      .resetPassword(this.email)
      .then(function(data) {
        vm.confirmResetPassword = true;
      })
      .catch(function(err) {
        console.log('Error from log in', err);
      });
  }

  signup()
  {
    console.log("sign up new user");
    this.$window.location.href = "/#!/signup";
  }
}

LoginController.$inject = ['LoginService', '$location', '$window', 'SessionService'];
