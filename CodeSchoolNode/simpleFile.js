var fs = require("fs");

var file = fs.createReadStream("index.html");

/*file.on("readable", function(){
  var chunk = null;
  while(null !== (chunk = file.read())) {
    console.log(chunk.toString());
  }
});*/

//same as

file.pipe(process.stdout);

file.on("end", function(){
  process.stdout.end('finished');
});
