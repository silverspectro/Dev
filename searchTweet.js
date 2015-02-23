var url = require('url');

var options = {
  protocol: "https:",
  host: "search.twitter.com",
  pathname: '/1.1/search.json',
  query: { q: "codeschool"}
};

var searchURL = url.format(options);

var request = require("request");

request(searchURL, function(error, response, body){
	console.log(body);
});
