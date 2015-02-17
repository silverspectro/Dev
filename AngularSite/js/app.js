(function(){
	var app = angular.module('site', [ 'ngRoute' ]);

	//custom filter creating For loop with ng-repeat

	app.controller('SiteController' , [ '$scope','$http', '$routeParams', function($scope, $http, $routeParams){
		this.nav = nav;
		this.current = 1;
		var site = this;

		site.articles = [ ];
		site.articleId = 0;

		//if($routeParams)site.articleId = parseInt($routeParams.id);

		console.log(site.articleId);

		$http.get('http://localhost:8080/articles.json').success(function(articles){
			site.articles = articles;
			//if($routeParams)site.articleId = parseInt($routeParams.id);
		});

		this.selectTab = function(currentNav) {
			this.current = currentNav;
		};

		this.isSelected = function(checkNav) {
			return this.current === checkNav;
		};

		this.selectArticle = function(articleId) {
			this.articleId = articleId;
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
			when('/Main', {
				templateUrl: 'directives/home-feature.html',
				controller:"SiteController"
			}).
			when('/Articles', {
				templateUrl: 'directives/list-articles.html',
				controller:"SiteController"
			}).
      otherwise({
        redirectTo: '/'
      });
			//$locationProvider.html5Mode(true);
  }]);

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


  var nav = [
    {
    	id: 1,
    	name:"Main",
    	url:"index.html"
    },
    {
    	id: 2,
    	name:"Articles",
    	url:"article.html"
    },
		{
			id: 3,
			name:"Projects",
			url:"project.html"
		}
  ];

})();
