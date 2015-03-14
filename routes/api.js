module.exports = function(server) {
	var Wishlist = require('../models/WishList.js');
	
	server.post('/api/create',function(req,res) {
		var Input = req.body;
		var Model = Wishlist.create();
		Model.name = Input.name;
		Model.description = Input.description;
		Model.items = Input.items;
		Wishlist.save(Model,function(err,Model) {
			res.json({
				err: err,
				Model: Model
			});
		});
		
	});
	
	server.get('/api/get/:id', function(req,res){
		var id = req.params.id;
		Wishlist.search({'_id': id},function(err, Models) {
			if(err) {
				res.json({
					err: err,
					Model: null
				});
			} else {
				res.json({
					err: null,
					Model: Models
				});
			}
		});
	});

	server.put('/api/update/:id',function(req,res){
		var id = req.params.id;
		var Input = req.body;
		Wishlist.search({'_id': id},function(err, Models) {
			if(err) {
				res.json({
					err: err,
					Model: null
				});
			} else {
				var Model = Models[0];
				Model.name = Input.name;
				Model.description = Input.description;
				Model.items = Input.items;
				Wishlist.save(Model,function(err,Model) {
					res.json({
						err: err,
						Model: Model
					});
				});
			}
		});
	});
	
	server.delete('/api/remove/:id',function(req,res){
		
	});
};