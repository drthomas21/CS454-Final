app.controller('WishListCtrl',['$scope','$rootScope','RequestService',function($scope,$rootScope,RequestService) {
	$scope.showAddInput = false;
	$scope.tempItem = "";
	
	$scope.Model = {
			_id: 0,
			name: '',
			description: '',
			items: [],
			date: ''
	};
	
	$scope.Objects = [];
	
	var init = function() {
		
	};
	
	$scope.showShortForm = function() {
		$scope.showAddInput = true;
	};
	
	$scope.addItem = function() {
		if($scope.tempItem.trim() != "") {
			$scope.Model.items.push($scope.tempItem.trim());
			console.log($scope.Model);
			$scope.showAddInput = false;
			$scope.tempItem = "";
		}
	};
	
	$scope.removeItem = function(i) {
		$scope.Model.items.splice(i,1);
	};
	
	$scope.create = function() {
		angular.element('body').ready(function(){
		
		});		
	};
	
	$scope.search = function() {
		var matches = window.location.pathname.match(/^\/([A-Za-z0-9]+)/);
		var id = matches[1];
		RequestService.get(id,function(json){
			if(json.err) {
				alert(json.err);
			}
			
			$scope.Model = json.Model;	
		});
	};
	
	$scope.list = function() {
		RequestService.list(function(json){
			if(json.err) {
				alert(json.err);
			}
			
			$scope.Objects = json.Models;			
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
	};
	
	$scope.editModel = function(Model) {
		if(Model) {
			RequestService.edit(Model._id);
		} else {
			RequestService.edit($scope.Model._id);
		}
		
	};
	
	$scope.removeModel = function(Model) {
		var removeCallback = function(json) {
			if(json.err) {
				alert(err);
			} else {
				window.location.href = window.location.href;
			} 
		};
		
		if(Model) {
			RequestService.remove(Model,removeCallback);
		} else {
			RequestService.remove($scope.Model,removeCallback);
		}		
	};
	
	init();
}]);