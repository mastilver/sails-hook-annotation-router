module.exports = function(role){
    return function(req, res, next){
        res.write(role);
        next();
    };
};
