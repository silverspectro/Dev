(function(){
    var app = angular.module('store-products', [ ]);

    app.directive('productTitle', function(){
        return {
            restrict: 'E',  //E = Element (<product-title></product-title) A = attribute (<h3 product-title></h3>)
            templateUrl: 'product-title.html'
        };
    });

    app.directive("productPanels", function(){
        return {
            restrict: "E",
            templateUrl: "product-panels.html",
            controller: function() {
                this.tab = 1;

                this.selectTab = function(setTab) {
                    this.tab = setTab;
                };

                this.isSelected = function(checkTab) {
                    return this.tab === checkTab;
                };
            },
            controllerAs:"panels"
        };
    });

    app.directive("productGallery", function(){

        return {
            restrict: "E",
            templateUrl: "product-gallery.html"
        }

    });

    app.controller('ReviewController',['$http' ,function($http){
        var product = this;

        product = [ ];

        $http.get('/products.json').success(function(gems){
            product = gems;
        });

        $http.post('/products.json').success(function(gems){
            product.review = gems.review;
        });

        this.review = product.review;

        this.addReview = function(product){
            this.review.createdOn = Date.now();
            product.reviews.push(this.review);
            $http.post('/products.json' , product.reviews).success(function(gems){
                product.review = gems.review;
            });

            this.review = product.review;
            this.review = {};
        };

    }]);

})();
