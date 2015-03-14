app.controller('WishListCtrl',['$scope','$rootScope','RequestService',function($scope,$rootScope,RequestService) {
	$scope.Model = {
			_id: 0,
			name: '',
			description: '',
			items: [],
			date: ''
	};
	
	var init = function() {
		
	};
	
	$scope.search = function() {
		var matches = window.location.pathname.match(/^\/([A-Za-z0-9]+)/);
		var id = matches[1];
		RequestService.get(id,function(json){
			if(json.err) {
				alert(json.err);
			}
			
			if(json.Model.length > 0) {
				$scope.Model = json.Model[0];
			}			
		});
	};
	
	$scope.createModel = function() {
		RequestService.create($scope.Model,function(json){
			$scope.Model = json.Model;
			if($scope.err) {
				alert($scope.err);
			} else {
				RequestService.view($scope.Model._id);
			}
			
		});
	};
	
	$scope.updateModel = function() {
		RequestService.update($scope.Model,function(json){
			$scope.Model = json.Model;
			if($scope.err) {
				alert($scope.err);
			} else {
				RequestService.view($scope.Model._id);
			}
			
		});
	}
	
	$scope.editModel = function() {
		RequestService.edit($scope.Model._id);
	};
	init();
}]);