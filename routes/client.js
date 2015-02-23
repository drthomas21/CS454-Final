module.exports = function(server) {
	server.get('/',function(req,res) {
		res.render('layouts/pages/index');
	});
};