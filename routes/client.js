module.exports = function(server) {
	server.get('/',function(req,res) {
		res.render('layouts/index');
	});
	
	server.get('/wishlists',function(req,res) {
		res.render('layouts/index');
	});
	
	server.get('/:whatever',function(req,res) {
		res.render('layouts/index');
	});
	
	server.get('/views/:view',function(req,res){
		res.render('views/'+req.params.view);
	});
};