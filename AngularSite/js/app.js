(function(){
	var app = angular.module('site', [ 'ngRoute', 'markdown' ]);


	app.controller('SiteController' , [ '$scope','$http', '$routeParams', function($scope, $http, $routeParams){
		this.nav = nav;
		this.current = 1;
		var site = this;
		this.isEdited = false;

		site.articles = [ ];
		site.articleId = 1;

		$http.get('https://cjsonserver.herokuapp.com/articles').success(function(articles){
			site.articles = articles;
			//if($routeParams)site.articleId = parseInt($routeParams.id);
		});

		this.submitData = function (article)
		{
			var url = "https://cjsonserver.herokuapp.com/articles/";
			if(article.id) {
				article.id = article.id;
			}
			console.log(article);
			$http.post(url, article)
				.success(function (article, status, headers)
				{
					console.log(article);
				})
				.error(function (data, status, headers)
				{
					 console.log("SUBMIT ERROR");
				});
		};

		this.selectTab = function(currentNav) {
			this.current = currentNav;
		};

		this.isSelected = function(checkNav) {
			return this.current === checkNav;
		};

		this.selectArticle = function(articleId) {
			this.articleId = articleId;
		};

		this.articleEdition = function(element, $event) {
			if($event.target) {
				console.log(site.articleId);
				//console.log($event.target);
				return this.isEdited = true;
			}
		};

		this.postArticle = function(article) {
			/*$http.post('http://localhost:8080/articles.json', site.articles).success(function(articles){
				site.articles = articles;
			});*/
			site.submitData(article);
			return this.isEdited = false;
		};

	} ]);

	app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
      when('/articles/:id', {
        templateUrl: 'directives/ind-article.html',
				controller:"SiteController"
      }).
			when('/', {
				templateUrl: 'directives/home-feature.html',
				controller:"SiteController"
			}).
			when('/main', {
				templateUrl: 'directives/home-feature.html',
				controller:"SiteController"
			}).
			when('/articles', {
				templateUrl: 'directives/list-articles.html',
				controller:"SiteController"
			}).
      otherwise({
        redirectTo: '/'
      });
			//$locationProvider.html5Mode(true);
  }]);

	//custom filter creating For loop with ng-repeat
	app.filter('makeRange', function() {
	    return function(input) {
	    	if(!input)return false;
	        var lowBound, highBound;
	        switch (input.length) {
	        case 1:
	            lowBound = 0;
	            highBound = parseInt(input[0]) - 1;
	            break;
	        case 2:
	            lowBound = parseInt(input[0]);
	            highBound = parseInt(input[1]);
	            break;
	        default:
	            return input;
	        }
	        var result = [];
	        for (var i = lowBound; i <= highBound; i++)
	            result.push(i);
	        return result;
	    };
	});

    //end custom filter

		app.directive('listArticles', function(){
			return {
				restrict: "E",
				templateUrl: "directives/list-articles.html"
			}
		});

		app.directive('homeFeature', function(){
			return {
				restrict: "E",
				templateUrl: "directives/home-feature.html"
			}
		});

		app.directive('indArticle', function(){
			return {
				restrict: "E",
				templateUrl: "directives/ind-article.html"
			}
		});

		app.directive('markdown', function() {
			return {
				restrict: 'E',
				link: function postLink(scope, elem, attrs) {
					var newContents = markdown.toHTML(elem.html());
					console.log(newContents);
					elem.replaceWith(newContents);
				}
			}
		});


  var nav = [
    {
    	id: 1,
    	name:"main",
    	url:"index.html"
    },
    {
    	id: 2,
    	name:"articles",
    	url:"article.html"
    },
		{
			id: 3,
			name:"projects",
			url:"project.html"
		}
  ];

})();
