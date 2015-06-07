require('should');
var request = require('supertest');

var Sails = require('sails').Sails;


describe('hook annotation router', function(){

    var sails;

    before(function(done){


        this.timeout(11000);

        Sails().lift({
            hooks: {
                'annotation-router': require('../'),
                grunt: false,
            },
            log: {
                level: 'error'
            },
            paths: {
                controllers: __dirname + '/controllers',
                policies: __dirname + '/policies',
            },
            policies: {
                //'*': ['isLoggedIn']
            }
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
            .get('/item')
            .expect(200, done);
    });

    it('should register the getItem route', function(done){
        request(sails.hooks.http.app)
            .get('/item/5')
            .expect(200)
            .expect(5, done);
    });

    it('should register controller inside a subfolder', function(done){
        request(sails.hooks.http.app)
            .get('/test')
            .expect(200, done);
    });

    it('should allow the user to access /private route', function(done){
        request(sails.hooks.http.app)
            .get('/private')
            .expect(403, done);
    })
})
