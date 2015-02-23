var http = require("http");
var fs = require("fs");
var EventEmitter = require("events").EventEmitter;

var logger = new EventEmitter();

logger.on("loaded", function(message){
  console.log(message);
});

var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  fs.readFile("index.html", function(err, contents){
    res.write(contents);
    logger.emit("loaded", "index loaded");
    res.end();
  });
});

server.on("close", function(){
  console.log("Closing down the server");
});

server.listen(8080);
