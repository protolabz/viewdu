/*@ngInject*/
class UserService {
  constructor(ViewduHTTP) {
    this.$http = ViewduHTTP;
  }

  getUsers() {
    return this.$http.get('/api/users');
  }

  getUser(usreId) {
    return this.$http.get('/api/users/' + usreId);
  }
  
  getUserImage(user) {
    return this.$http
      .get('/api/users/' + user._id + '/profile/image.jpeg')
      .then(function(data) {
        return data.data;
      });
  }

  saveUser(user) {
    return this.$http
              .put('/api/users/' + user._id, user)
              .then(function(data) {
                console.log("we have saved user data", data);
                return data;
              },
              function(err) {
                console.log("We have an error when saving user data", err);
                throw err;
              });
  }
  
  uploadImage(user, data) {
    return this.$http
              .post('/api/users/' + user._id + '/upload', {data: data})
              .then(function(data) {
                console.log("we have saved user image", data);
                return data;
              },
              function(err) {
                console.log("We have an error when saving user image", err);
                throw err;
              });
  }
}

export default UserService;
