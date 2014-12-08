var communityDirectives = angular.module('communityDirectives',[]);

communityDirectives.directive('questionItem',
	function(){
		return {
			restrict : 'A',
			replace : true,
			templateUrl: 'templates/question.html'
		}
	});