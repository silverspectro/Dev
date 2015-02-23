var fs = require("fs");
var http = require("http");

http.createServer(function(req, res){

  var fileBytes = req.headers['content-length']; //get info from request header
  var fileName = req.url; //get file name
  fileName = fileName.replace(/^.*\/(.*)$/, "$1");  //get everything after the last slash
  var newFile = fs.createWriteStream(fileName);

  var uploadedBytes = 0;  //var for keeping track of proggress

  req.on("readable", function(){
    var chunk = null;
    while(null !== (chunk = req.read())){
      uploadedBytes += chunk.length;
      var progress = (uploadedBytes / fileBytes) * 100;
      res.write("progress: " + parseInt(progress, 10) + "%\n");
    }
  }); //juste for progress handling, the pipe still take care of uploading
  console.log(fileName);
  req.pipe(newFile);

  req.on("end", function(){
    res.end("uploaded");
  });

}).listen(3000, "192.168.0.11");  //public ip accessible from host
console.log('Server running at http://192.168.0.11:3000/');

//use curl --upload-file filetoupload http://localhost:8000
