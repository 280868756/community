var community = angular.module('community', [
		"ngRoute",
		"communityControllers",
		"communityServices",
		"communityDirectives"
	]);

community.config(["$routeProvider", 
	function($routeProvider){
		$routeProvider.when("/community",{
			templateUrl: 'templates/community.html',
			controller: 'QuestionsController'
		}).when('/community/question/:questionId',{
			templateUrl: 'templates/questionDetail.html',
			controller: 'QuestionController'
		}).otherwise({
			redirectTo : '/community'
		})
	}]);