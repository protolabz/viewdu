/*'use strict';

var should = require('should');
var app = require('../../app');
var Subscription = require('./subscription.model');

var subscription = new Subscription({
    provider: 'local',
    name: 'Fake Subscription',
    email: 'test@test.com',
    password: 'password'
});

describe('Subscription Model', function() {
    before(function(done) {
        // Clear subscriptions before testing
        Subscription.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Subscription.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no subscriptions', function(done) {
        Subscription.find({}, function(err, subscriptions) {
            should.not.exist(err);
            subscriptions.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate subscription', function(done) {
        subscription.save(function() {
            var subscriptionDup = new Subscription(subscription);
            subscriptionDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        subscription.email = '';
        subscription.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate subscription if password is valid", function() {
        return subscription.authenticate('password').should.be.true;
    });

    it("should not authenticate subscription if password is invalid", function() {
        return subscription.authenticate('blah').should.not.be.true;
    });
});*/