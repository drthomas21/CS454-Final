module.exports = function(mongoose) {
	var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
	var User = new Schema({
		id				: ObjectId,
		user_name		: String,
		first_name		: { type: String, match: /[A-Za-z]/},
		last_name		: { type: String, match: /[A-Za-z]/},
		join_date		: {type: Date, default: Date.now}
	});
	
	return mongoose.model('User',User);
}