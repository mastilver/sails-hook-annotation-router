// @isLoggedIn()
module.exports = {

	// @route('/items')
	getItems: function(req, res){
		res.ok();
	},

	// @route('/items/:id')
	getItem: function(req, res){
		res.write(req.params.id)
		res.ok();
	},

	// @is('Admin')
	// @httpGet()
	// @route('/private')
	private: function(req, res){
		res.ok();
	},
}
