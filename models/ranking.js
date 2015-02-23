module.exports = function(mongoose) {
	var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
	var Ranking = new Schema({
		id				: ObjectId,
		suggetion_id	: {type: Number, min: 0 },
		user_id			: {type: Number, min: 0 },
		value			: {type: Number, min: 0, max: 5},
		date			: {type: Date, default: Date.now}
	});
	
	return mongoose.model('Ranking',Ranking);
}