/*'use strict';

var should = require('should');
var app = require('../../app');
var Cart = require('./cart.model');

var cart = new Cart({
    provider: 'local',
    name: 'Fake Cart',
    email: 'test@test.com',
    password: 'password'
});

describe('Cart Model', function() {
    before(function(done) {
        // Clear carts before testing
        Cart.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Cart.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no carts', function(done) {
        Cart.find({}, function(err, carts) {
            should.not.exist(err);
            carts.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate cart', function(done) {
        cart.save(function() {
            var cartDup = new Cart(cart);
            cartDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        cart.email = '';
        cart.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate cart if password is valid", function() {
        return cart.authenticate('password').should.be.true;
    });

    it("should not authenticate cart if password is invalid", function() {
        return cart.authenticate('blah').should.not.be.true;
    });
});*/