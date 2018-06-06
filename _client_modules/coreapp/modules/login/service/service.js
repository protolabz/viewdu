/*@ngInject*/
class LoginService {
  constructor(ViewduHTTP) {
    this.$http = ViewduHTTP;
  }

  login(email, password) {
    console.log('logging in user', email, password);
    return this.$http.post('/auth/local', {email:email, password:password})
            .then(function (response) {
                console.log('Logging on user', response.data);
                return response.data;
            }).catch(function(err) {
                console.log(' error ', err);
                throw err;
            });
  }

  checkEmail(email) {
    return this.$http.get('/api/users/validate/' + email)
            .then(function (response) {
                console.log('found checked users:', response.data);
                return response.data.exists;
            }).catch(function(err) {
                console.log(' error ', err);
                throw err;
            });
  }

  resetPassword(email) {
    return this.$http.post('/auth/passwordreset', {email: email})
            .then(function (response) {
                console.log('Password has been reset:', response.data);
                return response.data.exists;
            }).catch(function(err) {
                console.log(' error resetting password ', err);
                throw err;
            });
  }
}

export default LoginService;
