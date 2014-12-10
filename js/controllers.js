var communityControllers = angular.module('communityControllers',[]);

communityControllers.controller('QuestionsController',['$scope','QuestionsService',
	function($scope,QuestionsService){
		$scope.questions = QuestionsService.query();
	}]);

communityControllers.controller('UserInfoController',['$scope','$http','UserInfoService',
	function($scope,$http,UserInfoService){
		//这个参数可以在路由的时候传进来$routeParams
		$scope.userInfo = UserInfoService.get({userName:'LittleDouBi'});
		//两种方式，用$http也可以
		// $http({method : 'GET',url : 'data/LittleDouBi.json'}).success(function(data){
		// 	console.log(data);
		// 	$scope.userInfo = data;
		// });
	}]);

communityControllers.controller('HotInfoController',['$scope','HotInfoService',
	function($scope,HotInfoService){
		$scope.hotInfo = HotInfoService.get();
	}]);

communityControllers.controller('QuestionController',['$scope','$routeParams','QuestionService',
	function($scope,$routeParams,QuestionService){
		$scope.question = QuestionService.get({questionId:$routeParams.questionId});
		$scope.focus = function(){
			$scope.question.focus += 1; 
		}
		$scope.collect = function(){
			$scope.question.collect += 1; 
		}
	}]);
