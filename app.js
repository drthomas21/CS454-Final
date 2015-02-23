//Load configurations and dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require("./config.json");

//Connect to mongoose
mongoose.connect('mongodb://'+config.mongodb.username+":"+config.mongodb.password+"@"+config.mongodb.host+"/"+config.mongodb.database);

//Load models
var Suggestion = require('./models/suggestion.js')(mongoose);
var Ranking = require('./models/ranking.js')(mongoose);
var User = require('./models/user.js')(mongoose);

//Create Server and configure server
var server = express();
server.use(bodyParser.json());
server.set("views", __dirname + "/templates");
server.set("view engine","ejs");
server.use(express.static(__dirname + '/public_html'));
require('./routes/api')(server,mongoose,Suggestion,Ranking,User);
require('./routes/client')(server);

//Start server
server.listen(config.express.port,function() {
	console.log("Server is listening on port: " + config.express.port);
});
