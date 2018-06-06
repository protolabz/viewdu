import '../sass/subscription.scss';
export default class SubscriptionController {
  constructor($stateParams, $location, subscription) {
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.subscription = subscription;

    console.log('we have subscription', this.subscription);
  }
}

SubscriptionController.$inject = ['$stateParams', '$location', 'subscription'];
