var communityServices = angular.module('communityServices',[
		'ngResource'
	]);

communityServices.factory('QuestionsService',['$resource', 
	function($resource){
		return $resource('data/questions.json', {}, {
      		query: {
      			method:'GET', 
      			params:{}, 
      			isArray:true
      		}
    	});
	}]);

/*communityServices.factory('QuestionsService',['$resource', 
	function($resource){
		return $resource('data/:userName.json', {}, {
      		query: {
      			method:'GET', 
      			params:{userName:'username'}, 
      			isArray:true
      		}
    	});
	}]);*/