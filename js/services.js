var communityServices = angular.module('communityServices',[
		'ngResource'
	]);

communityServices.factory('QuestionsService',['$resource', 
	function($resource){
		return $resource('data/questions.json');
	}]);

communityServices.factory('UserInfoService',['$resource', 
	function($resource){
		return $resource('data/users/:questions/:relationship/:userName.json', {questions:'@questions',userName:'@userName'});
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
    return $resource('data/answers/:questionId.json',{
      questionId : "@questionId"
    });
  }]);

communityServices.factory('CommentsService',['$resource', 
  function($resource){
    return $resource('data/commons/:answerId.json',{
      answers: "@answerId"
    });
  }]);