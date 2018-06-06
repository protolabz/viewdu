/*@ngInject*/
class CartService {
  constructor(ViewduHTTP, $rootScope, SessionService) {
    this.$http = ViewduHTTP;
    this.$rootScope = $rootScope;
    this.cart = {date: Date.now(), cartItems:[]};
    this.SessionService = SessionService;
  }

  loadCart() {
    var vm = this;
    this.$http
        .get('/api/cart')
        .then(function(data) {
            vm.cart = data.data;
            vm.$rootScope.$broadcast('cart_update', {cart: vm.cart});
        })
  }

  getCart() {
    return this.cart;
  }

  addItemToCart(item) {
    var foundItems = this.cart.cartItems.filter(e => e.item._id == item._id);
    var vm = this;
    if (foundItems.length > 0) {
        foundItems[0].quantity++;
    } else {
        this.cart.cartItems.push({item: item, quantity:0})
    }

    this.$http
        .post('/api/cart/' + this.SessionService.User._id, this.cart)
        .then(function(data){
            vm.$rootScope.$broadcast('cart_update', {cart: vm.cart});
        },
        function(err) {
            console.log('Error in adding items to the cart', err);
        });
  }

  removeItemToCart(item) {
    var foundItems = this.cart.cartItems.filter(e => e.item._id == item._id);
    var vm = this;
    if (foundItems.length > 0) {
        var index = this.cart.cartItems.indexOf(foundItems[0]);
        this.cartItems.splice(index, 0);

        this.$http
            .post('/api/cart/' + this.SessionService.User._id, this.cart)
            .then(function(data){
                vm.$rootScope.$broadcast('cart_update', {cart: vm.cart});
            },
            function(err) {
                console.log('Error in adding items to the cart', err);
            });
    }
  }
}

export default CartService;
