//Load configurations and dependencies
var express = require('express');
var bodyParser = require('body-parser');
var config = require("./config.json");
var mongoose = require('mongoose');

//Connect to Mongo DB
mongoose.connect('mongodb://'+config.mongodb.host+"/"+config.mongodb.database,{
	db: {native_parser: true},
	user: config.mongodb.username,
	pass: config.mongodb.password
});
var db = mongoose.connection;
db.on('error',function(err) {
	console.log(err);
	process.exit(1);
});

//Create Server and configure server
var server = express();
server.use(bodyParser.json());
server.set("views", __dirname + "/templates");
server.set("view engine","ejs");
server.use(express.static(__dirname + '/public_html'));
require('./routes/api')(server,mongoose);
require('./routes/client')(server);

//Start server
server.listen(config.express.port,function() {
	console.log("Server is listening on port: " + config.express.port);
});
