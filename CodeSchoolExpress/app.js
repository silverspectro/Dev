var express = require("express");
var app = express();

var morgan = require("morgan");
var bodyParser = require("body-parser");
var parseUrlEncoded = bodyParser.urlencoded({extended: false});
//var logger = require("./logger");   //custom middleware

var projects = {
    "Fixed" : {
      "id":0,
      "title" : "Fixed",
      "text": "Text of Fixed"
    },
    "Movable" : {
      "id": 1,
      "title" : "Movable",
      "text": "Text of Movable"
    },
    "Rotating" : {
      "id": 2,
      "title" : "Rotating",
      "text": "Text of Rotating"
    }
};

app.param("name", function(request, response, next){    //hacking on params middleware
  //formatting request to match name even if omitted upperCase
  if(request.url.match("/posts/")) {

    var name = request.params.name;
    var post = posts[name];

    request.post = post;

  } else if(request.url.match("/projects/")) {

  var name = request.params.name;
  var project = projects[name];

  request.project = project;
  }

  next();

});

app.use(express.static("public"));

app.use(morgan("dev"));

app.route("/projects")
.get(function(request, response){
  if(request.method === "GET") {
    if(request.query.limit >= 0) {
      response.json(projects.slice(0, request.query.limit));
    } else if(request.query.search) {
       response.json(projectSearch(request.query.search));
    } else {
      response.json(projects);
    }
  } else {
    response.send("Not appropriate method, use GET, POST, PUT...");
  }
})
.post(parseUrlEncoded, function(request, response) {
  var newProject = request.body;
  projects[newProject.title] = newProject;
  response.status(201).json(newProject);
});

app.route("/projects/:name")
.get(function(request, response){
  if(request.method === "GET") {
    if(!request.project) {
      response.status(404).json("no project found for : " + request.params.name);
    } else {
      response.json(request.project);
    }
  } else {
    response.send("Not appropriate method, use GET, POST, PUT...");
  }
})
.delete(function(request, response){
  delete projects[request.params.name];
  response.sendStatus(200);
});

app.listen(3000, function() {
  console.log("static on port 3000");
});

//use with curl
