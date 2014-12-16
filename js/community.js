var community = angular.module('community', [
		"ngRoute",
		"communityControllers",
		"communityServices",
		"communityDirectives",
		"communityFilters"
	]);

community.config(["$routeProvider", 
	function($routeProvider){
		$routeProvider.when("/community",{
			templateUrl: 'templates/community.html',
			controller: 'QuestionsController'
		}).when('/community/question/:questionId',{
			templateUrl: 'templates/questionDetail.html',
			controller: 'QuestionController'
		}).when('/community/userInfo/:userName',{
			templateUrl: 'templates/userInfo.html',
			controller: 'UserInfoController'
		}).otherwise({
			redirectTo : '/community'
		})
	}]);