var express = require ("express");
var request = require("request");
var url = require("url");
var ejs = require("ejs");

var app = express();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tweets/:username", function(req,response){
  var username = req.params.username;

  options = {
    protocol: "https:",
    host: "api.twitter.com",
    pathname: "/1.1/statuses/user_timeline.json",
    query: { screen_name: username, count:10 }
  }
  var twitterUrl = url.format(options);

  request(twitterUrl, function(err, res, body){
    var tweets = JSON.parse(body);
    response.locals = {tweets: tweets, name: username};
    response.render('tweets.ejs');
  });

  console.log(twitterUrl);

});

app.listen(8080);
