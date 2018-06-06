/*'use strict';

var should = require('should');
var app = require('../../app');
var UserSubscription = require('./usersubscription.model');

var usersubscription = new UserSubscription({
    provider: 'local',
    name: 'Fake UserSubscription',
    email: 'test@test.com',
    password: 'password'
});

describe('UserSubscription Model', function() {
    before(function(done) {
        // Clear usersubscriptions before testing
        UserSubscription.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        UserSubscription.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no usersubscriptions', function(done) {
        UserSubscription.find({}, function(err, usersubscriptions) {
            should.not.exist(err);
            usersubscriptions.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate usersubscription', function(done) {
        usersubscription.save(function() {
            var usersubscriptionDup = new UserSubscription(usersubscription);
            usersubscriptionDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        usersubscription.email = '';
        usersubscription.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate usersubscription if password is valid", function() {
        return usersubscription.authenticate('password').should.be.true;
    });

    it("should not authenticate usersubscription if password is invalid", function() {
        return usersubscription.authenticate('blah').should.not.be.true;
    });
});*/