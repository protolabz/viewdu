'use strict';

var Cart = require('./cart.model');
var config = require('../../config/environment');
var Guid = require('guid');
var perf = require('../../components/performance/performance');

module.exports = 
class CartController {

    constructor() {
    }

    index(req, res) {
        Cart.find({}, function(err, carts) {
            if (err) return perf.ProcessResponse(res).status(500).json(err);
            if (!carts) return perf.ProcessResponse(res).status(400).json([]);
            perf.ProcessResponse(res).status(200).json(carts);
        });
    };

    user(req, res) {
        console.log('requesting user cart if saved');
        var user = req.user;

        if (!user)
            perf.ProcessResponse(res).status(404).json({redirect:'\#!\login'});

        Cart.findOne({userid:user._id}, function(err, cart) {
             console.log('user cart', cart);
            if (err) return perf.ProcessResponse(res).status(500).json(err);
            if (!cart) return  perf.ProcessResponse(res).status(200).json({userid: user._id, cartItems:[], date: Date.now()});
            perf.ProcessResponse(res).status(200).json(cart);
        });
    };

    /**
     * Creates a new cart
     */
    create(req, res, next) {
        console.log("Saving Cart", req.body);
        var newCart = new Cart();
        var user = req.user;
        newCart.cartItems = req.body.cartItems;
        newCart.userid = user._id;
        newCart.date = Date.now();
        newCart.save(function(err, cart) {
            if (err) return validationError(res, err);
            var data = {
                creation: true,
                data: cart
            };
           perf.ProcessResponse(res).status(200).json(data);
        });
    };

    /**
     * Get a single cart
     */
    show(req, res, next) {
        var cartId = req.params.id;
        var user = req.user;
        Cart.findOne({userid: user._id, _id:cartId}, function(err, cart) {
            if (err) return next(err);
            if (!cart) return perf.ProcessResponse(res).send(401);
            perf.ProcessResponse(res).status(200).json(cart);
        });
    };

    /**
     * Deletes a cart
     * restriction: 'admin'
     */
    destroy(req, res) {
        var user = req.user;
        Cart.remove({userid: user._id, _id:req.params.id}, function(err, cart) {
            if (err) return perf.ProcessResponse(res).send(500, err);
            return perf.ProcessResponse(res).send(204);
        });
    };
}

