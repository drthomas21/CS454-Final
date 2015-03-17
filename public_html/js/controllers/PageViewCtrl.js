app.controller('PageViewCtrl',['$scope','$rootScope',function($scope,$rootScope) {
	$scope.src = "";
	
	var init = function() {
		if(window.location.pathname == "/" || window.location.pathname == "") {
			$scope.src = "/views/welcome";
		} else if(window.location.pathname == "/wishlists") {
			$scope.src = "/views/list";		
		} else if(window.location.pathname.match(/^\/[A-Za-z0-9]+/)) {
			if(window.location.search.match(/\?edit=true/)) {
				$scope.src = "/views/modify";
			} else {
				$scope.src = "/views/view";
			}			
		}
		
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	};
	
	init();
}]);