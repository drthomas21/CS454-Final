app.controller('WishListCtrl',['$scope','$rootScope', '$location', '$timeout', 'RequestService',function($scope,$rootScope,$location,$timeout,RequestService) {
	$scope.showAddInput = false;
	$scope.tempItem = "";
	$scope.selectedList;
	$scope.newItem = "";
	$scope.Model = {};
	$scope.id = null;
	$scope.updatedId = null;
	$scope.updated = false;
	
	$scope.allWishlists = [];

	var url = $location.absUrl().split('/');
	
	var resetModel = function() {
		$scope.Model = {
			_id: 0,
			name: '',
			description: '',
			items: [],
			date: ''
		};
	}

	var init = function() {
		$scope.create();
		$scope.getList();
		resetModel();
	};
	
	$scope.showShortForm = function() {
		$scope.showAddInput = true;
	};
	
	$scope.addItem = function() {
		if($scope.tempItem.trim() != "") {
			$scope.Model.items.push($scope.tempItem.trim());
			$scope.showAddInput = false;
			$scope.tempItem = "";
		}
	};

	$scope.addToExisting = function() {
		// get the wishlist model
		RequestService.get($scope.selectedList._id, function(result) {
			var model = result.Model;
			model.items.push($scope.newItem);
			update(model);
			$scope.newItem = "";
			$scope.updatedId = model._id;
			// get the list again after 400ms
			$timeout(function(){
				$scope.getList();
			},400);
		});
	}
	
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
	
	$scope.getList = function() {
		$scope.allWishlists = null;
		RequestService.list(function(json){
			if(json.err) {
				alert(json.err);
			}
			$scope.allWishlists = json.Models;
			$scope.selectedList = $scope.allWishlists[0];
		});
	};

	$scope.viewModel = function(id) {
		RequestService.view(id);
	}
	
	$scope.createModel = function() {
		RequestService.create($scope.Model,function(json){
			resetModel();
			$scope.getList();
			//$scope.Model = json.Model;
			if($scope.err) {
				alert($scope.err);
			} else {
				//RequestService.view($scope.Model._id);
			}
		});
	};

	// update the model without affecting the form ('welcome' view)
	var update = function(Model) {
		RequestService.update(Model,function(json){
			if($scope.err) {
				alert($scope.err);
			} else {
				// display "model updated!" in UI
				$scope.updatedId = json.Model._id;
				//RequestService.view($scope.Model._id);
			}
		});
	}
	
	// update model based on form input, from 'view' view
	$scope.updateModel = function() {
		RequestService.update($scope.Model,function(json){
			$scope.Model = json.Model;
			if($scope.err) {
				alert($scope.err);
			} else {
				// display "model updated!" in UI
				window.location.href = "/";
				//RequestService.view($scope.Model._id);
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
				window.location.href = "/";
			}
		};
		
		if(Model) {
			RequestService.remove(Model,removeCallback);
		} else {
			RequestService.remove($scope.Model,removeCallback);
		}
	};
	
	// get the id from the url
	// if the 
	if(url[url.length-1].length != 0 && url[url.length-1].localeCompare('wishlists') != 0) {
		$scope.id = url[url.length -1];
		$scope.search();
	}

	init();
}]);