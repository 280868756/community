var communityDirectives = angular.module('communityDirectives',[]);

communityDirectives.directive('questionItem',
	function(){
		return {
			restrict : 'EA',
			scrope: {},
			//replace : true,//����ط���Ϊtrue�ͱ���...
			templateUrl: 'templates/question.html'
		}
	}
);

communityDirectives.directive('answerItem',
	function(){
		return {
			restrict : 'EA',
			templateUrl : 'templates/answer.html',
			scope : {
				answer : "=",
				afterSetAccept :��"&"
			},
			controller :��function($rootScope,$scope,QuestionService){
				$(".vote-btn").tooltip();
				$rootScope.$watch('canSetQues',function(){
					$scope.hasRight = $rootScope.canSetQues;
				});
				$scope.solved = $scope.answer.solveFlag == "1";
				
				//���ɴ�
				$scope.acceptAnswer = function(){
					$scope.solved = true;
					//���ø��������
					QuestionService.acceptAnswer({
						answerId : $scope.answer.id
					},null,function(){
						$scope.afterSetAccept();
					});
				}
				//ȡ������
				$scope.cancelAccept = function(){
					$scope.solved = false;
					//ȡ�����������
					QuestionService.cancelAccept({
						answerId : $scope.answer.id
					},null,function(){
						$scope.afterSetAccept();
					});
				}
				
				$scope.addVote = function() {
					var voteNum = $scope.answer.voteNum + 1;
					$scope.setVoteNum(voteNum,1);
				}
				$scope.subVote = function() {
					var voteNum = $scope.answer.voteNum - 1;
					$scope.setVoteNum(voteNum,0);
				}
				$scope.setVoteNum = function(voteNum,flag){
					//flag 1��ʾ����0��ʾ��
					var userName = $rootScope.nav_userName;
			
					if(!userName){
						$('#loginModal').modal('show');
					}else{
						QuestionService.saveAnswerIndex({
							answerId : $scope.answer.id,
							userId : $rootScope.nav_userName,
							answerIndex : "voteNum"
						},{
							voteNum:voteNum,
							answerEval:flag
						},function(data){
							console.log(data);
							if(data.evalFlag == 0){
								alert("�ûش����Ѿ��ȹ���");
							}else if(data.evalFlag == 1){
								alert("�ûش����Ѿ�������");
							}else{
								$scope.answer.voteNum = voteNum;
							}
						});
					}
				}
			}
		}
	}
);

communityDirectives.directive('pubNav',
	function(){
		return {
			restrict : 'EA',
			templateUrl : 'templates/nav.html'
		}
	}
);

communityDirectives.directive('loginDialog',
	function(){
		return {
			restrict : 'EA',
			templateUrl : 'templates/loginDialog.html'
		}
	}
);

