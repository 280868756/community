var communityDirectives = angular.module('communityDirectives',[]);

communityDirectives.directive('questionItem',
	function(){
		return {
			restrict : 'A',
			replace : true,
			templateUrl: 'templates/question.html'
			/*template : '\
			<div>\
				<div class="rank">\
					<div class="votes"><span class="badge">{{question.votes}}</span><span class="rank-block">投票</span></div>\
					<div class="answers"><span class="badge">{{question.answers}}</span><span class="rank-block">回答</span></div>\
					<div class="view"><span class="badge">{{question.view}}</span><span class="rank-block">浏览</span></div>\
				</div>\
				<div class="summary">\
					<div class="author">\
						<span>{{question.date}}来自</span>\
						<a class="custom-a-none" href="">{{question.author}}</a>\
					</div>\
					<h3 class="title">\
						<a class="custom-a-brown" href="">{{question.title}}</a>\
					</h3>\
					<ul class="list-inline tag">\
						<li ng-repeat="tag in question.tags"><a href="" class="custom-a-none"><span class="label label-info">{{tag.label}}</span></a></li>\
					</ul>\
				</div>\
			</div>'*/
		}
	});