var communityDirectives = angular.module('communityDirectives',[]);

communityDirectives.directive('questionItem',
	function(){
		return {
			restrict : 'A',
			scrope: {},
			//replace : true,//这个地方设为true就报错啊...
			templateUrl: 'templates/question.html'
		}
	});