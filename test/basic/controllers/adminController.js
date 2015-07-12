// @isAdmin()
module.exports = {

    // @route('/admin/items')
    getItems: function(req, res){
    	res.ok();
    },


    // @route('/admin/items/:id')
    getItem: function(req, res){
    	res.send(+req.params.id);
    },
};
