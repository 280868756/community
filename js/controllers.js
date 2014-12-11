var communityControllers = angular.module('communityControllers',[]);

communityControllers.controller('QuestionsController',['$scope','QuestionsService',
	function($scope,QuestionsService){
		$scope.questions = QuestionsService.query({},function(questions){
			for(var i = 0; i < $scope.questions.length; i++){
				$scope.questions[i].status = $scope.questions[i].solved? "解决" : "回答";
			}
		});
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

communityControllers.controller('QuestionController',['$scope','$routeParams','QuestionService','SimilarQuestionsService','AnswersService',
	function($scope,$routeParams,QuestionService,SimilarQuestionsService,AnswersService){
		QuestionService.get({questionId:$routeParams.questionId},function(question){
			$scope.question = question;
			$scope.question.view += 1;
		});
		$scope.focus = function(){
			$scope.question.focus += 1; 
		}
		$scope.collect = function(){
			$scope.question.collect += 1; 
		}
		$scope.addVote = function(){
			$scope.question.votes += 1;
		}
		$scope.subVote = function(){
			$scope.question.votes -= 1;
		}
		SimilarQuestionsService.query({questionId:$routeParams.questionId},function(data){
			$scope.similarQuestions = data;
		})
		AnswersService.query({questionId:$routeParams.questionId},function(data){
			$scope.answers = data;
			$scope.answers.count = $scope.answers.length;
		})
	}]);
