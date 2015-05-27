

module.exports = function(sails){
    return {
        initialize: function(callback){

            sails.config.routes['GET /test'] = { controller: 'testController', action: 'getTest' };

            callback();
        }
    };
};
