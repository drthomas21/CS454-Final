app.factory('RequestService',['$http',function($http){
var RequestService = {
	//Address Change
	view: function(id) {
		window.location.href = ("/"+id)
	},
	
	edit: function(id) {
		window.location.href = ("/"+id+"?edit=true");
	},

	//API Calls
	create: function(Model,callback) {
		$http.post('/api/create',Model)
		.success(function(data) {
			callback(data);
		})
		.error(function(data,status) {
			
		});
	},
	
	get: function(id,callback) {
		$http.get('/api/get/'+id)
		.success(function(data) {
			callback(data);
		})
		.error(function(data,status) {
			
		});
	},
	
	list: function(callback) {
		$http.get('/api/get')
		.success(function(data) {
			callback(data);
		})
		.error(function(data,status) {
			
		});
	},
	
	search: function(query,callback) {
		$http.get('/api/search',query)
		.success(function(data) {
			callback(data);
		})
		.error(function(data,status) {
			
		});
	},
	
	update: function(Model,callback) {
		$http.put('/api/update/'+Model._id,Model)
		.success(function(data) {
			callback(data);
		})
		.error(function(data,status) {
			
		});
	},
	
	remove: function(Model,callback) {
		$http.delete('/api/remove/'+Model._id,Model)
		.success(function(data) {
			callback(data);
		})
		.error(function(data,status) {
			
		});
	}
};

return RequestService;

}]);