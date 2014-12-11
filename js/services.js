var communityServices = angular.module('communityServices',[
		'ngResource'
	]);

communityServices.factory('QuestionsService',['$resource', 
	function($resource){
		return $resource('data/questions.json');
	}]);

communityServices.factory('UserInfoService',['$resource', 
	function($resource){
		return $resource('data/:userName.json', {userName:'@userName'});
	}]);

communityServices.factory('HotInfoService',['$resource', 
  function($resource){
    return $resource('data/hotInfo.json');
  }]);

communityServices.factory('QuestionService',['$resource', 
  function($resource){
    return $resource('data/questions/:questionId.json');
  }]);

communityServices.factory('SimilarQuestionsService',['$resource', 
  function($resource){
    return $resource('data/questions/:questionId:format',{
      questionId : "@questionId",
      format : "_similar.json"
    });
  }]);

communityServices.factory('AnswersService',['$resource', 
  function($resource){
    return $resource('data/questions/:questionId:format',{
      questionId : "@questionId",
      format : "_answers.json"
    });
  }]);