(function() {
	var Instance = null;
	app.factory('RequestService',['$rootScope','$http',function($rootScope,$http){
		var RequestService = function() {
			//Address Change
			this.view = function(id) {
				window.location.href = ("/"+id)
			};
			
			this.edit = function(id) {
				window.location.href = ("/"+id+"?edit=true");
			};
			
			//API Calls
			this.create = function(Model,callback) {
				$http.post('/api/create',Model)
				.success(function(data) {
					callback(data);
				})
				.error(function(data,status) {
					
				});
			};
			
			this.get = function(id,callback) {
				$http.get('/api/get/'+id)
				.success(function(data) {
					callback(data);
				})
				.error(function(data,status) {
					
				});
			};
			
			this.list = function(callback) {
				$http.get('/api/get')
				.success(function(data) {
					callback(data);
				})
				.error(function(data,status) {
					
				});
			};
			
			this.search = function(query,callback) {
				$http.get('/api/search',query)
				.success(function(data) {
					callback(data);
				})
				.error(function(data,status) {
					
				});
			};
			
			this.update = function(Model,callback) {
				$http.put('/api/update/'+Model._id,Model)
				.success(function(data) {
					callback(data);
				})
				.error(function(data,status) {
					
				});
			};
			
			
			
			this.remove = function(Model,callback) {
				$http.delete('/api/remove/'+Model._id,Model)
				.success(function(data) {
					callback(data);
				})
				.error(function(data,status) {
					
				});
			}
		};
		
		if(Instance == null) {
			Instance = new RequestService();
		}
		
		return Instance;
	}]);
})();