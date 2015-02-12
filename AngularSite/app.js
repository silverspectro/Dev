(function(){
	var app = angular.module('site', [ ]);

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

    app.controller('SiteController' , [ '$http', function($http){
		this.nav = nav;
		this.current = 1;
		var site = this;

		site.articles = [ ];

		$http.get('	http://localhost:8080/articles.json').success(function(articles){
			site.articles = articles;
		});	

		this.selectTab = function(currentNav) {
			this.current = currentNav;
		};

		this.isSelected = function(checkNav) {
			return this.current === checkNav;
		};
    } ]);
    

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
	    }
    ];

})();
