require('should');
var request = require('supertest');

var Sails = require('sails').Sails;


describe('hook annotation router', function(){

    var sails;

    before(function(done){


        this.timeout(11000);

        Sails().lift({
            hooks: {
                'annotation-router': require('../')
            },
            log: {
                level: 'error'
            },
            paths: {
                controllers: __dirname + '/controllers',
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

    it('should have register the route', function(done){
        //console.log(sails.config.paths.controllers);
        console.log(sails.config.routes);

        request(sails.hooks.http.app)
            .get('/test')
            .expect(200, done);

    });
})
