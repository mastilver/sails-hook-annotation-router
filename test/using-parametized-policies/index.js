require('should');
var request = require('supertest');

var Sails = require('sails').Sails;


describe('hook annotation router', function(){

    var sails;

    before(function(done){


        this.timeout(11000);

        Sails().lift({
            hooks: {
                'annotation-router': require('../../'),
                'parametized-policies': require('sails-hook-parametized-policies'),
                grunt: false,
            },
            log: {
                level: 'error'
            },
            paths: {
                controllers: __dirname + '/controllers',
                policies: __dirname + '/policies',
                policyFactories: __dirname + '/policyFactories',
            },
        }, function(err, _sails){

            if(err) return done(err);

            sails = _sails;

            return done();
        });
    });

    after(function(done){

        if(sails){
            sails.lower(done);
        }

    });



    it('should start the sails server', function(){
        return true;
    });

    it('should register the getItems route', function(done){
        request(sails.hooks.http.app)
            .get('/items')
            .expect(200, done);
    });

    it('should register the getItem route', function(done){
        request(sails.hooks.http.app)
            .get('/items/5')
            .expect(200)
            .expect('LogIn5', done);
    });



    it('should register the private route', function(done){
        request(sails.hooks.http.app)
            .get('/private')
            .expect(200)
            .expect('Admin', done);
    });

    it('should register the other private route', function(done){
        request(sails.hooks.http.app)
            .get('/other')
            .expect(200)
            .expect('Admin', done);
    });
})
