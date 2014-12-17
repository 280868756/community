var communityDirectives = angular.module('communityDirectives',[]);

communityDirectives.directive('questionItem',
	function(){
		return {
			restrict : 'EA',
			scrope: {},
			//replace : true,//这个地方设为true就报错啊...
			templateUrl: 'templates/question.html'
		}
	});

communityDirectives.directive('answerItem',
	function(){
		return {
			restrict : 'EA',
			templateUrl : 'TEMPLATES/answer.html'
		}
	});

// communityDirectives.directive('setActive',
// 	function(){
// 		return{
// 			restrict : "A",
// 			link : function(scope,ielme,iattr){
// 				$(ielme).bind('click',function(e){
// 					ielme.css('background-color','red');
// 					ielme.addClass('tabActive');
// 					console.log(ielme);
// 					$(this).nextAll().removeClass('tabActive')
// 					$(this).prevAll().removeClass('tabActive');
// 				})
// 			}
// 		}
// 	});

communityDirectives.directive('imgLayer',
	function(){
		return {
			template:'<div style="width:200px;height:100px;z-index:999;background-color:#ddd;"></div>',
			restrict:'A',
			link : function(scope,ielme,iattr){
				console.log(ielme);
			}
		}
	});