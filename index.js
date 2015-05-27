var path = require('path');

var annotationRouter = require('annotation-router');

module.exports = function(sails){
    return {
        initialize: function(callback){

            var controllersFolder = sails.config.paths.controllers
            var pattern = controllersFolder + '/**/*Controller.js';

            annotationRouter(pattern, function(err, route){

                var controllerName = path.relative(controllersFolder, route.controller.full)
                                         .slice(0, -route.controller.ext.length);

                sails.config.routes[route.method + ' ' + route.url] = {
                    controller: controllerName,
                    action: route.actionName,
                };

            }, callback);
        }
    };
};
