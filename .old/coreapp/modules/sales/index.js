import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './config/routes';
import SubscriptionService     from './service/service';
import CartService     from './service/cartservice';
import SubscriptionsController from './controller/subscriptions';
import SubscriptionController  from './controller/subscription';
import CartController  from './controller/cart';
import { SubscriptionBanner } from './component/subscriptionBanner';
import { CartSmallDirective } from './component/cartsmalldirective';

export default angular.module('subscription', [uirouter])
  .config(routes)
  .service('SubscriptionService', SubscriptionService)
  .service('CartService', CartService)
  .controller('SubscriptionsController', SubscriptionsController)
  .controller('SubscriptionController', SubscriptionController)
  .controller('CartController', CartController)
  .component('subscriptionBanner', SubscriptionBanner)
  .component('cartSmall', CartSmallDirective)
  .name;
