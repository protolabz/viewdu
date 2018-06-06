import '../sass/signup.scss';
export default class SignupController {
  constructor(SignupService, $location, vcRecaptchaService, $window) {
    this.SignupService = SignupService;
    this.$location = $location;
    this.vcRecaptchaService = vcRecaptchaService;
    this.$window = $window;

    this.email = "";
    this.password = "";
    this.user = {};
    this.company = {};
    this.captcha = {};
    this.isProcessing = false;
  }

  signup()
  {
    console.log("sign up new user", this.email, this.password);
            if(!this.signupForm.$valid) {
               console.log('Form is invalid');
               return;
            }
    this.isProcessing = true;
    var vm = this;
    this.SignupService
      .signup(this.email, this.password)
      .then(
        function(data) {
          if (data.redirect)
            vm.$window.location.href = data.redirect;
      });
  }

  setWidgetId(widgetId) {
            // store the `widgetId` for future usage.
            // For example for getting the response with
            // `recaptcha.getResponse(widgetId)`.
            console.info('getting widgetId');
            this.captcha.widgetid = widgetId;
  };

  setResponse(response) {
            // send the `response` to your server for verification.
            console.info('Response available');
            this.captcha.response = response;
  };

  cbExpiration() {
            // reset the 'response' object that is on scope
           console.info('Captcha expired. Resetting response object');
           vcRecaptchaService.reload(this.captcha.widgetId);
           this.captcha.response = null;
  };
}

SignupController.$inject = ['SignupService', '$location', 'vcRecaptchaService', '$window'];
