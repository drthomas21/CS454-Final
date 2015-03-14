var mongoose = require('mongoose');
var config = require("../config.json");
mongoose.connect('mongodb://'+config.mongodb.host+"/"+config.mongodb.database,{
	db: {native_parser: true},
	user: config.mongodb.username,
	pass: config.mongodb.password
});
var db = mongoose.connection;
db.on('error',function(err) {
	console.log(err);
	process.exit(1);
})
var Schema = mongoose.Schema;

var WishList = mongoose.model("Wishlist", new Schema({
	id:				Schema.Types.ObjectId,
	name:			String,
	description:	String,
	items:			[String],
	date:			{type: Date, default: Date.now}
}));


module.exports = {
		create: function() {
			return new WishList();
		},
		get: function(callback) {
			WishList.find({},function(err,rows){
				callback(rows);
			})
		},
		search: function(args,callback) {
			WishList.find(args,function(err,rows){
				callback(err,rows)
			});
		},
		update: function() {},
		remove: function(instance) {
			instance.remove();
		},
		save: function(instance,callback) {
			instance.save(function(err, Model) {
				if(err) {
					callback('There was an issue with saveing', Model);
				} else {
					callback(null, Model);
				}
			});
		}
}