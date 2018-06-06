/*@ngInject*/
class SignupService {
  constructor(ViewduHTTP) {
    this.$http = ViewduHTTP;
  }

  signup(email, password) {
    console.log('signing up user', email, password);
    return this.$http.post('/api/users/', {email:email, password:password})
            .then(function (response) {
                console.log('signed up user:', response.data);
                return response.data;
            }).catch(function(err) {
                console.log(' error signing up ' + err);
            });
  }

  checkEmail(email) {
    return this.$http.get('/api/users/validate/' + email)
            .then(function (response) {
                console.log('found checked users:', response.data);
                return response.data.exists;
            }).catch(function(err) {
                console.log(' error ' + err);
            });
  }
}

export default SignupService;
