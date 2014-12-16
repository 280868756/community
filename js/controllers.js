var communityControllers = angular.module('communityControllers', []);

communityControllers.controller('QuestionsController', ['$scope', 'QuestionsService',
	function($scope, QuestionsService) {
		$scope.questions = QuestionsService.query({}, function(questions) {
			for (var i = 0; i < $scope.questions.length; i++) {
				$scope.questions[i].status = $scope.questions[i].solved ? "解决" : "回答";
			}
		});
	}
]);

communityControllers.controller('UserInfoController', ['$scope', '$http', 'UserInfoService',
	function($scope, $http, UserInfoService) {
		//这个参数可以在路由的时候传进来$routeParams
		$scope.userInfo = UserInfoService.get({
			userName: 'LittleDouBi'
		});
		//两种方式，用$http也可以
		// $http({method : 'GET',url : 'data/LittleDouBi.json'}).success(function(data){
		// 	console.log(data);
		// 	$scope.userInfo = data;
		// });
	}
]);

communityControllers.controller('HotInfoController', ['$scope', 'HotInfoService',
	function($scope, HotInfoService) {
		$scope.hotInfo = HotInfoService.get();
	}
]);

communityControllers.controller('QuestionController', ['$scope', '$routeParams', 'QuestionService', 'SimilarQuestionsService',
	function($scope, $routeParams, QuestionService, SimilarQuestionsService) {
		QuestionService.get({
			questionId: $routeParams.questionId
		}, function(question) {
			$scope.question = question;
			$scope.question.view += 1;
		});
		$scope.focus = function() {
			$scope.question.focus += 1;
			//TODO SVAE 
			/*QuestionService.$save(
				{questionId:$routeParams.questionId},
				{focus:$scope.question.focus}
				,
				function(data){
					QuestionService.get({questionId:$routeParams.questionId},function(question){
						console.log(question.focus);
					});
				},
				function(error){
					console.log(error);
				}
			);*/
		}
		$scope.collect = function() {
			$scope.question.collect += 1;
			//TODO SVAE
		}
		$scope.addVote = function() {
			$scope.question.votes += 1;
			//TODO SVAE
		}
		$scope.subVote = function() {
			$scope.question.votes -= 1;
			//TODO SVAE
		}
		SimilarQuestionsService.query({
			questionId: $routeParams.questionId
		}, function(data) {
			$scope.similarQuestions = data;
		});

	}
]);

communityControllers.controller('AnswersController', ['$scope', '$routeParams', 'AnswersService',
	function($scope, $routeParams, AnswersService) {
		AnswersService.query({
			questionId: $routeParams.questionId
		}, function(data) {
			$scope.answers = data;
		});
		$scope.checkComment = function() {
			console.log("-----------------");
		}
		$scope.addVote = function(answer) {
			answer.votes += 1;
			//TODO SVAE
		}
		$scope.subVote = function(answer) {
			answer.votes -= 1;
			//TODO SVAE
		}
	}
]);

communityControllers.controller('CommentsController', ['$scope', '$routeParams', 'CommentsService',
	function($scope, $routeParams, CommentsService) {
		CommentsService.query({
			answerId: $scope.answer.answerId
		}, function(data) {
			$scope.comments = data;
		})
		$scope.showComments = false;
		$scope.checkComment = function() {
			$scope.showComments = !$scope.showComments;
		}
		$scope.replyClick = function(comment) {
			$scope.showReply = true;
			//正在回复的评论
			$scope.comment = comment;
		}
		$scope.showReply = false;
	}
]);

