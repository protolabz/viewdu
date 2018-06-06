//import '../sass/cartcomponentsmall.scss';
/*@ngInject*/
export const UserSaveModal  = {
    template: require('../view/usersavemodal.html'),
    bindings: {},
    controllerAs: "ctrl",
    controller: 
    class UserSaveModalController {
      constructor($scope, $state) {
          $scope.state = $state;
      }
      
      // injection here
	    static get $inject() {
	      return [
	        '$scope', 
	        '$state'
	      ];
      }
    }
  }