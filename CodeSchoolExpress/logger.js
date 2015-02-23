//custom logger middleware for express

module.exports = function(request, response, next) {
  var start = +new Date();
  var stream = process.stdout;  //standard output - Writable stream
  var url = request.url;    //url of the request
  var method = request.method;    //method of the request

  response.on("finish", function(){
    var duration = +new Date() - start;
    var message = method + " to " + url +
    "\n Duration: " + duration + "ms\n\n";
    stream.write(message);
  });

  next();   //pass the context to the next middleware [mandatory]
}
