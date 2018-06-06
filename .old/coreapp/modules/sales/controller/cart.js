import '../sass/cart.scss';
export default class CartController {
  constructor($stateParams, $location, CartService) {
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.CartService = CartService;
  }
}

CartController.$inject = ['$stateParams', '$location', 'CartService'];
