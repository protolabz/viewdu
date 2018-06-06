'use strict';
/*
var should = require('should');
var app = require('../../app');
var ChartData = require('./chartdata.model');

var chartdata = new ChartData({
    provider: 'local',
    name: 'Fake ChartData',
    email: 'test@test.com',
    password: 'password'
});

describe('ChartData Model', function() {
    before(function(done) {
        // Clear chartdatas before testing
        ChartData.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        ChartData.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no chartdatas', function(done) {
        ChartData.find({}, function(err, chartdatas) {
            should.not.exist(err);
            chartdatas.should.have.length(0);
            done();
        });
    });

    it('should fail when saving a duplicate chartdata', function(done) {
        chartdata.save(function() {
            var chartdataDup = new ChartData(chartdata);
            chartdataDup.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    it('should fail when saving without an email', function(done) {
        chartdata.email = '';
        chartdata.save(function(err) {
            should.exist(err);
            done();
        });
    });

    it("should authenticate chartdata if password is valid", function() {
        return chartdata.authenticate('password').should.be.true;
    });

    it("should not authenticate chartdata if password is invalid", function() {
        return chartdata.authenticate('blah').should.not.be.true;
    });
});*/