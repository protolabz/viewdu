import '../sass/cartcomponentsmall.scss';
/*@ngInject*/
export const CartSmallDirective  = {
    template: require('../view/cartsmalldirective.html'),
    bindings: {},
    controllerAs: "ctrl",
    controller: 
    class CartSmallController {
      constructor($scope, $state, CartService) {
          $scope.state = $state;
          $scope.cart = CartService.getCart();

          $scope.$on('cart_update', function (event, data) {
            console.log('we have a cart event', data); // 'Data to send'
            $scope.cart = CartService.getCart();
          });

          $scope.$on('user_login', function (event, data) {
            console.log('we have a login event', data); // 'Data to send'
            CartService.loadCart();
          });
      }
      
      // injection here
	    static get $inject() {
	      return [
	        '$scope', 
	        '$state' ,
	        'CartService'
	      ];
      }
    }
  }