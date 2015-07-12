var path = require('path');

var annotationRouter = require('annotation-router');

module.exports = function(sails){

    var controllersFolder = sails.config.paths.controllers;
    var pattern = controllersFolder + '/**/*Controller.js';

    var handledController = {};

    return {
        configure: function(){

            var routes = annotationRouter.sync(pattern)

            routes.map(handleRoute);

            var parametizedPoliciesHook = sails.hooks['parametized-policies'];

            if(!!parametizedPoliciesHook){
                parametizedPoliciesHook.configure();
            }
        }
    };



    function handleRoute(route){
        var controllerName = path.join(path.relative(controllersFolder, route.controller.dir), route.controller.name);

        // make it work for windows
        controllerName = controllerName.split(path.sep).join('/');

        var actionName = route.actionName

        sails.config.routes[route.method + ' ' + route.url] = {
            controller: controllerName,
            action: actionName,
        };


        // Handle policies

        if(!handledController[controllerName]){
            addPolicies(controllerName, '*', route.controller.rawAnnotations);
        }

        addPolicies(controllerName, actionName, route.rawAnnotations);

        handledController[controllerName] = true;
    }


    function addPolicies(controllerName, actionName, policies){
        if(!(controllerName in sails.config.policies)){
            sails.config.policies[controllerName] = {};
        }

        for(var policyName in policies){

            if(!(actionName in sails.config.policies[controllerName])){
                sails.config.policies[controllerName][actionName] = [];
            }

            for(var i = 0, len = policies[policyName].length; i < len; i++){
                var policy = policies[policyName][i];
                sails.config.policies[controllerName][actionName].push(policy);
            }
        }
    }

};
