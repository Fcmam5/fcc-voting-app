var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PollSchema = new Schema({	'author' : {	 	type: Schema.Types.ObjectId,	 	ref: 'User'	},	'uid': Number,	'text' : String,	'choices' : [{		'choiceText': String,		'votes' : {type: Number, default: 0}	}]});

PollSchema.methods.votesCount = function(){
	return this.choices.reduce(function(acc, currentVal) {
		return acc + currentVal.votes;
	}, 0);
}
module.exports = mongoose.model('Poll', PollSchema);
