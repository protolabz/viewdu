/*'use strict';

var should = require('should');
var app = require('../../app');
var Cart = require('./performance.model');

var performance = new Cart({
    provider: 'local',
    name: 'Fake Cart',
    email: 'test@test.com',
    password: 'password'
});

describe('Cart Model', function() {
    before(function(done) {
        // Clear performances before testing
        Cart.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Cart.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no performances', function(done) {
        Cart.find({}, function(err, performances) {
            should.not.exist(err);
            performances.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate performance', function(done) {
        performance.save(function() {
            var performanceDup = new Cart(performance);
            performanceDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        performance.email = '';
        performance.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate performance if password is valid", function() {
        return performance.authenticate('password').should.be.true;
    });

    it("should not authenticate performance if password is invalid", function() {
        return performance.authenticate('blah').should.not.be.true;
    });
});*/