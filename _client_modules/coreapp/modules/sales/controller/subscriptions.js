import '../sass/subscriptions.scss';
export default class SubscriptionsController {
  constructor($window, $stateParams, $location, subscriptions, CartService, SessionService) {
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.subscriptions = subscriptions;
    this.CartService = CartService;
    this.$window = $window;
    this.SessionService = SessionService;
  }

  addSubscription(subscript) {
    this.CartService.addItemToCart(subscript);
  }

  sendTologin() {
    this.$window.location.href ="/#!/login";
  }
}

SubscriptionsController.$inject = ['$window','$stateParams', '$location', 'subscriptions','CartService','SessionService'];
