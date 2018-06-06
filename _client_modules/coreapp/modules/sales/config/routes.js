/*@ngInject*/
export default ($stateProvider) => {
  $stateProvider
    .state('subscriptions', {
      url: '/subcriptions',
      template: require('../view/subscriptions.html'),
      controller: 'SubscriptionsController',
      controllerAs: 'ctrl',
      resolve: {
        subscriptions: (SubscriptionService, $stateParams) => {
          return SubscriptionService.getSubscriptions($).then((object) => {
            console.log('we recieved subscriptions', object.data);
            return object.data;
          });
        }
      }
    })
    .state('subscription', {
      url: '/subscriptions/:subid',
      template: require('../view/subscription.html'),
      controller: 'SubscriptionController',
      controllerAs: 'ctrl',
      resolve: {
        subscription: (SubscriptionService, $stateParams) => {
          console.log('asking for subscription', $stateParams.subid);
          return SubscriptionService.getSubscription($stateParams.subid).then((object) => {
            console.log('we recieved user', object.data);
            return object.data;
          });
        }
      }
    })
    .state('cart', {
      url: '/cart',
      template: require('../view/cart.html'),
      controller: 'CartController',
      controllerAs: 'ctrl',
      resolve: {
        
      }
    });
}
