//Load configurations and dependencies
var express = require('express');
var bodyParser = require('body-parser');
var config = require("./config.json");

//Create Server and configure server
var server = express();
server.use(bodyParser.json());
server.set("views", __dirname + "/templates");
server.set("view engine","ejs");
server.use(express.static(__dirname + '/public_html'));
require('./routes/api')(server);
require('./routes/client')(server);

//Start server
server.listen(config.express.port,function() {
	console.log("Server is listening on port: " + config.express.port);
});