communityDirectives.directive('expander',
	function(){
		return {
			restrict : 'EA',
			replace : true,
			transclude : true,
			controller:function($http){
				this.getLabels = function(){
					return $http({
						method:"POST",
						url:"/UEP-PUB/community/communityAction.do",
						params:{
							action:"getAllLables"
						},
						headers:{
							'X-Requested-With':'XMLHttpRequest',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						},
						transformRequest: function(obj) {  
							var str = [];  
							for(var p in obj){  
								str.push("questionMap."+encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
							}  
							return str.join("&");  
						}
					});
				}
			},
			template : '<div class="label-expander mb-10">'+
							'<input class="title" ng-readonly="true" ng-model="question.tags" ng-click="expanderToggle()" placeholder="ѡ���ǩ"></input>'+
							'<div class="body" ng-show="showMe"></div>'+
					   '</div>',
			link : function(scope,iElement,iAttrs,controller){
				scope.showMe = false;
				scope.question.tags = "";
				
				scope.expanderToggle = function(){
					if(iElement.children().eq(1).children().length == 0){
						scope.setLabel();
					}
					scope.showMe = !scope.showMe;
					iElement.toggleClass('mb-10');
				}
				
				scope.setLabel = function(){
					var promise = controller.getLabels();
					promise.success(function(data){
						var titleElement = iElement.children().eq(0);
						var bodyElement = iElement.children().eq(1);
						
						var bodyHtml = "";
						for(var i = 0; i < data.length; i++){
							bodyHtml = bodyHtml + '<span class="cus-label">'+data[i].name+'</span>';
						}
						bodyElement.append(bodyHtml);
						
						var lables = bodyElement.children();
						lables.bind("click",function(){
							$(this).toggleClass('label-selected');
							
							var label = $(this).text() + "  ";
							if($(this).hasClass('label-selected')){
								scope.$apply(function(){
									scope.question.tags = scope.question.tags + label;
								});
							}else{
								var labelArr = scope.question.tags.split(label);
								var text = "";
								for(var i = 0; i < labelArr.length; i++){
									text = text + labelArr[i];
								}
								scope.$apply(function(){
									scope.question.tags = text;
								});
							}
						})
					});
				}
			}
		}
	}
);

communityDirectives.directive('pagination',
	function(){
		return {
			restrict : 'EA',
			replace : true,
			transclude : true,
			templateUrl : 'templates/pagination.html',
			scope:{
				id:'@',
				getPageSizeAction:'@',
				changePage:'&'
			},
			controller: function($scope,$http,searchParam){
				this.getPageSize = function(){
					return $http({
						method:"POST",
						url:"/UEP-PUB/community/communityAction.do",
						params:{
							action:$scope.getPageSizeAction,
							searchInfo:searchParam.searchInfo,
							searchTag:searchParam.searchTag
						},
						headers:{
							'X-Requested-With':'XMLHttpRequest',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						},
						transformRequest: function(obj) {  
							var str = [];  
							for(var p in obj){  
								str.push("questionMap."+encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
							}  
							return str.join("&");  
						}
					});
				}
			},
			link : function(scope,iElement,iAttrs,controller){
				var promise = controller.getPageSize();
				promise.success(function(data){
					//���õ�ǰҳ��
					scope.currentPage = 1;
					//һ������ҳ
					scope.pageSize = data.allPageNum;
					scope.pageNumArr = [];
					for(var i = 0; i < scope.pageSize; i++){
						scope.pageNumArr.push(i+1);
						//�����Ȳ����ˣ��ѷ�ҳ�� ȫ���س�����
						/*if(i >= 4){
							break;
						}*/
					}
				})
				
				
				//���÷�ҳ
				scope.setPagination = function(currentPage){
					scope.currentPage = currentPage;
					
					var i , showPageId, hidePageId;
					
					if(currentPage >= 4){
						//ֻ������ǰҳ��ǰ��2ҳ��
						var prevPage = currentPage-3;
						var i;
						
						//�����������
						for(i = prevPage; i > prevPage-2; i--){
							hidePageId = "page_"+i;
							$("#"+scope.id+" #"+hidePageId).hide();
						}
						for(i = currentPage-1; i > prevPage; i--){
							showPageId = "page_"+(i);
							$("#"+scope.id+" #"+showPageId).show();
						}
						
						//ֻ������ǰҳ�ĺ���2ҳ
						var nextPage = currentPage + 3;
						for(i = currentPage + 1; i < nextPage; i++){
							showPageId = "page_"+i;
							$("#"+scope.id+" #"+showPageId).show();
						}
						//���Ҳ����������
						for(i = nextPage; i < nextPage+2; i++){
							hidePageId = "page_"+i;
							$("#"+scope.id+" #"+hidePageId).hide();
						}
					}else{
						//�����ǰҳС��4����ô����ʾǰ5ҳ
						for(i = 0; i < 5; i++){
							var showPageId = "page_"+(i+1);
							$("#"+scope.id+" #"+showPageId).show();
						}
						for(i = 6; i <= 7; i++){
							var hidePageId = "page_"+i;
							$("#"+scope.id+" #"+hidePageId).hide();
						}
					}
					//��ȡ��ҳ��Ϣ
					scope.getPageInfo();
				}
				
				//��ȡǰһҳ�ķ�ҳ��Ϣ
				scope.getPrevPage = function(){
					if(scope.currentPage == 1){
						return;
					}
					scope.setPagination(scope.currentPage-1);
				}
				
				//��ȡ��һҳ�ķ�ҳ��Ϣ
				scope.getNextPage = function(){
					if(scope.currentPage == scope.pageSize){
						return;
					}
					scope.setPagination(scope.currentPage+1);
				}
				
				scope.getPageInfo = function(){
					scope.changePage({curPageNum:scope.currentPage});
				}
			}
		};
	}
);

communityDirectives.directive('answerContent',
	function(){
		return {
			restrict : 'EA',
			replace : true,
			transclude : true,
			template : '<div></div>',
			scope :��{
				content : "="
			},
			link : function(scope,iElement,iAttrs){
				var contentHtml = scope.content;
				iElement.append(contentHtml);
			}
		};
	}
);

communityDirectives.directive('uploadHeadimgDialog',
	function(){
		return {
			restrict : 'EA',
			templateUrl : 'templates/uploadImgDialog.html'
		}
	}
);

communityDirectives.directive('questionTags',
	function(){
		return {
			restrict : 'EA',
			replace : true,
			transclude : true,
			//require:"^?questionTags",
			controller:function($http){
				this.getLabels = function(){
					return $http({
						method:"POST",
						url:"/UEP-PUB/community/communityAction.do",
						params:{
							action:"getAllLables"
						},
						headers:{
							'X-Requested-With':'XMLHttpRequest',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						},
						transformRequest: function(obj) {  
							var str = [];  
							for(var p in obj){  
								str.push("questionMap."+encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
							}  
							return str.join("&");  
						}
					});
				}
			},
			template : '<div class="label-expander mb-10">'+
							'<ul class="list-inline	question-tags">'+
								'<li>'+
									'<div class="">'+
										'<input type="text" class="question-tag-input" placeholder="��ǩ���磺java" ng-keyup="inputKeyup()" ng-keydown="inputKeydown()"></input>'+
									'</div>'+
									'<ul class="tags-layer"></ul>'+
								'</li>'+
							'</ul>'+
							'<input id="tagsInput" type="hidden" ng-model="question.tags">'+
					   '</div>',
			link : function(scope,iElement,iAttrs,controller){
				scope.question.tags = "";
				
				var allTags = [],
					promise = controller.getLabels(),
					newInputTemp = '<li>'+
										'<div class="">'+
											'<input type="text" class="question-tag-input" placeholder="��ǩ���磺java" ng-focus></input>'+
										'</div>'+
										'<ul class="tags-layer"></ul>'+
									'</li>';
				promise.success(function(data){
					for(var i = 0; i < data.length; i++){
						allTags.push(data[i].name);
					}
				});
				
				scope.inputKeyup = function(){
					inputKeyup();
				}
				
				scope.inputKeydown = function(){
					inputKeydown();
				}
				
				var inputKeyup = function(){
					var event = event? event:window.event,
						tagList = iElement.children().eq(0).children().last().children(),
						currentTagInput = $(tagList[0]).children().eq(0),
						currentTagLayer = tagList[1],
						searchText = $(currentTagInput).val(), 
						layerHtml = "";

					if(event.keyCode == 38){
						//���Ϸ����
						var showTags = $(currentTagLayer).children();
						if(showTags.length > 0){
							var Tagslenght =  showTags.length;
							for(var j = 0; j < Tagslenght; j++){
								if($(showTags[j]).hasClass('active')){
									$(showTags[j]).removeClass('active');
									if(j == 0){
										//��ǰ�ǵ�һ��tag����ô�ѵ����һ��tag��ʽ��Ϊactive
										$(showTags[Tagslenght - 1]).addClass('active');
									}else{
										//����һ��tag��ʽ��Ϊactive
										$(showTags[j-1]).addClass('active');
									}
									break;
								}							
							}
						}
					}else if(event.keyCode == 40){
						//���·����
						var showTags = $(currentTagLayer).children();
						if(showTags.length > 0){
							var Tagslenght =  showTags.length;
							for(var j = 0; j < Tagslenght; j++){
								if($(showTags[j]).hasClass('active')){
									$(showTags[j]).removeClass('active');
									if(j == Tagslenght - 1){
										//��ǰ�����һ��tag����ô�ѵ�һ��tag��ʽ��Ϊactive
										$(showTags[0]).addClass('active');
									}else{
										//����һ��tag��ʽ��Ϊactive
										$(showTags[j+1]).addClass('active');
									}
									break;
								}							
							}
						}
					}else if(event.keyCode == 13){
						//�س���
						if($(currentTagLayer).css("display")=="block"){
							console.log("enter----block");
							var showTags = $(currentTagLayer).children();
							if(showTags.length > 0){
								var Tagslenght =  showTags.length;
								for(var j = 0; j < Tagslenght; j++){
									if($(showTags[j]).hasClass('active')){
										console.log($(showTags[j]).text());
										setInputValue(currentTagInput,currentTagLayer,$(showTags[j]).text());
										break;
									}							
								}
							}
						}
					}else{
						if(event.keyCode == 8 && searchText==""){
							//ɾ����������������û����������layer����
							$(currentTagLayer).css("display","none");
						}else{
							console.log("allTags.length:"+allTags.length);
							for(var i = 0, count = 0; i < allTags.length; i++){
								if(count > 6){
									break;
								}
								if(allTags[i].indexOf(searchText) >= 0){
									var text = allTags[i];
									text = text.replace(searchText,'<strong>'+searchText+'</strong>');
									var prev = allTags[i].split(searchText)[0];
									var next = allTags[i].split(searchText)[1];
									if(count == 0){
										layerHtml += '<li class="active"><a href="javascript:void(0)">'+text+'</a></li>';
									}else{
										layerHtml += '<li><a href="javascript:void(0)">'+text+'</a></li>';
									}
									count++;
								}
							}
							if(count < 7){
								$(currentTagLayer).css("height",200-(7-count)*27);
							}else{
								$(currentTagLayer).css("height",200);
							}
							$(currentTagLayer).empty().undelegate().append(layerHtml);
							$(currentTagLayer).delegate("a","click",function(){
								setInputValue(currentTagInput,currentTagLayer,$(this).text());
							})
							$(currentTagLayer).css("display","block");
						}
					}
				}
				$(document).click(function(event){
					var tagList = iElement.children().eq(0).children().last().children();
					var currentTagInput = $(tagList[0]).children().eq(0),
						currentTagLayer = tagList[1];
					if($(currentTagLayer).css("display")!="none"){
						$(currentTagLayer).css("display","none");
						$(currentTagInput).val("");
					}
				})
				
				var inputKeydown = function(){
					var event = event? event:window.event;
					if(event.keyCode == 9){
						//TAB��
						var tagList = iElement.children().eq(0).children().last().children();
						var currentTagInput = $(tagList[0]).children().eq(0),
							currentTagLayer = tagList[1];
						$(currentTagLayer).css("display","none");
						$(currentTagInput).val("");
					}
				}
				
				var setTag = function(tag,flag){
					console.log("==========="+tag);
					if(flag == "add"){
						//�����������ֵɾ��
						var labelArr = scope.question.tags.split(tag);
						var text = "";
						for(var i = 0; i < labelArr.length; i++){
							text = text + labelArr[i];
						}
						scope.question.tags = text;
						//allTags��������Ӹ�tag
						allTags.unshift(tag);
					}else if(flag == "delete"){
						//��������ֵ��Ӹ�tag
						scope.question.tags += tag + "  ";
						//allTags������ɾ����tag
						for(var i = 0; i < allTags.length; i++){
							if(allTags[i] == tag){
								allTags.splice(i,1);
							}
						}
					}
				}
				
				var setInputValue = function(currentTagInput,currentTagLayer,value){
					//����input��ֵ��������input��Ϊֻ��������һ���رհ�ť������һ���µ�input
					$(currentTagInput).val(value);
					$(currentTagLayer).css("display","none");
					//��������ɾ����Ԫ�أ���ֹ�ظ�ѡ��
					setTag(value,"delete");
					
					//��ֻ��
					$(currentTagInput).attr("disabled","disabled");
					
					//���ӹرհ�ť
					$(currentTagInput).parent().append('<a href="javascript:void(0);" class="tag-close">��</a>');
					var closeButton = $(currentTagInput).parent().children().last();
					
					$(closeButton).bind("click",function(){
						//ɾ������input
						setTag($($(this).prev()).val(),"add");
						if($(iElement.children().eq(0).children().last().children().eq(0).children().eq(0)).attr("disabled") == "disabled"){
							$(this).parent().parent().remove();
							addTagInput();
						}else{
							$(this).parent().parent().remove();
						}
						
					});
					
					//һ������������4��tag
					if(iElement.children().eq(0).children().length < 4){
						addTagInput();
					}					
				}
				
				var addTagInput = function(){
					//����һ���µ�input
					$(iElement.children().eq(0)).append(newInputTemp);
					
					//���¼�
					var newInput = iElement.children().eq(0).children().last().children().eq(0).children().eq(0);
					
					$(newInput).bind("keyup",function(){
						inputKeyup();
					}).bind("keydown",function(){
						inputKeydown();
					});
					
					//�����ӵ�input��ȡ����
					setTimeout(function(){
						$(newInput).focus();
					},0)
					
				}
			}
		}
	}
);