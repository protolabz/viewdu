import '../sass/banner.scss';
/*@ngInject*/
export const SubscriptionBanner = {
  template: require('../view/banner.html'),
  bindings: {},
  controllerAs: "ctrl",
  controller:
    class SubscriptionBannerController {
      constructor($scope, $state, SubscriptionService) {
        $scope.state = $state;
        SubscriptionService
          .getSubscriptions()
          .then(function(data){
            console.log('we recieved subscription data', data);
            $scope.subscriptions = data.data;
          },
          function(err){
            console.log('we have errors with getting subscriptions', err);
          })
      }
      
      // injection here
	    static get $inject() {
	      return [
	        '$scope', 
	        '$state' ,
	        'SubscriptionService'
	      ];
      }
    }
  }
