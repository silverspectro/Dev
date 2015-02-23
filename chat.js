var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test");

var Message = mongoose.model("message", {
  name: String,
  message: String
});

var clients = [];

var storeMessages = function(name, data) {
  var message = new Message({name: name, message: data});
  message.save(function(err, message){
    if(err)return console.error(err);
    Message.find(function(err,messages){
        if(err)return console.error(err);
        if(messages.length > 20)Message.where().findOneAndRemove(function(err,message){
          if(err)return console.error(err);
          console.log(messages.length);
        });
    });
  });
}

var storeClient = function(name) {
  clients.push(name);
}

app.get("/", function(req, res){
  res.sendFile(__dirname + "/chat.html");
});


io.on("connection", function(client){

  console.log("client connected...");

  client.on('messages', function(message){
    var nickname = client.nickname;
    client.broadcast.emit("messages",nickname + ":" + message);

    client.emit("messages", nickname + ":" + message);
    storeMessages(nickname, message);
    console.log(client.nickname + " said:" + message);
  });

  client.on("join", function(name){
    clients.forEach(function(clients){
      client.emit("messages", clients + " is connected");
    })
    /*messages.forEach(function(message){
      client.emit("messages", message.name + ":" + message.data);
    });*/
    Message.find(function(err, messages){
      messages.forEach(function(message){
        client.emit("messages", message.name + ": " + message.message);
      });
    });
    client.nickname = name;
    client.broadcast.emit("messages", client.nickname + " connected");
    client.emit("messages", client.nickname + " connected");
    if(clients.indexOf(name) === -1)storeClient(name);
    console.log(client.nickname + " connected");
  });
});



server.listen(8080,"192.168.0.11", function(){
  console.log("listening on *:8080")
});
