/*@ngInject*/
class SubscriptionService {
  constructor(ViewduHTTP) {
    this.$http = ViewduHTTP;
  }

  test() {
    return 'Testing service';
  }

  getSubscriptions() {
    return this.$http.get('/api/subscriptions');
  }

  getSubscription(subId) {
    return this.$http.get('/api/subscriptions/' + subId);
  }
}

export default SubscriptionService;
