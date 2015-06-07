
// @route('/item')
module.exports.getItems = function(req, res){
	res.ok();
};

// @route('/item/:id')
module.exports.getItem = function(req, res){
	res.send(+req.params.id);
};

// @isLoggedIn()
// @httpGet()
// @route('/private')
module.exports.private = function(req, res){
	res.ok();
};
