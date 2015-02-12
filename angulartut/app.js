(function(){
	var app = angular.module('store', ["store-products"]);

	/*app.controller("StoreController", function(){
		this.products = gems;
		this.nav = nav;
		this.current = 1;

		this.selectTab = function(currentNav) {
			this.current = currentNav;
		};

		this.isSelected = function(checkNav) {
			return this.current === checkNav;
		};
	});*/ // local data


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

    app.controller('StoreController' , [ '$http', function($http){
    	//this.products = gems;
		this.nav = nav;
		this.current = 1;
		var store = this;

		store.products = [ ];

		$http.get('	/products.json').success(function(gems){
			store.products = gems;
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
	    	name:"Store",
	    	url:"index.html"
	    },
	    {	
	    	id: 2,
	    	name:"Doc",
	    	url:"Cheatsheet-angular"
	    }
    ];

	/*var gems = [
		{
			name: 'Dodecahedron',
			price: 2,
			description: 'This gem is beautiful for what i know, but is it really worth a buy ?',
			canPurchase: true,
			soldOut: false,
			images: [
				{
					full: 'images/dodecahedron-01-full.jpg',
					thumb: 'images/dodecahedron-01-thumb.jpg'
				}
			],
			reviews: [
				{
					stars: [5],
					body: "I Love the Shine on this gem",
					author: "ciro@decaro.com",
					createdOn: 1397490980837
				},
				{
					stars: [2],
					body: "And another review to test the repeat",
					author: "ciro@decaro.com",
					createdOn: 1397490980837
				}
			]
		},
		{
			name: 'Pentagonal Gem',
			price: 10.95,
			description: 'This Gem is capable of a lot of things, including magic !',
			canPurchase: false,
			soldOut: false,
			images: [
				{
					full: 'images/pentagone-01-full.jpg',
					thumb: 'images/pentagone-01-thumb.jpg'
				}
			],
			reviews: [
				{
					stars: [3],
					body: "Prefere the other one of course",
					author: "ciro@decaro.com",
					createdOn: 1397490980837
				}
			]
		}
	];*/ //local gems object, to use with local data StoreController

})();
