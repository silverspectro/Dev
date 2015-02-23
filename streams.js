var http = require("http");

var server = http.createServer();

server.on("request", function(req, res){
  console.log("data received");
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  /*req.on("readable", function() {
    var chunk = null;
    while(null !== (chunk = req.read())) {
      res.write(chunk);
    }
  });
  req.on("end", function(){
    res.end();
  });*/ //same as
  req.pipe(res);
});

server.on("log", function(log){
  console.log(log);
});

server.on("close", function(){
  console.log("Server down...");
  server.close();
});

server.listen(8000);
