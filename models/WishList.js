module.exports = function(mongoose) {
	var Schema = mongoose.Schema;

	var WishList = mongoose.model("Wishlist", new Schema({
		id:				Schema.Types.ObjectId,
		name:			String,
		description:	String,
		items:			[String],
		date:			{type: Date, default: Date.now}
	}));
	
	return {
		create: function() {
			return new WishList();
		},
		get: function(callback) {
			WishList.find({},function(err,rows){
				callback(err,rows);
			})
		},
		search: function(args,callback) {
			WishList.find(args,function(err,rows){
				callback(err,rows)
			});
		},
		remove: function(instance) {
			instance.remove();
		},
		save: function(instance,callback) {
			instance.save(function(err, Model) {
				if(err) {
					callback('There was an issue with saving', Model);
				} else {
					callback(null, Model);
				}
			});
		}
	};
}