//import '../sass/cartcomponentsmall.scss';
/*@ngInject*/
export const UploadProfileImage  = {
    template: require('../view/uploadprofileimage.html'),
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controllerAs: "ctrl",
    controller: 
    class UploadProfileImageController {
      constructor($scope, $state, UserService) {
          $scope.state = $state;
          this.UserService = UserService
          this.user = null;
          this.uploading = false;
      }
      
      $onInit() {
        // fired first
        console.log("oninit", this.resolve); // this.column undefined at this point
        this.user = this.resolve.user;
      }

      cancel() {
        this.close({$value:false});
      }

      save() {
        this.uploading = true;
        var vm = this;
        //image processing
        if (document.getElementById('file').files.length > 0) {
          var f = document.getElementById('file').files[0];
          var r = new FileReader();
          r.onloadend = function(e){
            console.log(e.target.result);
            var data = e.target.result;
            var p = vm;
            vm.UserService
              .uploadImage(vm.user, data)
              .then(function(data) {
                //reload page after image is saved to get the new image
                p.close({$value:true});
              });
          }
          //r.readAsBinaryString(f);
          r.readAsDataURL(f);
        } else 
        {
          alert("No image selected to upload");
          this.uploading = false;
        }
      }
      
      // injection here
	    static get $inject() {
	      return [
	        '$scope', 
          '$state',
          'UserService'
	      ];
      }
    }
  }