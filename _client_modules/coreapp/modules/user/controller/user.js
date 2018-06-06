import '../sass/user.scss';
export default class UserController {
  constructor($uibModal, $state, $stateParams, $location, user, SessionService, UserService) {
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.user = user;
    this.user.birthday = new Date(this.user.birthday);

    this.UserService = UserService;
    this.profileImage = null;
    this.$state = $state;
    this.$uibModal = $uibModal;
    SessionService.checkForUser();

    this.birthdayoptions = {
        dateDisabled: false,
        formatYear: 'yy',
        maxDate: Date.now(),
        minDate: new Date(1900,1,1),
        startingDay: 1
      };
    this.altInputFormats = ['M!/d!/yyyy'];
    this.birthdayselector = {opened: false};

    this.genders = ['Male', 'Female', 'Mixed'];
     
    //get user image
    var vm = this;
    UserService
      .getUserImage(this.user)
      .then(function(data){
        console.log("we got user image", data);
        vm.profileImage = data;
      })

    console.log('we have user', this.user);
  }

  openBirthdaySelector() {
    this.birthdayselector.opened = true;
  }

  openImageDialog() {
    var vm = this;
      var modalInstance = this.$uibModal.open({
        animation: true,
        backdrop  : 'static',
        keyboard  : false,
        component: 'uploadProfileImageModal',
        resolve: {
          user: function() {
            return vm.user;
          }
        }
      });
    
      modalInstance.result.then(function (result) {
        console.log(result);
        if (result)
          vm.$state.reload();
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });
  };

showSaveWaitWindow() {
    var vm = this;
    this.saveModalInstance = this.$uibModal.open({
        animation: true,
        backdrop  : 'static',
        keyboard  : false,
        component: 'userSaveModal'
      });
  };

  save() {
      console.log('saving user', this.user);
      var vm = this;
      this.showSaveWaitWindow();
      
      //save user
      this.UserService
        .saveUser(this.user)
        .then(function(d) {
          vm.saveModalInstance.close();
        });
  }
}

UserController.$inject = ['$uibModal','$state','$stateParams', '$location', 'user', 'SessionService', 'UserService'];
