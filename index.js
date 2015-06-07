var path = require('path');

var annotationRouter = require('annotation-router');

module.exports = function(sails){
    return {
        configure: function(){

            var controllersFolder = sails.config.paths.controllers;
            var pattern = controllersFolder + '/**/*Controller.js';

            var routes = annotationRouter.sync(pattern)

            routes.map(function(route){

                var controllerName = path.join(path.relative(controllersFolder, route.controller.dir), route.controller.name);

                // make it work for windows
                controllerName = controllerName.split(path.sep).join('/');

                var actionName = route.actionName

                sails.config.routes[route.method + ' ' + route.url] = {
                    controller: controllerName,
                    action: actionName,
                };


                // Handle policies

                for(var policy in route.annotations){

                    if(!(controllerName in sails.config.policies)){
                        sails.config.policies[controllerName] = {};
                    }

                    if(!(actionName in sails.config.policies[controllerName])){
                        sails.config.policies[controllerName][actionName] = [];
                    }

                    sails.config.policies[controllerName][actionName].push(policy);
                }
            });
        }
    };
};
