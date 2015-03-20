module.exports = function(server,mongoose) {
	var Wishlist = require('../models/WishList.js')(mongoose);
	
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
	
	server.get('/api/get', function(req,res){
		Wishlist.get(function(err, results) {
			res.json({
				err: err,
				Models: results
			});
		});
	});
	
	server.get('/api/get/:id', function(req,res){
		var id = req.params.id;
		Wishlist.search({'_id': id},function(err, results) {
			var Model = null;
			if(results && results.length > 0) {
				Model = results[0];
			} else if(!err){
				err = "Object does not exists";
			}
			
			res.json({
				err: err,
				Model: Model
			});
		});
	});

	server.put('/api/update/:id',function(req,res){
		var id = req.params.id;
		var Input = req.body;
		Wishlist.search({'_id': id},function(err, results) {
			if(err) {
				res.json({
					err: err,
					Model: null
				});
			} else if(results.length > 0){
				var Model = results[0];
				Model.name = Input.name;
				Model.description = Input.description;
				Model.items = Input.items;
				Wishlist.save(Model,function(err,Model) {
					res.json({
						err: err,
						Model: Model
					});
				});
			} else {
				res.json({
					err: "Object does not exists",
					Model: null
				});
			}
		});
	});
	
	server.delete('/api/remove/:id',function(req,res){
		var id = req.params.id;
		Wishlist.search({'_id': id},function(err, results) {
			if(!err && results.length > 0) {
				var Model = results[0];
				Wishlist.remove(Model);
			} else if(Models.length == 0) {
				err = "Object does not exists";
			}
			
			res.json({
				err: err,
				Model: null
			});
		});
	});
};
