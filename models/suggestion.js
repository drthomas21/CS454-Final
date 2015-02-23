module.exports = function(mongoose) {
	var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
	var Suggestion = new Schema({
		id				: ObjectId,
		name	: {type: Number, min: 0 },
		user_id			: {type: Number, min: 0 },
		value			: {type: Number, min: 0, max: 5},
		date			: {type: Date, default: Date.now}
	});
	
	return mongoose.model('Suggestion',Suggestion);
}