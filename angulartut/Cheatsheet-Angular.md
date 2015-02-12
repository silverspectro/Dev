#Cheatsheet Angular

Scope in the HTML file are defined by the closing tag of the tag in whiwh the expression has been declared

##HTML

ng- -> specify a Directive for Angular to follow

ng-*something* = " some controller " -> specify wich directive to apply in relation to a controller, and/or a object from the controller

###List of directive

+ <html ng-app="nameoftheapp"> -> define the name of the module to use (always on html ? check it)
+ ng-controller="Nameofthecontroller as nameyouwanttouseintheHTML" -> define a controller on the element
+ ng-show = "Boolean property" -> show the element when the property is set to true
+ ng-hide = "Boolean property" -> hide the element when the property is set to true
+ ng-repeat = "object in controllername.objects" -> repeat the element for each object in the array of object
+ ng-src = "{{source image of the object}}" -> define the source of an <img> tag through angular, thus permiting dynamic data (otherwise the browser would have rendered the source before the expression evaluates) 
+ ng-init = "expressionusedinthescope" -> define an initial value for a variable defined in the scope
+ ng-class="{theclass:value to check}" -> apply the specified class if a specific expression is matched
+ ng-model="object.property" -> bind the current form value to a parameter of object (double data binding)
+ ng-submit="controllerfunction" -> binds a function when THE FORM is submitted via the Submit button
+ ng-include="'nameofthe.file(as a string, notice the complementary brackets)'" -> include the selected file, ng-include expects a variable with the name, so the complementary brackets are here to pass directly a name in the html

| = filters -> pass data form the preceding function or controller to the filter

###List of Filters

+ | orderBy='property or -property'
+ | 

##JS

###1. Modules

Always wrap the code in a closure ex : (function(){ /*code*/ })

Initialize angular by defining your module 

```
var app = angular.module('/*name of the module as a String*/', [ /* dependencies of the module, if none, send an empty array */ ]);

```

###2. Controllers

Define a controller on the current module 

```
modulename.controller('nameofthecontroller as a String', function(){
	what the controller do;
});

```

You can define object to be part of a controller by assigning them to it

```

modulename.controller('nameofthecontroller', function(){
	this.nameoftheobject = object;
})

var object = {} or [] or "Hello"

```

###3. Directives

Allow to create custom tags in HTML with or without attaches controllers.
Very useful for code clarification ans sanity

in app.js 

```

app.directive("productPanels", function(){
	return {
		restrict: "E",
		templateUrl: "product-panels.html",
		controller: function() {
			//controller definition
			this.tab = 1;

			this.selectTab = function(setTab) {
				this.tab = setTab;
			};

			this.isSelected = function(checkTab) {
				return this.tab === checkTab;
			};
		},
		//alias as in (ng-controller="PanelController as panel")
		controllerAs:"panels"
	};
});

```

in product-title.html

```

<h1>{{product.name}}</h1> 
<em class="pull-right"> {{product.price | currency}}$ </em>

```

in index.html

```

<product-title></product-title>

```