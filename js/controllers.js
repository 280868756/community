var communityControllers = angular.module('communityControllers',[]);

communityControllers.controller('QuestionsController',['$scope','QuestionsService',
	function($scope,QuestionsService){
		$scope.questions = QuestionsService.query();
	}]);

/*communityControllers.controller('UserInfoController',['$scope','UserInfoService',
	function($scope,UserInfoService){
		$scope.questions = UserInfoService.query();
	}]);

communityControllers.controller('HotInfoController',['$scope','HotInfoService',
	function($scope,HotInfoService){
		$scope.questions = HotInfoService.query();
	}]);*/